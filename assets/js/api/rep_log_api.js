export function getRepLogs() {
  return fetch('/reps')
    .then(reponse => {
      return reponse.json();
    })
}