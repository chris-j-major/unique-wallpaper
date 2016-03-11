var svgParts = require("../svgParts");
var Color = require("../../core/color");

var parts = require("../../parts");

parts.addPart({
  tags:["line"],
  create:function create(struct,stack,details){
    return new Line(struct,stack,details,3);
  },
  describe:function(s){
    return s+"Line(5)\n";
  },
  keySearch:function(key){
    if ( key == "line" ){
      return ["straight line","line"]
    }
  }
})

parts.addPart({
  tags:["line"],
  create:function create(struct,stack,details){
    return new Line(struct,stack,details,8);
  },
  describe:function(s){
    return s+"Line(8)\n";
  },
  keySearch:function(key){
    if ( key == "line" ){
      return ["straight line","line"]
    }
  }
})

parts.addPart({
  tags:["line"],
  create:function create(struct,stack,details){
    return new Curve(struct,stack,details,2);
  },
  describe:function(s){
    return s+"Curve(2)\n";
  },
  keySearch:function(key){
    if ( key == "line" ){
      return ["curved line","curve"]
    }
  }
})

parts.addPart({
  tags:["line"],
  create:function create(struct,stack,details){
    return new Curve(struct,stack,details,8);
  },
  describe:function(s){
    return s+"Curve(8)\n";
  },
  keySearch:function(key){
    if ( key == "line" ){
      return ["curved line","curve"]
    }
  }
})

function Line( struct , stack , details, width  ){
  if ( ! details ) details = {};
  this.parent = stack
  this.strokeWidth = width;
  this.x1 = details.x1 || (stack.width-this.size) * struct.random.float();
  this.y1 = details.y1 || (stack.height-this.size) * struct.random.float();
  this.x2 = details.x2 || (stack.width-this.size) * struct.random.float();
  this.y2 = details.y2 || (stack.height-this.size) * struct.random.float();
  this.fill = details.color || stack.pallete.pickColor(struct).toHex();
}

Line.prototype.build = function(xml){
  return xml.ele('path',{
    d:"M"+this.x1+" "+this.y1+" L"+this.x2+" "+this.y2,
    stroke:this.fill,
    'stroke-width':this.strokeWidth
  });
}

Line.prototype.describe = function(s){
  return s+"Line\n";
}

Line.prototype.keySearch = function( key , random ){
  if ( key.toLowerCase() == "line" ){
    return ["lines"];
  }else{
    return null;
  }
}

function Curve( struct , stack , details , width){
  if ( ! details ) details = {};
  this.parent = stack
  this.strokeWidth = width;
  this.x1 = details.x1 || (stack.width-this.size) * struct.random.float();
  this.y1 = details.y1 || (stack.height-this.size) * struct.random.float();
  this.x2 = details.x2 || (stack.width-this.size) * struct.random.float();
  this.y2 = details.y2 || (stack.height-this.size) * struct.random.float();
  this.x3 = details.x3 || (stack.width-this.size) * struct.random.float();
  this.y3 = details.y3 || (stack.height-this.size) * struct.random.float();
  this.fill = details.color || stack.pallete.pickColor(struct.random).toHex();
}

Curve.prototype.build = function(xml){
  return xml.ele('path',{
    d:"M"+this.x1+" "+this.y1+" Q"+this.x2+" "+this.y2+" "+this.x3+" "+this.y3,
    stroke:this.fill,
    'stroke-width':this.strokeWidth,
    fill:"none"
  });
}

Curve.prototype.describe = function(s){
  return s+"Curve\n";
}

Curve.prototype.keySearch = function( key ){
  if ( key.toLowerCase() == "line" ){
    return ["curve"];
  }else{
    return null;
  }
}
