import { HomeIcon } from '@heroicons/react/solid'
import {
  SearchIcon,
  ChatIcon,
  PlusCircleIcon,
  HeartIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { useContext } from 'react'
import { ModalContext } from '../context/modalContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

function Header() {
  const router = useRouter()
  const { openModal } = useContext(ModalContext)
  const { user } = useUser()

  return (
    <div className="z-50 border-b-[1px] bg-white py-4">
      <div className="flex justify-around px-5 sm:px-20 lg:px-40">
        <img
          src="/Instagram_logo.svg"
          className="w-14 sm:w-24"
          alt="instagram logo"
        ></img>

        <div className="flex rounded-lg bg-gray-200 py-2">
          <SearchIcon className="w-10 px-3"></SearchIcon>
          <input
            type="text"
            className="bg-transparent px-2 pl-0 outline-none"
            placeholder="Search"
          ></input>
        </div>

        <div className="flex items-center space-x-4">
          <HomeIcon className="headerIcon lg:block"></HomeIcon>
          <MenuIcon className="headerIcon sm:block lg:hidden"></MenuIcon>
          {!user ? (
            <Link href="/api/auth/login" className="text-blue-500">
              <a>SignIn</a>
            </Link>
          ) : (
            <>
              <ChatIcon className="headerIcon lg:block"></ChatIcon>
              <PlusCircleIcon
                className="headerIcon lg:block"
                onClick={openModal}
              ></PlusCircleIcon>
              <HeartIcon className="headerIcon lg:block"></HeartIcon>
              <img
                src={user.picture}
                onClick={() => router.push('/api/auth/logout')}
                className="h-10 w-10 rounded-full border-[1px]"
                alt="Profile Photo"
              ></img>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
