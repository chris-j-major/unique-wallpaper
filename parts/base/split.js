var Part = require("../Part");
var SVGParts = require("../SVGParts");

module.exports = new Part(
  "split", /* name */
  ["base"], /* types */
  function(){
    var innerOpts = this.opts.extend( { width:this.opts.width*0.5 } );
    this.subparts = [
      this.createPart("block" , 12 , innerOpts ),
      new SVGParts.Transform( this.createPart("block" , 24 , innerOpts ) ,
        "translate("+(this.opts.width*0.5)+" 0)"
      )
    ];
  }
);
