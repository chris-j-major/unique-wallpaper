var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = [
new Part(
  "overlaymask", /* name */
  ["base"], /* types */
  function(){
    this.image.addTerm("concept","mask");
    this.mask = this.createPart("overlay" , 12 , this.opts );
    this.innerA = this.createPart("block-interest" , 12 , this.opts );
    this.innerB = this.createPart("block-interest" , 12 , this.opts );

    this.maskDef = this.image.createDef( new SVGParts.Mask( {} , [this.mask] ) );
    this.aDef = this.image.createDef( this.innerA );
    this.bDef = this.image.createDef( this.innerB );
    this.subparts = [
      this.innerA,
      this.innerB,
      this.mask
    ];
  },
  {
    buildXML:function(xml){
      var g = xml.ele("g")
      g.ele("use").att("xlink:href","#"+this.aDef);
      g.ele("use").att("xlink:href","#"+this.bDef).att("mask","url(#"+this.maskDef+")");
      return g;
    }
  }
)
];
