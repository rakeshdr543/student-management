import React from 'react'

const Student = ({ profilePicture:avatar_url, fName,percentage }) => {
  return (
    <article className='card'>
      <img src={avatar_url} alt={fName} />
      <h4>{fName}</h4>
      <h4>{percentage}%</h4>
      <a href='/' className='btn'>
        View details
      </a>
    </article>
  )
}

export default Student