import React, { useEffect, useState } from 'react'
import Story from './Story'
import { faker } from '@faker-js/faker'

function Stories() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    const storyArr = [...Array(30)].map((_, id) => ({
      ...faker.helpers.contextualCard(),
      id,
    }))

    setStories(storyArr)
  }, [])

  return (
    <div className="flex space-x-2 border-[1px] bg-white py-3 px-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-red-600">
      {stories?.map((el) => (
        <Story key={el.id} avatar={el.avatar} username={el.username}></Story>
      ))}
    </div>
  )
}

export default Stories
