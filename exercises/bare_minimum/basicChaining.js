/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');
var pluckFirstLineFromFileAsync = promiseConstructor.pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = promisification.getGitHubProfileAsync;

Promise.promisifyAll(fs);
Promise.promisifyAll(request);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath).then(function(user) {
    return getGitHubProfileAsync(user);
  }).then(function(newUser) {
    return fs.writeFileAsync(writeFilePath, JSON.stringify(newUser));
  })

  
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
