import React from 'react'
import {Link} from 'react-router-dom'

const SingleArtPage = props => {
  return (
    <div>
      <div>
        <img className="imageUrl" src={props.art.imageURL} />
      </div>
      <div>{props.art.name}</div>
      <div>{props.art.artist}</div>
      <div>{props.art.price}</div>
      <div>TAGS</div>
      <button type="addToCart">ADD TO CART</button>
    </div>
  )
}

export default SingleArtPage
