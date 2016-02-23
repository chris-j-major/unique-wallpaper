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
  var midLightness = (struct.random.bool()?0.1:0.8)+struct.random.range( 0 , 0.1 );
  var midSaturation = struct.random.range( 0 , 0.1 );
  var highlightHue = midHue + struct.random.range( -0.2 , 0.2 ); // random ish Hue
  var highLightness = 0.5+struct.random.range( -0.1 , 0.1 );
  this.create();
  this.addRange( 0.4 , new Color(midHue,4*midSaturation,midLightness) );
  this.addRange( 0.4 , new Color(midHue,3*midSaturation,midLightness) );
  this.addRange( 0.4 , new Color(midHue,5*midSaturation,midLightness) );
  this.addRange( 0.4 , new Color(highlightHue,1.0,highLightness) );
}

Pallete.extend(MidToneHilights)
