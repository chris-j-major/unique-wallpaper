var fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));

var unique = require("../");

console.log(unique().parts.counts);

if ( argv.key ){
  var image = unique()
    .start(argv.key)
    .size(argv.width||800,
          argv.height||600);
  var xml = image.writeXML( true /* pretty */ )
  var options = { encoding: argv.encoding||'utf8' };
  var stream = fs.createWriteStream( argv.dest || "out.svg" , options );
  stream.write(xml);
  stream.end();
  console.log( "\n\nimage seed: "+argv.key+"\n"+image.describe() );
}
if ( argv.count ){
  var u = unique();
  var options = { encoding: argv.encoding||'utf8' };
  for ( var n=0 ; n<parseInt(argv.count) ; n++ ){
    var image = u.start(n).size(argv.width||800,argv.height||600);
    var xml = image.writeXML( true /* pretty */ )
    var stream = fs.createWriteStream( "out/"+n+".svg" , options );
    stream.write(xml);
    stream.end();
  }
}
