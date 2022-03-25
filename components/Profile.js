import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

function Profile() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className="mt-8 ml-4 flex items-center space-x-3">
      <img
        src={user.picture}
        className="h-14 w-14 rounded-full border-[1px]"
        alt="profile pic"
      ></img>
      <div className="flex-1">
        <p className="text-sm font-medium">{user.nickname}</p>
        <p className="text-sm text-gray-500">{user.name}</p>
      </div>
      <button
        onClick={() => router.push('/api/auth/logout')}
        className="text-sm font-semibold text-blue-500"
      >
        Log out
      </button>
    </div>
  )
}

export default Profile
