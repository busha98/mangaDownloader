var request = require('request');
var fs = require('fs');

let requestPromise = (url) => {
    return new Promise(function(resolve, reject) {
      request(url, function (error, response, body) {
        resolve(body);
      });
    });
};

var parseBody = async function(url){
  let body = await requestPromise(url);
  let arrayURL = await parse(body); //Без awit возвращает promise?!?!?!?
  console.log(`в главе ${arrayURL.length} изображений`);
  fs.mkdirSync(`${process.argv[3]}`);
  downloadManga(arrayURL,0);
}

async function parse(body) {
  let arrayURL = [];
  let result;
  let reg = /rm_h.init.+\)\;/ig;
  result = reg.exec(body)[0];
  result = result.slice(12,result.length-13);
  let counter = 0;
  let bool = false;
  let position = ['','',''];
  let array = [];
  for(let index = 0 ; index < result.length; ++index){
    if(result[index] === '['){
      counter = 0;
      bool = false;
      index++;
      array[array.length] = position[1]+position[0]+position[2];
      position = ['','',''];
    }
    if( (result[index] === '\'' || result[index] === '\"') ){
      if(bool){
          counter++;
      }
      bool = !bool;
      index++;
    }
    if(bool){
      position[counter] += result[index]; 
    }

  }
  array.splice(0,1);
  return array;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
}

var downloadManga = function(array, index){
  download(array[index],`./${process.argv[3]}/${ getNamePage(index) }.jpg` , function(){
    if(index + 1 < array.length){ 
      downloadManga(array,++index);
    }else{
      console.log('end');
    }
  });
}

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
var getNamePage = (index) => { 
  return index < 10 ? `0${index}` : index;
}

//console.log(process.argv[2])

parseBody(process.argv[2]);
//parseBody('http://mintmanga.com/btooom_/vol16/80?mtr=1');