import React from 'react'
import { StaticRouter as Router } from 'react-router'

import { render, flush } from '@/lib/dataloader'
import { html } from '@/app/util/html'
import { App } from '@/app/App'

export async function handler (ev: any, ctx: any) {
  const context = {}
  const markup = await render((
    <Router location={ev.path} context={context}>
      <App />
    </Router>
  ))
  const data = flush()
  const body = html({
    body: markup,
    data,
  })

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    body
  }
}
