var Part = require("../Part");

module.exports = new Part(
  "network", /* name */
  ["overlay"], /* types */
  function(){
    this.image.addTerm("overlay","network");
    this.bgcolor = this.opts.bgcolor||this.choseColor();
    this.image.addTerm("color",this.bgcolor.toName());
    this.spacial = this.createPart("spacial" , 2 , this.opts.extend({bgcolor:this.bgcolor}) );
    this.pointCount = Math.floor(this.random.range(5,180));
    this.width = this.random.range(1,24);
    this.pointSet = this.createPart("pointset-dynamic" , 8 , this.opts.extend({range:this.pointCount}) ),
    this.subparts = [ this.spacial , this.pointSet ];
    this.description = this.bgcolor.toHex()+","+this.pointCount+","+this.width;
    this.points = [];
    this.pairs = [];
    var unconnected = [];
    var connected = [0];
    for ( var n=0;n<this.pointCount;n++ ){
      this.points.push( this.pointSet.generate(n) );
      if ( n > 0 ) unconnected.push(n);
    }
    // minimal spanning tree
    while ( connected.length < this.pointCount ){
      var bestSrc = -1;
      var bestDest = -1;
      var bestIndex = -1;
      var bestLength = 1000000;
      for ( var u in unconnected ){
        var pu = this.points[ unconnected[u] ];
        for ( var c in connected ){
          var pc = this.points[ connected[c] ];
          var dx = pu.x - pc.x;
          var dy = pu.y - pc.y;
          var d = (dx*dx)+(dy*dy);
          if ( d < bestLength){
            bestSrc = unconnected[u];
            bestIndex = u;
            bestDest = connected[c];
            bestLength = d;
          }
        }
      }
      if ( bestSrc == -1 ){
        break; // cancel
      }else{
        connected.push( bestSrc );
        unconnected.splice( bestIndex , 1 );
        this.pairs.push([ bestSrc , bestDest ]);
      }
    }
  },
  {
    buildXML:function(xml){
      var path = "";
      for ( var id in this.pairs ){
        var pa = this.points[ this.pairs[id][0] ];
        var pb = this.points[ this.pairs[id][1] ];
        var c = this.spacial.generate( (pa.x+pb.x)*0.5 , (pa.y+pb.y)*0.5  );
        xml.ele('path',{
          d:"M"+pa.x+" "+pa.y+" L"+pb.x+" "+pb.y,
          stroke:c.toHex(),
          'stroke-linecap':"round",
          'stroke-width':this.width
        });
      }
    }
  }
);
