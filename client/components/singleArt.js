import React from 'react'
import {Link} from 'react-router-dom'

const SingleArt = props => {
  return (
    <div>
      <Link>
        <img className="imageUrl" src={props.art.imageURL} />
      </Link>
      <div>{props.art.name}</div>
      <div>{props.art.artist}</div>
      <div>{props.art.price}</div>
      <Link>
        <div>ADD TO CART</div>
      </Link>
    </div>
  )
}

export default SingleArt
