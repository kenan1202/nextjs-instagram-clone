import { useRef, useState } from 'react'
import { useContext } from 'react'
import { ModalContext } from '../context/modalContext'
import { CameraIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { uploadString, ref, getDownloadURL } from 'firebase/storage'

import { useUser } from '@auth0/nextjs-auth0'

function Modal() {
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const fileRef = useRef()

  const { closeModal } = useContext(ModalContext)

  const { user } = useUser()

  const addImage = (e) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result)
    }
  }

  const openFile = () => {
    fileRef.current.click()
  }

  const resetModal = () => {
    setFile('')
    closeModal()
  }

  const uploadPost = async () => {
    if (file && caption) {
      setLoading(true)

      const colRef = collection(db, 'posts')

      const docRef = await addDoc(colRef, {
        username: user.nickname,
        profilePic: user.picture,
        createdAt: serverTimestamp(),
        caption,
      })

      const imageRef = ref(storage, `posts/${docRef.id}/image`)

      await uploadString(imageRef, file, 'data_url')

      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL,
      })

      setLoading(false)
      setCaption('')
      resetModal()
    }
  }

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-zinc-800/50 text-white">
      <div className="flex flex-col items-center rounded-lg bg-white px-10">
        <button
          className="-mr-10 flex-1 self-end rounded-tr-lg rounded-bl-lg bg-red-500 py-1 px-2 text-black"
          onClick={resetModal}
        >
          X
        </button>
        <img src={file} className="mt-3 w-40"></img>
        <div className="my-3 flex h-10 w-10 items-center justify-center rounded-full bg-pink-200">
          <CameraIcon className="w-8 text-orange-600"> </CameraIcon>
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          ref={fileRef}
          onChange={addImage}
        ></input>
        <button className="text-sm font-semibold text-black" onClick={openFile}>
          Upload a photo
        </button>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Please enter a caption..."
          className="my-3 text-black outline-none"
        ></input>
        <button
          className="mb-3 rounded-lg bg-orange-600 px-16 py-1"
          onClick={uploadPost}
        >
          {loading ? 'Uploading' : 'Upload Post'}
        </button>
      </div>
    </div>
  )
}

export default Modal
