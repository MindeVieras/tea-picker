
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { ui } from './ui.reducer'
import { members } from './members.reducer'
import { maker } from './maker.reducer'

const rootReducer = combineReducers({
  ui,
  members,
  maker,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer
