var fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));

var unique = require("../");

if ( argv.key ){
  var image = unique().start(argv.key).size(argv.key,argv.width||800,argv.height||600);
  var xml = image.writeXML( true /* pretty */ )
  var options = { encoding: argv.encoding||'utf8' };
  var stream = fs.createWriteStream( argv.dest || "out.svg" , options );
  stream.write(xml);
  stream.end();
}
if ( argv.count ){
  var u = unique();
  var options = { encoding: argv.encoding||'utf8' };
  for ( var n=0 ; n<parseInt(argv.count) ; n++ ){
    var image = u.start(n).size(argv.width||800,argv.height||600);
    var xml = image.writeXML( true /* pretty */ )
    console.log( image.describe() );
    var stream = fs.createWriteStream( "out/"+n+".svg" , options );
    stream.write(xml);
    stream.end();
  }
}