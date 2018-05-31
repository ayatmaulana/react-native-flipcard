import { combineReducers } from 'redux'

const initalState = {
  active: [],
  score: 0,
  items: [],
  itemsState: [],
}

// const actions = 
// attions
const setActive = value => ({
  type: "SET_ACTIVE",
  value
})

const destroyActive = () => ({
  type: "DESTROY_ACTIVE"
})


const setScore = () => ({
  type: "SET)S"
})

// reducres
const activeReducer = ( state = initalState.active, action) => {
  switch(action.type) {
    case 'SET_ACTIVE':
      return [...state, action.value]
    case 'DESTROY_ACTIVE':
      return []
    default:
      return state
  }
}

const scoreReducer  = ( state = initalState.score, action) => {
  switch(action.type) {
    case "SET_SCORE":
      return state + 1
    default:
      return state
  }
}

const combineReducers = combineReducers({
  activeReducer,
  scoreReducer
})