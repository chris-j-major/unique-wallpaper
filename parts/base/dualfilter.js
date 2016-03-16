var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = [
new Part(
  "dualFilter", /* name */
  ["base"], /* types */
  function(){
    this.image.addTerm("concept","filter");
    this.back = this.createPart("block" , 1 , this.opts );
    this.inner = this.createPart("overlay" , 4 , this.opts );
    this.filter = this.createPart("filter" , 8 , this.opts );
    this.def = this.image.createDef( this.filter );
    this.subparts = [
      this.back,
      this.inner,
      this.filter
    ];
  },
  {
    buildXML:function(xml){
      this.back.buildXML( xml );
      this.inner.buildXML( xml );
      var g = xml.ele("g",{"filter":"url(#"+this.def+")"});
      this.inner.buildXML( g );
      return g;
    }
  }
)
];
