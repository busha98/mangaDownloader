var { downloadManga } = require('./modules/downloader')
var { getEpisodes } = require('./modules/parser')
var fs = require('fs')
var { getPicturesURL } = require('./modules/parser')

async function downloader (url) {
  let episodes = await getEpisodes(url)
  let episode = episodes.pop()
  let array = await getPicturesURL('http://' + url + `/vol${episode[0]}/${episode[1]}?mtr=1`)
  fs.mkdirSync(`${episode[1]}`)
  downloadManga(array, episode[1], 0, episodes, url)
}
downloader(`${process.argv[2]}`)
