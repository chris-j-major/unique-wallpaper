var Part = require("../Part");
var Color = require("../../core/Color");

// see: https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/

module.exports =
new Part(
  "disolve", /* name */
  ["filter"], /* types */
  function(){
    this.scale = this.random.range(0.01,0.2)* Math.min(this.opts.width,this.opts.height);
    this.description = this.scale;
  },
  {
    buildXML:function(xml){
      var filter = xml.ele("filter");
      filter.ele("feTurbulence",{baseFrequency:"0.87",numOctaves:"1",seed:"1",result:"TURB"});
      filter.ele("feDisplacementMap",{scale:this.scale,in:"SourceGraphic",in2:"TURB"});
      return filter
    }
  }
);
