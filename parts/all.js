module.exports = flatten([
  require("./base/dualfilter"),
  require("./base/filter"),
  require("./base/mirrorBlocks"),
  require("./base/overlayMask"),
  require("./base/split"),
  require("./base/splitMask"),

  require("./colourset/lerp"),
  require("./colourset/distinct"),
  require("./colourset/chunks"),
  require("./colourset/alpha"),

  require("./extras/swatch"),
  require("./extras/text"),

  require("./filter/bevel"),
  require("./filter/disolve"),
  require("./filter/roughen"),
  require("./filter/sharpen"),
  require("./filter/splash"),

  require("./lines/straight"),
  require("./lines/curve"),
  require("./lines/scribble"),

  require("./mask/halfmask"),

  require("./overlay/lines"),
  require("./overlay/network"),
  require("./overlay/shapes"),
  require("./overlay/sparkles"),

  require("./pallete/monochrome"),
  require("./pallete/hightlightAndMidtone"),
  require("./pallete/bicolor"),

  require("./pointset/static"),

  require("./pointset/linear"),
  require("./pointset/circular"),
  require("./pointset/grid"),
  require("./pointset/spiral"),
  require("./pointset/tree"),

  require("./shapes/polygon"),
  require("./shapes/stars"),
  require("./shapes/ring"),
  require("./shapes/circle"),

  require("./simple/blockColor"),
  require("./simple/blockOverlay"),

  require("./spacial/radial"),
  require("./spacial/chaos"),
  require("./spacial/linear"),

  require("./tiles/squares"),
  require("./tiles/triangles"),
])

function flatten( m ){
  var retval = [];
  for ( var id in m ){
    if ( m[id].push ){
      retval = retval.concat(m[id]);
    }else{
      retval.push(m[id]);
    }
  }
  return retval;
}
