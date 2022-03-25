function Story({ avatar, username }) {
  return (
    <div className="flex flex-col">
      <img
        src={avatar}
        className="h-16 w-16 rounded-full border-2 border-red-500 p-[1px]"
      ></img>
      <p className="text-sm">
        {username.length >= 10 ? username.slice(0, 10) : `${username}....`}
      </p>
    </div>
  )
}

export default Story
