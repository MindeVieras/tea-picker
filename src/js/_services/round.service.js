
import { baseServerUrl, handleResponse } from 'Helpers'

export const roundService = {
  pickMaker
}

function pickMaker(participants) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(participants)
  }
  
  return fetch(`${baseServerUrl}/api/rounds/picker`, requestOptions).then(handleResponse)
}
