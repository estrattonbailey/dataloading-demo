import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Page as Root } from '@/app/pages/Root'
import { Page as About } from '@/app/pages/About'
import { Page as Products } from '@/app/pages/Products'
import { Page as NotFound } from '@/app/pages/NotFound'

export function App () {
  return (
    <Switch>
      <Route exact path='/products' component={Products} />
      <Route exact path='/about' component={About} />
      <Route exact path='/' component={Root} />
      <Route component={NotFound} />
    </Switch>
  )
}
