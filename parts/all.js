module.exports = flatten([
  require("./base/split"),
  require("./simple/blockColor"),
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
