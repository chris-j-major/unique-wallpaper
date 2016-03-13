var Part = require("../Part");

module.exports = new Part(
  "blockShapes", /* name */
  ["block","block-simple"], /* types */
  function(){
    this.bgcolor = this.choseColor();
    this.fgcolor = this.choseDifferentColor( this.bgcolor );
    this.shape = this.get('parts').find( this.index+5 , this.source , "shape" );
    this.pointSet = this.createPart("pointset" , 3 , this.opts ),
    this.image.addTerm("color",this.fgcolor.toName());
    this.image.addTerm("color",this.bgcolor.toName());
    this.shapeCount = this.random.range(3,20);
    this.subparts = [];
    for ( var id=0; id<this.shapeCount ;id++ ){
      var shapeopts = this.opts.extend( this.pointSet.generate(id) ).extend({
        color:this.fgcolor
      });
      this.subparts.push(
        this.shape.create( this.image , this , this.source , id+this.index , shapeopts )
      );
    }
    this.description = this.bgcolor.toHex()+"/"+this.fgcolor.toHex();
  },
  {
    buildXML:function(xml){
      xml.ele('rect',{x:0,y:0,width:this.opts.width,height:this.opts.height,fill: this.bgcolor.toHex() });
      this.subparts.map(function(subpart){
        subpart.buildXML( xml );
      });
    }
  }
);
