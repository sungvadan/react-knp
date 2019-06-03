function fetchJson(url, options) {
  return fetch(url,Object.assign({
    credentials: 'same-origin'
  }, options))
    .then(response => {
      return response.text()
        .then(text => text? JSON.parse(text): text)
    })
}
export function getRepLogs() {
  return fetchJson('/reps')
    .then(data => data.items);
}


export function deleteRepLog(id) {
  return fetchJson(`/reps/${id}`,{
    method: 'DELETE'
  })
}

export function createRepLog(repLog) {
  return fetchJson('/reps',{
    method: 'POST',
    body: JSON.stringify(repLog),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}