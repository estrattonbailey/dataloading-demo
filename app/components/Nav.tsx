import React from 'react'
import wait from 'w2t'
import { Link } from 'react-router-dom'

import { useDataloader } from '@/lib/dataloader'

export function Nav () {
  const { loading, result } = useDataloader(async () => {
    await wait(100)
    return {
      items: [
        {
          label: 'Home',
          href: '/'
        },
        {
          label: 'About',
          href: '/about'
        },
        {
          label: 'Products',
          href: '/products'
        },
      ]
    }
  }, [], {
    key: 'nav'
  })

  if (loading) return null;

  return (
    <ul className="f aic p1">
      {result.items.map(item => (
        <li className="p1" key={item.label}>
          <Link to={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  )
}
