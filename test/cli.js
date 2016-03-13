var fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));

var Unique = require("../");

var options = {
  swatch:argv.swatch||false,
  width:argv.width||800,
  height:argv.height||600  };

var unique = new Unique( options );


var fileOptions = { encoding: argv.encoding||'utf8' };

if ( argv.key ){
  var image = unique.create( parseInt(argv.key) );

  console.log(" Image for: '"+argv.key+"'");
  var stream = fs.createWriteStream( argv.dest || "out.svg" , fileOptions );
  stream.write( image.toXML() );
  stream.end();
  console.log( image.toDescription() );
  console.log( image.terms );
}else{
  console.log("need to specify a key")
}
