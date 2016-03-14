var Part = require("../Part");

module.exports = new Part(
  "sparkles", /* name */
  ["overlay"], /* types */
  function(){
    this.bgcolor = this.opts.bgcolor||this.choseColor();
    this.fgcolor = this.choseDifferentColor( this.bgcolor );
    this.fgcolor2 = this.choseDifferentColor( this.bgcolor );
    this.line = this.get('parts').find( this.index+6 , this.source , "line" );
    this.pointSet = this.createPart("pointset-dynamic" , 3 , this.opts );
    this.image.addTerm("color",this.fgcolor.toName());
    this.image.addTerm("color",this.fgcolor2.toName());
    this.image.addTerm("color",this.bgcolor.toName());
    this.lineCount = this.random.range(3,20);
    this.subparts = [ this.pointSet ];
    var points = [];
    for ( var id=0; id<this.lineCount ;id++ ){
      points[id] = this.pointSet.generate(id);
    }
    for ( var id=0; id<this.lineCount ;id++ ){
      var a = this.random.choose( points );
      var b = this.random.choose( points );
      var c = this.random.choose( points );
      var l = this.random.float();
      var lineopts = this.opts.extend({
        color:this.fgcolor.lerp(this.fgcolor2,l),
        a:a,
        b:b,
        c:c
      });
      this.subparts.push(
        this.line.create( this.image , this , this.source , id+this.index , lineopts )
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
