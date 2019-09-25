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
        <h1 className="firstorderfont">Order History</h1>
        {!this.props.historicOrders[0] ? (
          <div className="firstorderfont">Order History is Empty</div>
        ) : (
          <div>
            <ul>
              {this.props.historicOrders.map(item => {
                const orderDate = new Date(item.updatedAt).toString().split(' ')
                const showDate =
                  orderDate[0] +
                  ' ' +
                  orderDate[1] +
                  ' ' +
                  orderDate[2] +
                  ', ' +
                  orderDate[3]

                return (
                  <li key={item.id} className="cartList">
                    <div className="singleArtFont">Order Number: {item.id}</div>
                    <div className="singleArtFont">Order Date: {showDate}</div>
                    {/* <div className="singleArtFont">Status: {item.status}</div> */}
                    <div className="singleArtFont">
                      Items: {item.arts.length}
                    </div>
                    <div className="singleArtFont">
                      Total Price:{' '}
                      {item.arts.reduce(
                        (sum, art) => sum + art.OrderDetail.price,
                        0
                      )}
                    </div>
                    <div className="singleArtFont">Order Details</div>
                    <ul>
                      {item.arts.map(art => {
                        return (
                          <li key={art.id} className="cartList">
                            <img src={art.imageURL} className="cartImage" />
                            <div className="singleArtFont">
                              Name: {art.name}
                            </div>
                            <div className="singleArtFont">
                              Artist: {art.artist}
                            </div>
                            <div className="singleArtFont">
                              Price: {art.OrderDetail.price}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                    <hr />
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    ) : (
      <div className="firstorderfont">You have no Order History</div>
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
