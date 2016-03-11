function Color(hue,sat,lightness){
  this.h = rangeCheck(hue);
  this.s = rangeCheck(sat,1.0);
  this.l = rangeCheck(lightness,0.5);
}

function rangeCheck(n,d){
  if ( typeof n != 'number') return d;
  return Math.min( Math.max( n , 0.0 ) , 1.0 );
}

var namedColors = {
  white:new Color(0.0,0.0,1.0),
  black:new Color(0.0,0.0,0.0),
  'dark grey':new Color(0.0,0.0,0.2),
  'mid grey':new Color(0.0,0.0,0.5),
  'light grey':new Color(0.0,0.0,0.8),
  red:new Color(0.0,1.0,0.5),
  yellow:new Color(0.1515,1.0,0.5),
  green:new Color(0.3333,1.0,0.5),
  turquise:new Color(0.5,1.0,0.5),
  blue:new Color(0.6666,1.0,0.5),
  purple:new Color(0.7575,1.0,0.5),
};

// load the named colors into the object
for ( var id in namedColors ){
  Color[id] = namedColors[id];
}

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
Color.prototype.toName = function(){
  var best = Color.black;
  var dist = 5.0;
  var name = "black";
  for ( var id in namedColors ){
    var d = namedColors[id].dist(this);
    if ( d < dist ){
      best = namedColors[id];
      name = id;
      dist = d;
    }
  }
  return name;
}

Color.prototype.lerp = function( c2 , i ){
  var h = innerLerp( this.h , c2.h , i);
  var s = innerLerp( this.s , c2.s , i);
  var l = innerLerp( this.l , c2.l , i);
  return new Color(h,s,l);
}

Color.prototype.dist = function(other){
  var dh = this.h - other.h;
  var ds = this.s - other.s;
  var dl = this.l - other.l;
  dh = dh * (this.s * other.s);
  dh = dh * (0.5 - Math.abs( this.l - 0.5 ));
  return (dh*dh)+(ds*ds)+(dl*dl);
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
