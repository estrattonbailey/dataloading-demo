import React from 'react'
import { Route } from 'react-router-dom'

import { Page as Root } from '@/app/pages/Root'
import { Page as About } from '@/app/pages/About'
import { Page as Contact } from '@/app/pages/Contact'

export function App () {
  return (
    <>
      <Route exact path='/' component={Root} />
      <Route exact path='/about' component={About} />
      <Route exact path='/contact' component={Contact} />
    </>
  )
}
