var Part = require("../Part");

module.exports = new Part(
  "distinct", /* name */
  ["colorset"], /* types */
  function(){
    this.a = this.choseDifferentColor( this.opts.bgcolor );
    this.b = this.choseDifferentColor( this.opts.bgcolor );
    this.threshold = this.random.float();
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
