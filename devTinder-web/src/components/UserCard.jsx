import React from 'react'

const UserCard = ({ user }) => {
  return (
  <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img src={user.photoUrl} alt={user.firstName} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName} {user.lastName}</h2>
    <p>{user.about}</p>
    <div className="card-actions flex justify-evenly">
      <button className="btn btn-primary">Rejected</button>
      <button className="btn btn-secondary">Send Request</button>
    </div>
  </div>
</div>
  )
}

export default UserCard