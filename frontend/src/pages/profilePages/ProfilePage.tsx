import React from 'react'
import { useParams } from 'react-router';

const ProfilePage = () => {
    
  const { user_id } = useParams();
  return (
    <>
      {user_id}
    </>
  )
}

export default ProfilePage
