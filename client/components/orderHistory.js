import React from 'react'
import {connect} from 'react-redux'
import {getOrderHistoryThunk} from '../store/orderHistoryReducer'

class DisconnectedOrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrderHistory()
  }

  render() {
    return this.props.historicOrders ? (
      <div>
        <h1 className="tengwarfont">Order History</h1>
        {!this.props.historicOrders[0] ? (
          <div className="tengwarfont">Order History Empty</div>
        ) : (
          <div>
            {this.props.historicOrders.map(item => {
              return (
                <ul key={item.id} className="cartList">
                  <div className="singleArtFont">Order Number: {item.id}</div>
                  <div className="singleArtFont">Status: {item.status}</div>
                  <div className="singleArtFont">
                    Orders: {item.arts.length}
                  </div>
                </ul>
              )
            })}
          </div>
        )}
        <div>
          {this.props.isLoggedIn ? (
            <div>you're logged in </div>
          ) : (
            <div>you're not logged in </div>
          )}
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  historicOrders: state.orderHistoryReducer.orders,
  isLoggedIn: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getOrderHistory: () => dispatch(getOrderHistoryThunk())
})

const OrderHistory = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedOrderHistory
)

export default OrderHistory
