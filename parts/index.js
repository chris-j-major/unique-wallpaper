var allParts = [];
var byTag = {};

function addPart( part ){
  allParts.push( part );
  for ( var tagId in part.tags ){
    var tag = part.tags[tagId];
    if ( !byTag[tag] ){
      byTag[tag] = [];
    }
    byTag[tag].push(part);
  }
}

module.exports = {
  loadPart:function loadPart( part ){
    var p = require("./"+part);
    if ( p.forEach ){
      p.forEach( addPart );
    }else{
      addPart(p);
    }
  },
  getAllByTag:function getAllByTag(tag){
    if ( !byTag[tag] ) throw("No items found with tag '"+tag+"'")
    return byTag[tag];
  }
};
