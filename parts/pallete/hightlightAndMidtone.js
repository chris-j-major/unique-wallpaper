var Part = require("../Part");
var Pallete = require("../Pallete");
var Color = require("../../core/Color")

module.exports = new Part(
  "hightlightAndMidtone", /* name */
  ["pallete"], /* types */
  function(){
    this.hue = this.random.float();
    this.sat = this.random.range(0.6,1.0);
    this.range = [];
    for ( var n=0.4; n<=0.6 ; n += 0.05){
      this.range.push( Color.fromHSL(this.hue , this.sat , n ) );
    }
    for ( var n=0; n<=0.4 ; n += 0.05){
      this.range.push( Color.fromHSL(this.hue , this.sat*0.3 , n ) );
    }
    for ( var n in this.range ){
      this.image.addTerm("set-color",this.range[n].toName());
    }
    this.description = this.hue+","+this.sat
  },
  Pallete
);
