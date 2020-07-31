import React from "react";

type Options = {
  key: string;
}
type DataloaderState<T> = {
  loading: boolean;
  reloading: boolean;
  result: T;
};

let id = 0;
let reqs: string[] = [];
let cache: { [k: string]: any } = {};

export function isPending() {
  return !!reqs.length;
}

export function resolve() {
  const requests = Object.keys(cache).map((key) => cache[key]);

  // @ts-ignore
  return Promise.allSettled(requests).then(() => {
    id = 0;
    reqs = [];
  });
}

export function flush() {
  id = 0;
  reqs = [];
  cache = {};
}

export function withServerCache<T>(
  loader: () => Promise<T>,
  options: Options
) {
  const key = options.key || id++ + '';

  if (cache[key]) return cache[key];

  reqs.push(key);

  cache[key] = loader();

  cache[key].then((res) => {
    cache[key] = res;
    reqs.splice(reqs.indexOf(key), 1);
  });

  return null;
}

export function useDataloader<T>(
  loader: () => Promise<T>,
  deps: any[] = [],
  options: Options
): DataloaderState<T> & { reload: () => void } {
  let result = null;

  if (typeof window === "undefined") {
    result = withServerCache(loader, options);
  }

  const [state, setState] = React.useState<DataloaderState<T>>({
    loading: !result,
    reloading: false,
    result: result as unknown as T,
  });

  const reload = React.useCallback(async () => {
    setState({
      ...state,
      reloading: !state.loading,
    });

    const res = await loader();

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
