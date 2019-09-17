import React from 'react'
import {connect} from 'react-redux'
import {getArtThunk} from '../store/allArtReducer'
import SingleArt from './singleArt'

class DisconnectedArt extends React.Component {
  componentDidMount() {
    this.props.getArt()
  }

  render() {
    return this.props.art ? (
      <div>
        <h1>Art</h1>
        {this.props.art.map(singleArt => {
          return (
            <div key={singleArt.id}>
              <SingleArt art={singleArt} />
            </div>
          )
        })}
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
  getArt: () => dispatch(getArtThunk())
})
const AllArt = connect(mapStateToProps, mapDispatchToProps)(DisconnectedArt)

export default AllArt
