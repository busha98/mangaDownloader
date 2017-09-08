const { downloadManga } = require('./modules/downloader')
const { getEpisodes } = require('./modules/parser')
const { getPicturesURL } = require('./modules/parser')
const fs = require('fs')

async function downloader (url) {
  let episodes = await getEpisodes(url)
  let episode = episodes.pop()
  let array = await getPicturesURL('http://' + url + `/vol${episode[0]}/${episode[1]}?mtr=1`)
  fs.mkdirSync(`${episode[1]}`)
  console.log(`episode ${episode[0]}`)
  downloadManga(array, episode[1], 0, episodes, url)
}
downloader(`${process.argv[2]}`)
