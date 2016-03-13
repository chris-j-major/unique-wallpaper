var Part = require("../Part");

module.exports = new Part(
  "blockLines", /* name */
  ["block","base","block-interest"], /* types */
  function(){
    this.bgcolor = this.choseColor();
    this.fgcolor = this.choseDifferentColor( this.bgcolor );
    this.fgcolor2 = this.choseDifferentColor( this.bgcolor );
    this.line = this.get('parts').find( this.index+6 , this.source , "line" );
    this.pointSetA = this.createPart("pointset-dynamic" , 3 , this.opts ),
    this.pointSetB = this.createPart("pointset" , 7 , this.opts ),
    this.pointSetC = this.createPart("pointset" , 12 , this.opts ),
    this.image.addTerm("color",this.fgcolor.toName());
    this.image.addTerm("color",this.bgcolor.toName());
    this.lineCount = this.random.range(3,20);
    this.subparts = [ this.pointSetA , this.pointSetB , this.pointSetC ];
    for ( var id=0; id<this.lineCount ;id++ ){
      var l = this.random.float();
      var lineopts = this.opts.extend({
        color:this.fgcolor.lerp(this.fgcolor2,l),
        a:this.pointSetA.generate(id),
        b:this.pointSetB.generate(id),
        c:this.pointSetC.generate(id)
      });
      this.subparts.push(
        this.line.create( this.image , this , this.source , id+this.index , lineopts )
      );
    }
    this.description = this.bgcolor.toHex()+"/"+this.fgcolor.toHex()+"/"+this.fgcolor2.toHex();
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
