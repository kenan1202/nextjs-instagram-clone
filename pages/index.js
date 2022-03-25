import Header from '../components/Header'
import Posts from '../components/Posts'
import Profile from '../components/Profile'
import Stories from '../components/Stories'
import Suggestions from '../components/Suggestions'
import Modal from '../components/Modal'
import { useContext } from 'react'
import { ModalContext } from '../context/modalContext'
import { useUser } from '@auth0/nextjs-auth0'

const Home = () => {
  const { opening } = useContext(ModalContext)
  const { user } = useUser()

  return (
    <div className="overflow-y-hidden">
      <Header></Header>

      {opening && <Modal></Modal>}

      <main className="z-10 mx-3 mt-6 grid max-w-4xl grid-cols-1 gap-4 sm:mx-auto lg:grid-cols-3">
        <section className="col-span-2">
          <Stories></Stories>
          {!opening && <Posts></Posts>}
        </section>

        {user && (
          <section className="hidden md:block">
            <Profile></Profile>
            <Suggestions></Suggestions>
          </section>
        )}
      </main>
    </div>
  )
}

export default Home
