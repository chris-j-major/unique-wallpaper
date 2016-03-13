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
),,
new Part(
  "splitC", /* name */
  ["base","block"], /* types */
  function(){
    var blockSize = Math.min(this.opts.height,this.opts.width) * this.random.range(0.3,1.2);
    var x = (this.opts.width - blockSize) * 0.5;
    var y = (this.opts.height - blockSize) * 0.5;
    var innerOpts = this.opts.extend( { width:blockSize , height:blockSize } );
    this.image.addTerm("split","centered");
    this.parts = this.get("parts").exclude("splitC");
    this.subparts = [
      this.createPart("block-simple" , 12 , this.opts ),
      new SVGParts.Transform( this.createPart("block" , 24 , innerOpts ) ,
        "translate("+x+" "+y+")"
      )
    ];
  }
)


];
