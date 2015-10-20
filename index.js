'use strict';

var url = require('url');
var path = require('path');
var utils = require('./utils');

module.exports = function(dir, cb) {
  if (typeof dir === 'function') {
    cb = dir;
    dir = '';
  }

  utils.origin(utils.cwd(dir), function (err, giturl) {
    if (err) return cb(err);

    var parsed = url.parse(giturl);
    var segments = parsed.pathname.split(path.sep);
    cb(null, utils.filename(segments.pop()));
  });
};

module.exports.sync = function(dir) {
  var giturl = utils.origin.sync(utils.cwd(dir));
  if (!giturl) {
    console.error(utils.red('cannot find ".git/config"'));
    return null;
  }
  var parsed = url.parse(giturl);
  var segments = parsed.pathname.split(path.sep);
  return utils.filename(segments.pop());
};
