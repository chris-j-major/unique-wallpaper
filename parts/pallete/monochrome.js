var Part = require("../Part");
var Pallete = require("../Pallete");
var Color = require("../../core/Color")

module.exports = new Part(
  "monochrome", /* name */
  ["pallete"], /* types */
  function(){
    this.hue = this.random.float();
    this.sat = this.random.range(0.2,1.0);
    this.range = [];
    for ( var n=0; n<=1.0 ; n += 0.1){
      this.range.push( Color.fromHSL(this.hue , this.sat , n ) );
    }
  },
  Pallete
);
