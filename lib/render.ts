import React from "react";
import { renderToString } from 'react-dom/server'

import { isPending, resolve } from './dataloader'

export async function render(tree: any): Promise<string> {
  const html = renderToString(tree);

  if (isPending()) {
    await resolve();
    return render(tree);
  }

  return html;
}
