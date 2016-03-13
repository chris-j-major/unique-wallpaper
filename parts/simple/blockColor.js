var Part = require("../Part");

module.exports = new Part(
  "blockColor", /* name */
  ["block","block-simple"], /* types */
  function(){
    this.color = this.choseColor();
    this.image.addTerm("color",this.color.toName());
    this.description = this.color.toHex();
  },
  {
    buildXML:function(xml){
      return xml.ele('rect',{x:0,y:0,width:this.opts.width,height:this.opts.height,fill: this.color.toHex() });
    }
  }
);
