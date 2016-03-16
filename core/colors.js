var fs = require('fs');
var re = new RegExp("^([a-z ]+)\\s#([a-f0-9]{6})$");
var path = require('path');


var file = path.resolve(__dirname, 'colorlist')

var pairs = null;
var todo = [];

var data = fs.readFileSync(file, 'utf8');

var n = data.split("\n"); // newlines
pairs = n.map(function(line){
  var m = re.exec(line);
  if ( m ){
    var r = parseInt(m[2].substr(0,2), 16);
    var g = parseInt(m[2].substr(2,2), 16);
    var b = parseInt(m[2].substr(4,2), 16);
    return { name:m[1] , hex:m[2] ,r:r , g:g, b:b };
  }
}).filter( function(n){ return n; });

module.exports = pairs;
