var Part = require("../Part");

module.exports =  [1,5,12].map(function(width){
  return new Part(
    "scribble("+width+")", /* name */
    ["line","stright-line"], /* types */
    function(){
      this.image.addTerm("line","scribble");
      this.color = this.opts.color || this.choseColor();
      this.a = this.opts.a || {
        x:this.random.range(0, this.opts.width ),
        y:this.random.range(0, this.opts.height ) };
      this.pointSet = this.createPart("pointset" , 12 , this.opts ),
      this.subparts = [
        this.pointSet
      ];
      this.length = this.random.range(2,20);
      this.description="("+this.a.x+","+this.a.y+"),"+this.color.toHex();
    },
    {
      buildXML:function(xml){
        var path = "M"+this.a.x+" "+this.a.y;
        for ( var i=0 ;i<this.length;i++){
          var p = this.pointSet.generate(i*2);
          var q = this.pointSet.generate((i*2)+1);
          path+= " Q"+p.x+" "+p.y+" "+q.x+" "+q.y
        }
        xml.ele('path',{
          d:path,
          stroke:this.color.toHex(),
          'stroke-width':width,
          'stroke-linecap':"round",
          fill:"none"
        });
      }
    }
  );
})
