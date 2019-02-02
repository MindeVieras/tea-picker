
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { ui } from './ui.reducer'
import { member } from './member.reducer'
import { maker } from './maker.reducer'

const rootReducer = combineReducers({
  ui,
  member,
  maker,
  form: formReducer,
  toastr: toastrReducer
})

export default rootReducer
