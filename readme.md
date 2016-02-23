unique-wallpaper
================

The aim of this project is to generate 'procedural' distinct wallpaper like
graphics.

It takes a seed (integer) and recursively uses a pseudo-random number generator
to construct an svg image.

usage
-----
```javascript
var uniqueLib = require("unique"); // load the library
var unique = uniqueLib({}); // initalise with defaults

var image = unique.start( 500 /* key value */)
  .size(argv.key,argv.width||800,argv.height||600) // optional size
var xml = image.writeXML( true /* pretty */ ); // generate xml into a string
```


tests
-----
Using node.js run:
 `node test/cli.js --key 54`
to generate the image with the key `54` as `out.svg`.

For testing/batch use tun:
  `node test/cli.js --count 500`
to generate 500 images in a directory named `out`.
