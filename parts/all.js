module.exports = flatten([
  require("./base/split"),
  require("./simple/blockColor"),
  require("./simple/blockShapes"),
  require("./simple/blockLines"),
  require("./shapes/polygon"),
  require("./shapes/stars"),
  require("./lines/straight"),
  require("./lines/curve"),
  require("./pointset/static"),
  require("./pointset/linear"),
  require("./pointset/circular"),
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
