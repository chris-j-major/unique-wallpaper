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
    addPart(p);
  },
  getAllByTag:function getAllByTag(tag){
    return byTag[tag];
  }
};
