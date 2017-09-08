const request = require('request')
const HTMLParser = require('fast-html-parser')

async function getPicturesURL (url) {
  let body = await getBodyRequest(url)
  let arrayURL = await parseBodyForPictures(body)
  console.log(`в главе ${arrayURL.length} изображений`)
  return arrayURL
}
async function getEpisodes (url) {
  let body = await getBodyRequest('http://' + url.replace('/', '/rss/manga?name='))
  var root = HTMLParser.parse(body)
  let epi = root.querySelectorAll('title')
  let episodes = []
  let re = /\d+ - \d+/
  for (let i in epi) {
    let result = re.exec(epi[i].childNodes[0].rawText)
    if (result) {
      episodes.push(result[0].split(/ - /))
    }
  }
  return episodes
}
let getBodyRequest = (url) => {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (error) {
        reject(error)
      }
      resolve(body)
    })
  })
}
async function parseBodyForPictures (body) {
  let result
  let reg = /rm_h.init.+\);/ig
  result = reg.exec(body)[0]
  result = result.slice(12, result.length - 13)
  let counter = 0
  let bool = false
  let position = ['', '', '']
  let array = []
  for (let index = 0; index < result.length; ++index) {
    if (result[index] === '[') {
      counter = 0
      bool = false
      index++
      array[array.length] = position[1] + position[0] + position[2]
      position = ['', '', '']
    }
    if ((result[index] === '\'' || result[index] === '"')) {
      if (bool) {
        counter++
      }
      bool = !bool
      index++
    }
    if (bool) {
      position[counter] += result[index]
    }
  }
  array.splice(0, 1)
  return array
}

module.exports.getPicturesURL = getPicturesURL
module.exports.getEpisodes = getEpisodes
