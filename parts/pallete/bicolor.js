var Part = require("../Part");
var Pallete = require("../Pallete");
var Color = require("../../core/Color")

module.exports = new Part(
  "biclor", /* name */
  ["pallete"], /* types */
  function(){
    this.hue = this.random.float();
    this.sat = this.random.range(0.2,1.0);
    var alt = this.random.range( 1.0 , 0.6 );
    this.range = [];
    for ( var n=0; n<=1.0 ; n += 0.1){
      var altN = n * alt;
      this.range.push( Color.fromHSL(this.hue , this.sat , n ) );
      this.range.push( Color.fromHSL(this.hue+(1/3) , this.sat , altN ) );
    }
    this.description = this.hue+","+this.sat
  },
  Pallete
);
