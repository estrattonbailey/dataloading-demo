import React from "react";
import { renderToString } from "react-dom/server";
import lur from "lur";

type Options = {
  key: string;
}

type DataloaderState<T> = {
  loading: boolean;
  reloading: boolean;
  result: T;
};

const win = typeof window === "undefined" ? {} : window;
export const initialData: object =
  // @ts-ignore
  typeof window === "undefined" ? {} : win.__hydrate || {};

let id = 0;
let reqs: string[] = [];
let cache = lur(100, initialData);

/*
 * SERVER
 */

export function isPending() {
  return !!reqs.length;
}

export function resolve() {
  // @ts-ignore
  const requests = cache.keys.map((key: string) => cache.get(key));

  // @ts-ignore
  return Promise.allSettled(requests).then(() => {
    id = 0;
    reqs = [];
  });
}

export function flush() {
  id = 0;
  reqs = [];

  // @ts-ignore
  const c = cache.keys.reduce((data: object, k: string) => {
    return {
      ...data,
      [k]: cache.get(k),
    };
  }, {});

  cache.clear();

  return c;
}

export function withServerCache<T>(loader: () => Promise<T>, options: Options) {
  const key = options.key || id++ + "";
  const value = cache.get(key);

  if (value) return value;

  reqs.push(key);

  const req = loader();

  cache.set(key, req);

  req.then((res: any) => {
    cache.set(key, res);
    reqs.splice(reqs.indexOf(key), 1);
  });

  return null;
}

export async function render(tree: any): Promise<string> {
  const html = renderToString(tree);

  if (isPending()) {
    await resolve();
    return render(tree);
  }

  return html;
}

/*
 * CLIENT
 */

export function configure({ cacheSize }: { cacheSize: number }) {
  cache = lur(cacheSize, cache.serialize());
}

export function useDataloader<T>(
  loader: () => Promise<T>,
  deps: any[] = [],
  options: Options
): DataloaderState<T> & { reload: () => void } {
  let result = null;
  const { key } = options;

  if (typeof window === "undefined") {
    result = withServerCache(loader, options);
  } else if (key) {
    result = cache.get(key);
  }

  const [state, setState] = React.useState<DataloaderState<T>>({
    loading: !result,
    reloading: false,
    result: (result as unknown) as T,
  });

  const reload = React.useCallback(async () => {
    setState({
      ...state,
      reloading: !state.loading,
    });

    const res = await loader();

    if (key) {
      cache.set(key, res);
    }

    setState({
      loading: false,
      reloading: false,
      result: res,
    });
  }, [state, setState, loader]);

  React.useEffect(() => {
    reload();
  }, deps);

  return {
    ...state,
    reload,
  };
}
