var Part = require("../Part");

module.exports = new Part(
  "blockOverlay", /* name */
  ["block","block-interest"], /* types */
  function(){
    this.color = this.choseColor();
    this.image.addTerm("color",this.color.toName());
    this.overlay = this.createPart("overlay" , 7 , this.opts ),
    this.subparts = [ this.overlay ];
    this.description = this.color.toHex();
  },
  {
    buildXML:function(xml){
      var g = xml.ele('g');
      g.ele('rect',{x:0,y:0,width:this.opts.width,height:this.opts.height,fill: this.color.toHex() });
      this.subparts.map(function(subpart){
        subpart.buildXML( g );
      });
      return g;
    }
  }
);
