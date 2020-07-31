import React from 'react'

import { render } from '@/lib/render'
import { html } from '@/app/util/html'
import { Root } from '@/app/pages/Root'

export async function handler (ev: any, ctx: any) {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    body: html({
      body: await render(<Root />)
    })
  }
}
