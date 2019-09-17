import React from 'react'
import {Link} from 'react-router-dom'

const SingleArt = props => {
  return (
    <div>
      <Link to={`/art/${props.art.id}`}>
        <img className="imageUrl" src={props.art.imageURL} />
      </Link>
      <div>{props.art.name}</div>
      <Link>
        <div>ADD TO CART</div>
      </Link>
    </div>
  )
}

export default SingleArt
