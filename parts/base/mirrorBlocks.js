var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = [
new Part(
  "mirrorBlocks", /* name */
  ["base"], /* types */
  function(){
    this.image.addTerm("concept","mask");
    this.inner = this.createPart("block-interest" , 12 , this.opts );
    this.mask = this.createPart("blockmask" , 12 , this.opts );
    this.transform = this.random.choose(["translate("+this.opts.width+",0) scale(-1,1)",
                                         "translate(0,"+this.opts.height+") scale(1,-1)",
                                         "translate("+this.opts.width+","+this.opts.height+") scale(-1,-1)"]);
    this.maskDef = this.image.createDef( new SVGParts.Mask( {} , [this.mask] ) );
    this.def = this.image.createDef( this.inner );
    this.subparts = [
      this.inner,
      this.mask
    ];
  },
  {
    buildXML:function(xml){
      var g = xml.ele("g")
      g.ele("use").att("xlink:href","#"+this.def);
      g.ele("use").att("transform",this.transform).att("xlink:href","#"+this.def).att("mask","url(#"+this.maskDef+")");
      return g;
    }
  }
)
];
