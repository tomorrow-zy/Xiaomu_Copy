
function createFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

function handleError (err) {
  console.log(err)
}

export function get (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(response => {
        console.log(response)
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

export function post (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(response => {
        console.log(response)
        resolve(response)
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}
