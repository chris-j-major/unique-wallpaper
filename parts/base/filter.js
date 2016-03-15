var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = [
new Part(
  "filterBase", /* name */
  ["base"], /* types */
  function(){
    this.image.addTerm("concept","filter");
    this.inner = this.createPart("overlay" , 1 , this.opts );
    this.filter = this.createPart("filter" , 2 , this.opts );
    this.def = this.image.createDef( this.filter );
    this.subparts = [
      this.inner,
      this.filter
    ];
  },
  {
    buildXML:function(xml){
      var g = xml.ele("g",{"filter":"url(#"+this.def+")"});
      this.inner.buildXML( g );
      return g;
    }
  }
)
];
