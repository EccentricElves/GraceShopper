import axios from 'axios'

const ADDED_ART = 'ADDED_ART'

const addedArt = art => ({
  type: ADDED_ART,
  art
})

export const addArt = artId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/order/add/${artId}`)
      dispatch(addedArt(data))
    } catch (error) {
      let myData = JSON.parse(localStorage.getItem('cart')) || {data: []}
      if (!myData.data.map(x => x.id).includes(artId)) {
        const {data} = await axios.get(`/api/art/${artId}`)
        myData = {...myData, data: [...myData.data, data]}
        localStorage.setItem('cart', JSON.stringify(myData))
      }
    }
  }
}
