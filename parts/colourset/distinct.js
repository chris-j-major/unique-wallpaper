var Part = require("../Part");

module.exports = new Part(
  "distinct", /* name */
  ["colorset"], /* types */
  function(){
    this.a = this.choseDifferentColor( this.opts.bgcolor );
    this.b = this.choseDifferentColor( [this.opts.bgcolor,this.a] );
    this.image.addTerm("set-color",this.a.toName());
    this.image.addTerm("set-color",this.b.toName());
    this.threshold = this.random.range(0.1,0.9);
    this.description = this.a.toHex()+","+this.b.toHex();
  },
  {
    generate:function( l ){
      if ( l < this.threshold ){
        return this.a;
      }else{
        return this.b;
      }
    }
  }
);
