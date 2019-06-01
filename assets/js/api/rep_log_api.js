export function getRepLogs() {
  return fetch('/reps',{
    credentials: 'same-origin'
  })
    .then(reponse => {
      return reponse.json().then((data)=>data.items);
    })
}