var Part = require("../Part");

module.exports = new Part(
  "chaos", /* name */
  ["spacial"], /* types */
  function(){
    this.image.addTerm("spacial","chaos");
    this.bgcolor = this.opts.bgcolor||this.choseColor();
    this.image.addTerm("color",this.bgcolor.toName());
    this.colorset = this.createPart("colorset" , 3 , this.opts.extend({bgcolor:this.bgcolor}) );
    this.subparts = [ this.colorset ];
  },
  {
    generate:function(x,y){
      return this.colorset.generate( this.random.float() );
    }
  }
);
