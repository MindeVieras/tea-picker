
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { ui } from './ui.reducer'
import { members } from './members.reducer'
import { maker } from './maker.reducer'
import { rounds } from './rounds.reducer'

const rootReducer = combineReducers({
  ui,
  members,
  maker,
  rounds,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer
