const request = require('request')
const { getPicturesURL } = require('./parser')
const fs = require('fs')

async function downloadManga (picturesURLs, folderName, index, episodes, url) {
  download(picturesURLs[index], `./${folderName}/${getNamePage(index)}.jpg`, async function () {
    if (index + 1 < picturesURLs.length) {
      downloadManga(picturesURLs, folderName, ++index, episodes, url)
    } else {
      let episode = episodes.pop()
      fs.mkdirSync(`${episode[1]}`)
      let picturesURLs = await getPicturesURL('http://' + url + `/vol${episode[0]}/${episode[1]}?mtr=1`)
      console.log(`episode ${episode[1]}`)
      downloadManga(picturesURLs, episode[1], 0, episodes, url)
    }
  })
}

function download (url, filename, callback) {
  request.head(url, function (err, res, body) {
    request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}
var getNamePage = (index) => {
  return index < 10 ? `0${index}` : index
}

module.exports.downloadManga = downloadManga
