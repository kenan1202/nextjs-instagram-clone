import { DotsHorizontalIcon } from '@heroicons/react/solid'
import {
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'

import { useUser } from '@auth0/nextjs-auth0'
import { useState, useEffect } from 'react'
import Moment from 'react-moment'

import {
  onSnapshot,
  query,
  collection,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

function Post({ post, id: postId }) {
  const { user } = useUser()

  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `posts/${postId}/likes`),
        orderBy('createdAt', 'desc')
      ),
      (snapshot) => {
        setLikes(snapshot.docs)

        snapshot.docs.forEach((el) => {
          if (
            el.data().username ===
            (user?.nickname?.trim().includes(' ')
              ? user?.nickname?.trim().toLowerCase().split(' ').join('')
              : user?.nickname?.trim().toLowerCase())
          ) {
            setLiked(true)
          } else {
            setLiked(false)
          }
        })
      }
    )
  }, [db])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `posts/${postId}/comments`),
        orderBy('createdAt', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs)
      }
    )
  }, [db])

  const like = async () => {
    setLiked(true)

    await setDoc(doc(db, `posts/${postId}/likes/${user.sub.split('|')[1]}`), {
      username: user?.nickname?.trim().includes(' ')
        ? user?.nickname?.trim().toLowerCase().split(' ').join('')
        : user?.nickname?.trim().toLowerCase(),
      createdAt: serverTimestamp(),
    })
  }

  const dislike = async () => {
    setLiked(false)

    await deleteDoc(doc(db, `posts/${postId}/likes/${user.sub.split('|')[1]}`))
  }

  const postComment = async () => {
    setComment('')

    await addDoc(collection(db, `posts/${postId}/comments`), {
      profilePic: user?.picture,
      username: user?.nickname?.trim().includes(' ')
        ? user?.nickname?.trim().toLowerCase().split(' ').join('')
        : user?.nickname?.trim().toLowerCase(),
      comment,
      createdAt: serverTimestamp(),
    })
  }

  return (
    <div className="my-4 border-[1px] bg-white">
      <div className="flex items-center space-x-3 p-3">
        <img
          src={post.profilePic}
          className="h-10 w-10 rounded-full border-[1px]"
        ></img>
        <p className="flex-1 text-sm font-semibold">{post.username}</p>
        <DotsHorizontalIcon className="w-4"></DotsHorizontalIcon>
      </div>

      <img src={post.image}></img>

      {user && (
        <div className="flex p-3">
          <div className="flex flex-1 items-center space-x-3">
            {liked ? (
              <HeartIconFilled
                onClick={dislike}
                className="w-7 text-red-500 transition duration-200 hover:scale-125"
              ></HeartIconFilled>
            ) : (
              <HeartIcon
                onClick={like}
                className="w-7 transition duration-200 hover:scale-125"
              ></HeartIcon>
            )}

            <ChatIcon className="w-7 transition duration-200 hover:scale-125"></ChatIcon>
            <PaperAirplaneIcon className="w-7 rotate-45 transition duration-200 hover:scale-125"></PaperAirplaneIcon>
          </div>
          <BookmarkIcon className="w-7 transition duration-200 hover:scale-125"></BookmarkIcon>
        </div>
      )}

      {/* Likes */}
      <div className={`px-4 font-bold ${user ? 'pt-1' : 'pt-5'} pb-0`}>
        {likes.length} likes
      </div>

      {/* Caption */}
      <div className="p-4 pt-1">
        <p className="float-left mr-2 text-sm font-bold">{post.username}:</p>
        <p className="break-all text-sm">{post.caption}</p>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="mx-8 h-20 overflow-y-auto px-3 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-red-600">
          {comments.map((el, id) => (
            <div key={id} className="mb-1 flex space-x-2">
              <img
                src={el.data().profilePic}
                className="h-8 w-8 rounded-full"
              ></img>
              <div className="flex-1">
                <p className="float-left mr-1 text-sm font-bold">
                  {el.data().username}:
                </p>
                <p className="break-all text-sm">{el.data().comment}</p>
              </div>
              <Moment fromNow className="px-2 text-xs text-gray-500">
                {el.data().createdAt?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Add comments */}
      {user && (
        <div className="flex space-x-3 border-t-[1px] p-3">
          <EmojiHappyIcon className="w-7"></EmojiHappyIcon>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
            className="background-transparet flex-1 text-sm outline-none"
          ></input>
          <button
            disabled={!comment.trim()}
            onClick={postComment}
            className="text-blue-500"
          >
            Post
          </button>
        </div>
      )}
    </div>
  )
}

export default Post
