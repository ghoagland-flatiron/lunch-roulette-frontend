import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import RestaurantList from './RestaurantList'


const Profile = ({ user }) =>  {
  const { attributes, restaurants } = user
  if (!user.id) {
    return <CircularProgress />
  }
  return (
    <div>
      <h1>My info</h1>
      <p>Name: { attributes.name }</p>
      <p>Email: { attributes.email }</p>
      <p>Default Location: { attributes.default_location }</p>
      <RestaurantList restaurants={restaurants} />

    </div>
  )
}

export default Profile