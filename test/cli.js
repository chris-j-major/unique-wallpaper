var fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));

var Unique = require("../");

var options = {
  swatch:(argv.swatch||false),
  mainText:(argv.main||null),
  subText:(argv.sub||null),
  width:(argv.width||800),
  height:(argv.height||600)  };

var unique = new Unique( options );


var fileOptions = { encoding: argv.encoding||'utf8' };

if ( argv.seed || argv.key ){
  console.log(" Image for: '"+(argv.key||argv.seed)+"'");
  var image = unique.create( argv.key || parseInt(argv.seed) );
  if ( argv.describe ){
    console.log( image.toDescription() );
  }
  if ( argv.terms ){
    console.log( image.terms );
  }
  var stream = fs.createWriteStream( argv.dest || "out.svg" , fileOptions );
  stream.write( image.toXML( argv.pretty ) );
  stream.end();
}else if ( argv.count ){
  for ( var index=0; index<argv.count ; index++ ){
    var image = unique.create( index );
    console.log(" Generating image for: '"+(index)+"'");
    var stream = fs.createWriteStream( argv.dest || "out/"+index+".svg" , fileOptions );
    stream.write( image.toXML( argv.pretty ) );
    stream.end();
    if ( argv.describe ){
      var stream = fs.createWriteStream( argv.dest || "out/"+index+".txt" , fileOptions );
      stream.write( image.toDescription( argv.pretty ) );
      stream.end();
    }
    if ( argv.terms ){
      console.log( image.terms );
    }
  }
}else{
  console.log("need to specify a seed , key or count")
}
