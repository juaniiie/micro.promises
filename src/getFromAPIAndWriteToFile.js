// Read through `demo/chainingWithPromises.js` before completing this exercise

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// Using `fs.writeFile`, the `request` module, and promises,
// build out `getFromAPIAndWriteToFile` to hit an API's GET request endpoint,
// and write the body of its response to a file whose path is passed in
var getFromAPIAndWriteToFile = function (apiURL, writeFilePath) {
  // YOUR CODE HERE
  return new Promise(function(resolve, reject) {
    request(apiURL, function(err, data){
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  })
  .then(function(data) {
    fs.writeFile(writeFilePath, data, function(err){
      if(err){
       throw err;
      }
    });
  }).catch(function(err){
    console.log(err);
  });
};

module.exports = getFromAPIAndWriteToFile;
