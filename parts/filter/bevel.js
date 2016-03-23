var Part = require("../Part");
var Color = require("../../core/Color");

// see: https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/

module.exports =
new Part(
  "bevel", /* name */
  ["filter"], /* types */
  function(){
    this.description = "";
    this.image.addTerm("filter","bevel");
  },
  {
    buildXML:function(xml){
      var filter = xml.ele("filter");
      filter.ele("feGaussianBlur",{stdDeviation:"5",in:"SourceAlpha",result:"BLUR"});

      filter.ele("feSpecularLighting",{ surfaceScale:"6", specularConstant:"1", specularExponent:"30",
      'lighting-color':"rgb(255,255,255)", in:"BLUR", result:"SPEC"})
        .ele("fePointLight",{x:"40",y:"-30",z:"200"})

      filter.ele("feComposite",{ operator:"in", in:"SPEC",in2:"SourceAlpha",result:"COMP"});

      var merge = filter.ele("feMerge")
        merge.ele("feMergeNode",{in:"SourceGraphic"});
        merge.ele("feMergeNode",{in:"COMP"});

      return filter
    }
  }
);


/**
<!--We create a heightmap by blurring the source: -->

<feGaussianBlur stdDeviation="5" in="SourceAlpha" result="BLUR"/>

<!-- We then define a lighting effect with a point light that is positioned at virtual 3D coordinates x: 40px, y: -30px, z: 200px: -->

<feSpecularLighting surfaceScale="6" specularConstant="1" specularExponent="30" lighting-color="#white" in="BLUR" result="SPECULAR">
    <fePointLight x="40" y="-30" z="200" />
</feSpecularLighting>

<!-- We cut off the parts that overlap the source graphic… -->

<feComposite operator="in" in="SPECULAR" in2="SourceAlpha" result="COMPOSITE"/>

<!-- … and then merge source graphic and lighting effect: -->

<feMerge>
    <feMergeNode in="SourceGraphic" />
    <feMergeNode in="COMPOSITE"/>
</feMerge>
**/
