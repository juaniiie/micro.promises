// Read through `demo/PromiseDotAll.js` before completing this exercise

var fs = require('fs');
var Promise = require('bluebird');

/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 *
 * Make sure combineFirstLineOfManyFiles returns a promise so the following will work:
 *
 * combineFirstLineOfManyFiles(someFiles, someWritePath)
 *   .then(function() {
 *     // Any work done here is guaranteed to occur **after**
 *     // the new file has been successfully written
 *   })
 */

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  var files = filePaths.map(function(path){
   return new Promise(function(resolve, reject){
      fs.readFile(path,'utf8',function(err,data){
        if(err) reject(err);
        resolve(data);
      });
    })
  });

  return Promise.all(files)
  .then(function(fileArr){
    return fileArr.map(function(file){
      return file.split('\n')[0];
    });
  })
  .then(function(firstLines){
    return new Promise(function(resolve, reject){
      fs.writeFile(writePath, firstLines.join('\n'), 'utf8', function(err){
        if(err) reject(err);
        resolve();
      })
    });
  });

};

module.exports = combineFirstLineOfManyFiles;
