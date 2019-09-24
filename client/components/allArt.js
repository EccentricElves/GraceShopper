import React from 'react'
import {connect} from 'react-redux'
import {getArtThunk} from '../store/allArtReducer'
import SingleArt from './singleArt'
import {me} from '../store'
import {getCartThunk} from '../store/cartReducer'

class DisconnectedArt extends React.Component {
  componentDidMount() {
    this.props.getArt()
    this.props.loadUserData()
    this.props.getCart()
  }

  render() {
    return this.props.art ? (
      <div>
        <h1 className="tengwarfont">Art</h1>
        <div className="allArt">
          {this.props.art.map(singleArt => {
            return (
              <div key={singleArt.id} className="art">
                <SingleArt art={singleArt} />
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  art: state.artReducer.art
})

const mapDispatchToProps = dispatch => ({
  getArt: () => dispatch(getArtThunk()),
  loadUserData: () => dispatch(me()),
  getCart: () => dispatch(getCartThunk())
})
const AllArt = connect(mapStateToProps, mapDispatchToProps)(DisconnectedArt)

export default AllArt
