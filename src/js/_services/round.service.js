
import { baseServerUrl, handleResponse } from 'Helpers'

export const roundService = {
  pickMaker,
  getList,
  delete: _delete
}

function pickMaker(participants) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(participants)
  }
  
  return fetch(`${baseServerUrl}/api/rounds/picker`, requestOptions).then(handleResponse)
}


function getList() {
  return fetch(`${baseServerUrl}/api/rounds`).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseServerUrl}/api/rounds/${id}`, requestOptions).then(handleResponse)
}
