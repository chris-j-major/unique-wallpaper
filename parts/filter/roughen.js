var Part = require("../Part");
var Color = require("../../core/Color");

// see: https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/

module.exports =
new Part(
  "roughen", /* name */
  ["filter"], /* types */
  function(){
    //this.color1 = this.choseColor();
    //this.image.addTerm("color",this.color1.toName());
    //this.description = this.color1.toHex();
    this.baseFreq = this.random.range(0.1,0.001);
    if ( this.random.bool() ){
      this.baseFreq += ","+this.baseFreq; // this makes it one dimensional
    }
    this.description = this.baseFreq;
  },
  {
    buildXML:function(xml){
      var filter = xml.ele("filter");

      filter.ele("feTurbulence",{baseFrequency:this.baseFreq,type:"fractalNoise",numOctaves:4,seed:2,result:"FRACTAL-TEXTURE_10"});
      filter.ele("feColorMatrix",{
        type:"matrix",
        values:"0 0 0 0 0,0 0 0 0 0,0 0 0 0 0,0 0 0 -1.2 1.1",
        in:"FRACTAL-TEXTURE_10",result:"FRACTAL-TEXTURE_20"});
      filter.ele("feComposite",{ operator:"in", in:"SourceGraphic",in2:"FRACTAL-TEXTURE_20",result:"RESULT"});

      return filter
    }
  }
);
