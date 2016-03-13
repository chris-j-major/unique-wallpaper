var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = [
new Part(
  "splitH", /* name */
  ["base","block"], /* types */
  function(){
    var innerOpts = this.opts.extend( { width:(this.opts.width*0.5) } );
    this.image.addTerm("split","horozontal");
    this.subparts = [
      this.createPart("block-simple" , 12 , innerOpts ),
      new SVGParts.Transform( this.createPart("block-simple" , 24 , innerOpts ) ,
        "translate("+(this.opts.width*0.5)+" 0)"
      )
    ];
  }
),
new Part(
  "splitV", /* name */
  ["base","block"], /* types */
  function(){
    var innerOpts = this.opts.extend( { height:(this.opts.height*0.5) } );
    this.image.addTerm("split","vertical");
    this.subparts = [
      this.createPart("block-simple" , 12 , innerOpts ),
      new SVGParts.Transform( this.createPart("block-simple" , 24 , innerOpts ) ,
        "translate(0 "+(this.opts.height*0.5)+")"
      )
    ];
  }
)

];
