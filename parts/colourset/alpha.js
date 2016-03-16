var Part = require("../Part");

module.exports = new Part(
  "alpha", /* name */
  ["colorset"], /* types */
  function(){
    this.a = this.choseDifferentColor( this.opts.bgcolor );
    this.image.addTerm("set-color",this.a.toName());
    this.description = this.a.toHex();
  },
  {
    generate:function( l ){
      return this.a.alpha( l );
    }
  }
);
