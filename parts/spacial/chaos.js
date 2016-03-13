var Part = require("../Part");

module.exports = new Part(
  "raidal", /* name */
  ["chaos"], /* types */
  function(){
    this.bgcolor = this.opts.bgcolor||this.choseColor();
    this.colorset = this.createPart("colorset" , 3 , this.opts.extend({bgcolor:this.bgcolor}) );
    this.subparts = [ this.colorset ];
  },
  {
    generate:function(x,y){
      return this.colorset.generate( this.random.float() );
    }
  }
);
