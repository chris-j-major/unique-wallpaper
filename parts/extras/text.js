var Part = require("../Part");

module.exports = [
new Part(
  "textMain", /* name */
  ["textMain"], /* types */
  function(){
    this.text = this.opts.text;
    this.x = this.opts.width * 0.1;
    this.y = this.opts.height * 0.1;
  },
  {
    buildXML:function(xml){
      xml.ele("text",{ x:this.x, y:this.y, style:"font-size:56;fill:#000000;"},this.text );
      xml.ele("text",{ x:this.x-2, y:this.y-2, style:"font-size:56;fill:#ffffff;"},this.text );
      return xml;
    }
  }
),
new Part(
  "textSub", /* name */
  ["textSub"], /* types */
  function(){
    this.text = this.opts.text;
    this.x = this.opts.width * 0.8;
    this.y = this.opts.height * 0.8;
  },
  {
    buildXML:function(xml){
      xml.ele("text",{ x:this.x, y:this.y, style:"font-size:24;fill:#000000;"},this.text );
      xml.ele("text",{ x:this.x-2, y:this.y-2, style:"font-size:24;fill:#ffffff;"},this.text );
      return xml;
    }
  }
)
];
