import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOneArtThunk} from '../store/allArtReducer'

class SingleArtPage extends React.Component {
  componentDidMount() {
    this.props.oneArt(this.props.match.params.id)
  }

  render() {
    return this.props.art ? (
      <div>
        <div>
          <img className="imageUrl" src={this.props.art.imageURL} />
        </div>
        <div>{this.props.art.name}</div>
        <div>{this.props.art.artist}</div>
        <div>{this.props.art.price}</div>
        <div>TAGS</div>
        <button type="addToCart">ADD TO CART</button>
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  art: state.artReducer.oneArt
})

const mapDispatchToProps = dispatch => ({
  oneArt: id => dispatch(getOneArtThunk(id))
})

const oneArt = connect(mapStateToProps, mapDispatchToProps)(SingleArtPage)

export default oneArt
