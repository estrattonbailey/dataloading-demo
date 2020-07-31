import React from 'react'
import wait from 'w2t'

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
          label: 'Contact',
          href: '/contact'
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
        <li className="p1" key={item.label}>{item.label}</li>
      ))}
    </ul>
  )
}

