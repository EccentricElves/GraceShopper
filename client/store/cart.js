import axios from 'axios'

const ADDED_ART = 'ADDED_ART'

const addedArt = art => ({
  type: ADDED_ART,
  art
})

export const addArt = artId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/order/add/${artId}`)
    dispatch(addedArt(data))
  }
}
