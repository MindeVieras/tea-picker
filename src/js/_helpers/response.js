
// fetch json response
export function handleResponse(response) {

  // if (!response.ok) {
  //   return Promise.reject(response.statusText)
  // }
  return response.json()
}
