var parts = require('./parts');
var core = require('./core');
var fs = require('fs');

parts.loadPart("blockFill");
parts.loadPart("blockShapes");
parts.loadPart("splitMask");
parts.loadPart("scatterShapes");
parts.loadPart("polygon");
parts.loadPart("stars");
parts.loadPart("circle");
parts.loadPart("midToneHilight");

var argv = require('minimist')(process.argv.slice(2));

if ( argv.key ){
  var struct = core.process(argv.key,argv.width||800,argv.height||600,parts);
  var xml = struct.build( true /* pretty */ )
  var options = { encoding: argv.encoding||'utf8' };
  var stream = fs.createWriteStream( argv.dest || "out.svg" , options );
  stream.write(xml);
  stream.end();
}
if ( argv.count ){
var options = { encoding: argv.encoding||'utf8' };
  for ( var n=0 ; n<parseInt(argv.count) ; n++ ){
    var struct = core.process(n,argv.width||800,argv.height||600,parts);
    var xml = struct.build( false )
    var stream = fs.createWriteStream( "out/"+n+".svg" , options );
    stream.write(xml);
    stream.end();
  }
}
