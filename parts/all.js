module.exports = flatten([
  require("./base/split"),
  require("./base/overlayMask"),
  require("./simple/blockColor"),
  require("./simple/blockOverlay"),
  require("./overlay/lines"),
  require("./overlay/shapes"),
  require("./shapes/polygon"),
  require("./shapes/stars"),
  require("./shapes/ring"),
  require("./shapes/circle"),
  require("./lines/straight"),
  require("./lines/curve"),
  require("./lines/scribble"),
  require("./pointset/static"),
  require("./pointset/linear"),
  require("./pointset/circular"),
  require("./pointset/grid"),
  require("./pointset/spiral"),
  require("./pallete/monochrome"),
  require("./pallete/hightlightAndMidtone"),
  require("./pallete/bicolor"),
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
