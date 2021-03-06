var Part = require("../Part");

module.exports = new Part(
  "chunks", /* name */
  ["colorset"], /* types */
  function(){
    this.a = this.choseDifferentColor( this.opts.bgcolor );
    this.b = this.choseDifferentColor( [this.opts.bgcolor,this.a] );
    this.step = this.random.range(0.01,0.4);
    this.description = this.a.toHex()+","+this.b.toHex();
    for ( var n=0.0;n<1.0;n+=this.step){
      this.image.addTerm("set-color",this.a.lerp(this.b , n ).toName() );
    }
  },
  {
    generate:function( l ){
      var l2 = Math.floor( l / this.step ) * this.step;
      return this.a.lerp( this.b , l2 );
    }
  }
);
