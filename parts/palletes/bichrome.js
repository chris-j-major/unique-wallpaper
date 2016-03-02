var Pallete = require("../../core/pallete");
var Color = require("../../core/color");

module.exports = {
  tags:["pallete"],
  create:function create(struct,stack){
    return new Bichrome(struct,stack);
  }
}

function Bichrome( struct , stack ){
  var hue = struct.random.range( 0 , 1.0 ); // randomHue
  var sat = (struct.random.bool()?0.3:0.7)+struct.random.range( -0.2 , 0.2 );
  this.create();
  for ( var n = 0 ; n < 20 ; n++){
    var lightness = n /20;
    var weight = 1.0 - Math.abs(0.5 - lightness);
    this.addRange( weight , new Color( hue , sat , lightness ));
    this.addRange( weight , new Color( hue + 0.5 , sat , lightness ));
  }
}

Bichrome.prototype.describe = function(){
  return "PALLETE [Bichrome]\n";
}

Pallete.extend(Bichrome)