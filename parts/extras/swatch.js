var Part = require("../Part");

module.exports = new Part(
  "swatch", /* name */
  ["swatch"], /* types */
  function(){
    this.pallete = this.get('pallete');
    this.height = this.opts.height * 0.1;
    this.width = this.opts.width;
  },
  {
    buildXML:function(xml){
      var g = xml.ele("g")
      var x = 0;
      var xscale = this.width / this.pallete.range.length;
      for ( var id in this.pallete.range ){
        var r = this.pallete.range[id];
        var w = xscale;
        g.ele("rect",{x:x,y:0,width:w,height:this.height,fill:r.toHex()});
        g.ele("text",{ x:x+(w*0.2), y:this.height*0.2 , style:"font-size:12;fill:#000000;"},r.toName() );
        g.ele("text",{ x:x+(w*0.2), y:this.height*0.4 , style:"font-size:12;fill:#ffffff;"},r.toName() );
        g.ele("text",{ x:x+(w*0.2), y:this.height*0.6 , style:"font-size:12;fill:#ffffff;"},r.toHex() );
        x+= w;
      }
      return g;
    }
  }
);
