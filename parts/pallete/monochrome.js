var Part = require("../Part");
var Pallete = require("../Pallete");
var Color = require("../../core/Color")

module.exports = new Part(
  "monochrome", /* name */
  ["pallete"], /* types */
  function(){
    this.image.addTerm("pallete","monochrome");
    this.hue = this.random.float();
    this.sat = this.random.range(0.2,1.0);
    this.range = [];
    for ( var n=0; n<=1.0 ; n += 0.1){
      this.range.push( Color.fromHSL(this.hue , this.sat , n ) );
    }
    for ( var n in this.range ){
      this.image.addTerm("set-color",this.range[n].toName());
    }
    this.description = this.hue+","+this.sat
  },
  Pallete
);
