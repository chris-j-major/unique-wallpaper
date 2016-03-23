var Part = require("../Part");

module.exports = new Part(
  "shapes", /* name */
  ["overlay"], /* types */
  function(){
    this.image.addTerm("overlay","shapes");
    this.bgcolor = this.opts.bgcolor||this.choseColor();
    this.fgcolor = this.choseDifferentColor( this.bgcolor );
    this.fgcolor2 = this.choseDifferentColor( this.bgcolor );
    this.shape = this.get('parts').find( this.index+5 , this.source , "shape" );
    this.pointSet = this.createPart("pointset-dynamic" , 3 , this.opts ),
    this.image.addTerm("color",this.fgcolor.toName());
    this.image.addTerm("color",this.bgcolor.toName());
    this.shapeCount = this.random.range(3,20);
    this.subparts = [];
    for ( var id=0; id<this.shapeCount ;id++ ){
      var l = this.random.float();
      var ps = this.pointSet.generate(id);
      var shapeopts = this.opts.extend( ps ).extend({
        color:this.fgcolor.lerp(this.fgcolor2,l)
      });
      this.image.addTerm("color",shapeopts.color.toName());
      this.subparts.push(
        this.shape.create( this.image , this , this.source , id+this.index , shapeopts )
      );
    }
    this.description = this.fgcolor.toHex()+"/"+this.fgcolor2.toHex();
  },
  {
    xml:function(xml){
      return xml.ele('g');
    }
  }
);
