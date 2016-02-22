var parts = require('./parts');
var core = require('./core');
var fs = require('fs');

parts.loadPart("blockFill");

var argv = require('minimist')(process.argv.slice(2));

if ( argv.key ){
  var struct = core.process(argv.key,argv.width||800,argv.height||600,parts);
  var xml = struct.build( true /* pretty */ )
  var options = { encoding: argv.encoding||'utf8' };
  var stream = fs.createWriteStream( argv.dest || "out.svg" , options );
  stream.write(xml);
  stream.end();
}
