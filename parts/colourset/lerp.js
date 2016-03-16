var Part = require("../Part");

module.exports = new Part(
  "lerp", /* name */
  ["colorset"], /* types */
  function(){
    this.a = this.choseDifferentColor( this.opts.bgcolor );
    this.b = this.choseDifferentColor( [this.opts.bgcolor,this.a] );
    this.image.addTerm("set-color",this.a.toName());
    this.image.addTerm("set-color",this.b.toName());
    this.description = this.a.toHex()+","+this.b.toHex();
  },
  {
    generate:function( l ){
      return this.a.lerp( this.b , l );
    }
  }
);
