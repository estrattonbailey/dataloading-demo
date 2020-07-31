import React from 'react'
import wait from 'w2t'

import { useDataloader } from '@/lib/dataloader'

export function Posts () {
  const { loading, result } = useDataloader(async () => {
    await wait(100)
    return {
      posts: [
        {
          title: 'Post 1',
        },
        {
          title: 'Post 2',
        },
        {
          title: 'Post 4',
        },
      ]
    }
  }, [], {
    key: 'posts'
  })

  if (loading) return null;

  return (
    <>
      {result.posts.map(post => (
        <h2 className="py1" key={post.title}>{post.title}</h2>
      ))}
    </>
  )
}

