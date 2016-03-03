function Color(hue,sat,lightness){
  this.h = hue % 1.0;
  this.s = (sat||1.0) % 1.0;
  this.l = (lightness||0.5) % 1.0;
}

Color.white = new Color(0.0,0.0,1.0);
Color.black = new Color(0.0,0.0,0.0);

Color.grey = function(n){
  return new Color(0.0,0.0,n);
}

Color.prototype.toHex = function(){
  var componets = hslToRgb(this.h,this.s,this.l);
  return "#"+twoDigitHex(componets[0])+twoDigitHex(componets[1])+twoDigitHex(componets[2])
}
Color.prototype.toStopStyle = function(){
  var componets = hslToRgb(this.h,this.s,this.l);
  return "stop-color:rgb("+componets.join(",")+"); stop-opacity:1; ";
}

Color.prototype.lerp = function( c2 , i ){
  var h = innerLerp( this.h , c2.h , i);
  var s = innerLerp( this.s , c2.s , i);
  var l = innerLerp( this.l , c2.l , i);
  return new Color(h,s,l);
}

function twoDigitHex(n){
  if ( n<16){
    return "0"+n.toString(16);
  }else{
    return n.toString(16);
  }
}

function innerLerp( a , b , i ){
  return a + ((b-a)*i);
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

module.exports = Color;
