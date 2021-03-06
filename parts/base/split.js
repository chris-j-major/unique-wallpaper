var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = [
new Part(
  "splitH", /* name */
  ["base"], /* types */
  function(){
    var innerOpts = this.opts.extend( { width:(this.opts.width*0.5) } );
    this.image.addTerm("split","horizontal");
    this.image.addTerm("concept","split");
    this.subparts = [
      this.createPart("block" , 12 , innerOpts ),
      new SVGParts.Transform( this.createPart("block-interest" , 24 , innerOpts ) ,
        "translate("+(this.opts.width*0.5)+" 0)"
      )
    ];
  }
),
new Part(
  "splitV", /* name */
  ["base"], /* types */
  function(){
    var innerOpts = this.opts.extend( { height:(this.opts.height*0.5) } );
    this.image.addTerm("split","vertical");
    this.image.addTerm("concept","split");
    this.subparts = [
      this.createPart("block" , 12 , innerOpts ),
      new SVGParts.Transform( this.createPart("block-interest" , 24 , innerOpts ) ,
        "translate(0 "+(this.opts.height*0.5)+")"
      )
    ];
  }
),,
new Part(
  "splitC", /* name */
  ["base"], /* types */
  function(){
    var blockSize = Math.min(this.opts.height,this.opts.width) * this.random.range(0.3,1.2);
    var x = (this.opts.width - blockSize) * 0.5;
    var y = (this.opts.height - blockSize) * 0.5;
    var innerOpts = this.opts.extend( { width:blockSize , height:blockSize } );
    this.image.addTerm("split","centered");
    this.parts = this.get("parts").exclude("splitC");
    this.subparts = [
      this.createPart("block" , 12 , this.opts ),
      new SVGParts.Transform( this.createPart("block-interest" , 24 , innerOpts ) ,
        "translate("+x+" "+y+")"
      )
    ];
  }
)

];
