var Part = require("../Part");
var Color = require("../../core/Color");

module.exports = [
new Part(
  "halfmask-horozontal", /* name */
  ["blockmask"], /* types */
  function(){
    this.image.addTerm("mask","halfmask");
    this.x = this.random.float();
    this.description = this.x;
    var xpos = this.opts.height * this.x;
    var xpos2 = this.opts.height * (1.0-this.x);
    this.points = "0,"+xpos+
                  " "+this.opts.width+","+xpos2+
                  " "+this.opts.width+","+this.opts.height+
                  " 0,"+this.opts.height;
  },
  {
    xml:function(xml){
      return xml.ele('polygon',{
          points:this.points,
          fill:Color.white.toHex()
        });
    }
  }
),
new Part(
  "halfmask-vertical", /* name */
  ["blockmask"], /* types */
  function(){
    this.x = this.random.float();
    this.description = this.x;
    var ypos = this.opts.width * this.x;
    var ypos2 = this.opts.width * (1.0-this.x);
    this.points = ypos+",0"+
                  " "+ypos2+","+this.opts.height
                  " "+this.opts.width+","+this.opts.height+
                  " "+this.opts.width+",0";
  },
  {
    xml:function(xml){
      return xml.ele('polygon',{
          points:this.points,
          fill:Color.white.toHex()
        });
    }
  }
)];
