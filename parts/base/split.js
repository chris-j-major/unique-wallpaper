var Part = require("../Part");

module.exports = new Part(
  "split", /* name */
  ["base"], /* types */
  function(){
    this.subparts = [
      this.createPart("block" , 12 , this.opts.extend( { width:this.opts.width*0.5 } ) ),
      this.createPart("block" , 24 , this.opts.extend( { width:this.opts.width*0.5 , x:this.opts.width*0.5 } ) )
    ];
  }
);
