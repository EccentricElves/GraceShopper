import React from 'react'
import {Link} from 'react-router-dom'
import CartButton from './cartButton'

const SingleArt = props => {
  return (
    <div>
      <Link to={`/art/${props.art.id}`}>
        <img className="imageUrl" src={props.art.imageURL} />
      </Link>
      <div>{props.art.name}</div>
      <CartButton productId={props.art.id} />
    </div>
  )
}

export default SingleArt
