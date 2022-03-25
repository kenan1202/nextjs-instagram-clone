import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestionArr = [...Array(4)].map((_, id) => ({
      ...faker.helpers.contextualCard(),
      id,
    }))

    setSuggestions(suggestionArr)
  }, [])

  return (
    <div className="mt-4 ml-4">
      <div className="my-3 flex">
        <p className="flex-1 text-sm font-semibold text-gray-500">
          Suggestions For You
        </p>
        <p className="text-sm">See All</p>
      </div>
      <div>
        {suggestions?.map((el) => (
          <div key={el.id} className="mb-2 flex items-center space-x-3">
            <img
              src={el.avatar}
              className="h-10 w-10 rounded-full border-[1px]"
            ></img>
            <p className="flex-1 text-sm">{el.username.substring(1, 10)}</p>
            <button className="text-sm font-bold text-blue-500">Follow</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestions
