import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOneArtThunk} from '../store/allArtReducer'
import CartButton from './cartButton'

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
        <div className="singleArtFont">Name:{this.props.art.name}</div>
        <div className="singleArtFont">Artist: {this.props.art.artist}</div>
        <div className="singleArtFont">Price: {this.props.art.price}</div>
        {/* <div>TAGS</div> */}
        <CartButton productId={this.props.art.id} />
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
