var Part = require("../Part");
var Color = require("../../core/Color");

// see: https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/

module.exports =
new Part(
  "splash", /* name */
  ["filter"], /* types */
  function(){
    this.color1 = this.choseColor();
    this.image.addTerm("color",this.color1.toName());
    this.color2 = this.choseColor();
    this.image.addTerm("color",this.color2.toName());
    this.color3 = this.choseColor();
    this.image.addTerm("color",this.color3.toName());
    this.description = this.color1.toHex()+","+this.color2.toHex()+","+this.color3.toHex();
  },
  {
    buildXML:function(xml){
      var filter = xml.ele("filter",{ width:"150%",height:"150%",x:"-25%",y:"-25%"});
      // COLORS
      filter.ele("feFlood",{'flood-color':this.color1.toHex(),result:"COLOR-blue"});
      filter.ele("feFlood",{'flood-color':this.color2.toHex(),result:"COLOR-violet"});
      filter.ele("feFlood",{'flood-color':this.color3.toHex(),result:"COLOR-violet-light"});
      // BOTTOM splash
      filter.ele("feTurbulence",{baseFrequency:"0.05",type:"fractalNoise",numOctaves:1,seed:2,result:"BOTTOM-SPLASH_10"});
      filter.ele("feGaussianBlur",{stdDeviation:"6.5",in:"SourceAlpha",result:"BOTTOM-SPLASH_20"});
      filter.ele("feDisplacementMap",{scale:"420",in:"BOTTOM-SPLASH_20",in2:"BOTTOM-SPLASH_10",result:"BOTTOM-SPLASH_30"});
      filter.ele("feComposite",{operator:"in",in:"COLOR-blue",in2:"BOTTOM-SPLASH_30",result:"BOTTOM-SPLASH_40"});

      // MIDDLE SPLASH
      filter.ele("feTurbulence",{baseFrequency:"0.1",type:"fractalNoise",numOctaves:"1",seed:"1",result:"MIDDLE-SPLASH_10"});
      filter.ele("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"0.1",result:"MIDDLE-SPLASH_20"});
      filter.ele("feDisplacementMap",{in:"MIDDLE-SPLASH_20",in2:"MIDDLE-SPLASH_10",scale:"25",result:"MIDDLE-SPLASH_30"});
      filter.ele("feComposite",{in:"COLOR-violet-light",in2:"MIDDLE-SPLASH_30",operator:"in",result:"MIDDLE-SPLASH_40"});

      // TOP SPLASH
      filter.ele("feTurbulence",{baseFrequency:"0.07",type:"fractalNoise",numOctaves:"1",seed:"1",result:"TOP-SPLASH_10"});
      filter.ele("feGaussianBlur",{stdDeviation:"3.5",in:"SourceAlpha",result:"TOP-SPLASH_20"});
      filter.ele("feDisplacementMap",{scale:"220",in:"TOP-SPLASH_20",in2:"TOP-SPLASH_10",result:"TOP-SPLASH_30"});
      filter.ele("feComposite",{operator:"in",in:"COLOR-violet",in2:"TOP-SPLASH_30",result:"TOP-SPLASH_40"});

      // LIGHT EFFECTS
      var light = filter.ele("feMerge",{result:"LIGHT-EFFECTS_10"})
        light.ele("feMergeNode",{in:"BOTTOM-SPLASH_40"});
        light.ele("feMergeNode",{in:"MIDDLE-SPLASH_40"});
        light.ele("feMergeNode",{in:"TOP-SPLASH_40"});

      filter.ele("feColorMatrix",{
        type:"matrix",
        values:"0 0 0 0 0,0 0 0 0 0,0 0 0 0 0,0 0 0 1 0",
        in:"LIGHT-EFFECTS_10",result:"LIGHT-EFFECTS_20"});

      filter.ele("feGaussianBlur",{ stdDeviation:"2", in:"LIGHT-EFFECTS_20", result:"LIGHT-EFFECTS_30"});
      filter.ele("feSpecularLighting",{ surfaceScale:"5", specularConstant:".75", specularExponent:"30", 'lighting-color':"#white", in:"LIGHT-EFFECTS_30", result:"LIGHT-EFFECTS_40"})
        .ele("fePointLight",{x:"-50",y:"-100",z:"400"})
      filter.ele("feComposite",{ operator:"in", in:"LIGHT-EFFECTS_40",in2:"LIGHT-EFFECTS_20",result:"LIGHT-EFFECTS_50"});
      filter.ele("feComposite",{ operator:"arithmetic", k1:"0", k2:"1", k3:"1", k4:"0", in:"LIGHT-EFFECTS_10", in2:"LIGHT-EFFECTS_50", result:"LIGHT-EFFECTS_60"});

      return filter
    }
  }
);
