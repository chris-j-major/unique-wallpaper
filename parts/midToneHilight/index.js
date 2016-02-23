var Pallete = require("../../core/pallete");
var Color = require("../../core/color");

module.exports = {
  tags:["pallete"],
  create:function create(struct,stack){
    return new MidToneHilights(struct,stack);
  }
}

function MidToneHilights( struct , stack ){
  var midHue = struct.random.range( 0 , 1.0 ); // randomHue
  var midLightness = (struct.random.bool()?0.3:0.7)+struct.random.range( -0.2 , 0.2 );
  var midSaturation = struct.random.range( 0.1 , 0.3 );
  var highlightHue = midHue + struct.random.range( -0.1 , 0.1 )+(struct.random.bool()?0.5:0.0); // random ish Hue
  var highLightness = 0.5+struct.random.range( -0.1 , 0.1 );
  this.create();
  this.addRange( 0.4 , new Color(midHue,1*midSaturation,1*midLightness) );
  this.addRange( 0.4 , new Color(midHue,2*midSaturation,2*midLightness) );
  this.addRange( 0.4 , new Color(midHue,3*midSaturation,3*midLightness) );
  this.addRange( 0.4 , new Color(highlightHue,1.0,highLightness) );
}

Pallete.extend(MidToneHilights)
