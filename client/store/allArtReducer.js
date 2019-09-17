import axios from 'axios'
import history from '../history'
import Axios from 'axios'

//Action Type
const ALL_ART = 'ALL_ART'
const ONE_ART = 'ONE_ART'

//Action Creator
const gotArt = art => ({
  type: ALL_ART,
  art
})

const oneArt = art => ({
  type: ONE_ART,
  art
})

//Thunk Creator
export const getArtThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/art')
      dispatch(gotArt(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getOneArtThunk = id => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/art/${id}`)
      dispatch(oneArt(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const artReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_ART:
      return {...state, art: action.art}
    case ONE_ART:
      return {...state, oneArt: action.art}
    default:
      return state
  }
}

export default artReducer
