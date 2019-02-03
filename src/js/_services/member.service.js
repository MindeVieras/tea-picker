
import { baseServerUrl, handleResponse } from 'Helpers'

export const memberService = {
  getList,
  create,
  update,
  delete: _delete
}

function getList() {
  return fetch(`${baseServerUrl}/api/members`).then(handleResponse)
}

function create(member) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  }
  
  return fetch(`${baseServerUrl}/api/members`, requestOptions).then(handleResponse)
}

function update(id, member) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  }
  
  return fetch(`${baseServerUrl}/api/members/${id}`, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE'
  }

  return fetch(`${baseServerUrl}/api/members/${id}`, requestOptions).then(handleResponse)
}
