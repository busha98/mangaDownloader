const { downloadManga } = require('./modules/downloader')
const { getEpisodes } = require('./modules/parser')
const { getPicturesURL } = require('./modules/parser')
const fs = require('fs')

async function downloader (url) {
  let episodes = await getEpisodes(url)
  if (process.argv[3] && process.argv[4]) {
    episodes = episodes.splice(episodes.length - process.argv[4], process.argv[4] - process.argv[3] + 1)
  }
  // console.log(episodes)
  let episode = episodes.pop()
  let array = await getPicturesURL('http://' + url + `/vol${episode[0]}/${episode[1]}?mtr=1`)
  fs.mkdirSync(`${episode[1]}`)
  console.log(`episode ${episode[1]}`)
  downloadManga(array, episode[1], 0, episodes, url)
}

downloader(`${process.argv[2]}`)

//  node downloader readmanga.me/hunter_x_hunter_
// node downloader readmanga.me/black_clover 1 10
