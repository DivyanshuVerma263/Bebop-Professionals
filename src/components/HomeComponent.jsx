import React from 'react'
import PostStatus from './common/PostUpdate'

function HomeComponent({currentUser}) {
  return (
    <div>
      <PostStatus currentUser={currentUser}/>
    </div>
  )
}

export default HomeComponent