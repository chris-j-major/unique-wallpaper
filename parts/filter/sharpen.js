var Part = require("../Part");
var Color = require("../../core/Color");

// see: https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/

module.exports =
new Part(
  "sharpen", /* name */
  ["filter"], /* types */
  function(){
    this.image.addTerm("filter","sharpen");
    var neg = this.random.range(-1,-3);
    var pos = -(neg * 8)/12;
    this.matrix = [
      [ pos , pos , pos , pos , pos ],
      [ pos , neg , neg , neg , pos ],
      [ pos , neg , 0.01 , neg , pos ],
      [ pos , neg , neg , neg , pos ],
      [ pos , pos , pos , pos , pos ]
    ];
    this.m = this.matrix.map( function(row){
      return row.join(" ");
    }).join(",");
    this.description = pos+","+neg;
  },
  {
    buildXML:function(xml){
      var filter = xml.ele("filter");
      filter.ele("feConvolveMatrix",{order:"5", kernelMatrix:this.m});
      filter.ele("feColorMatrix",{type:"luminanceToAlpha"});
      return filter
    }
  }
);

/*
<filter id="no_op">
  <feConvolveMatrix order="3" kernelMatrix="0 0 0 0 1 0 0 0 0"/>
</filter>
*/
