import React from 'react'
import wait from 'w2t'

import { useDataloader } from '@/lib/dataloader'
import { Nav } from '@/app/components/Nav'
import { Posts } from '@/app/components/Posts'

export function Page () {
  const { loading, result } = useDataloader(async () => {
    await wait(100)
    return {
      title: 'Contact page'
    }
  }, [], {
    key: 'index'
  })

  return (
    <>
      <Nav />

      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="p1">
          <h1>{result.title}</h1>

          <Posts />
        </div>
      )}
    </>
  )
}

