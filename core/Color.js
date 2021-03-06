module.exports = Color;


function Color(hue,sat,lightness,alpha){
  this.h = rangeCheck(hue,0.0);
  this.s = rangeCheck(sat,1.0);
  this.l = rangeCheck(lightness,0.5);
  this.a = rangeCheck(alpha,1.0);
}

Color.fromHSL = function(h,s,l){
  return new Color(h,s,l);
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
  'light grey':new Color(0.0,0.0,0.8)
};

// load the named colors into the object
var colors = require("./colors")
for ( var id in colors ){
  var name = colors[id].name;
  var hsl = rgbToHsl(colors[id].r,colors[id].g,colors[id].b);
  namedColors[ name ] = new Color( hsl[0] , hsl[1] , hsl[2] );
}
for ( var id in namedColors ){
  Color[id] = namedColors[id];
}

Color.grey = function(n){
  return new Color(0.0,0.0,n);
}

Color.prototype.alpha = function(a){
  return new Color(this.h,this.s,this.l,a);
}

Color.prototype.toHex = function(){
  var componets = hslToRgb(this.h,this.s,this.l);
  if ( this.a == 1.0 ){
    return "#"+twoDigitHex(componets[0])+twoDigitHex(componets[1])+twoDigitHex(componets[2]);
  }else{
    return "rgba("+componets[0]+","+componets[1]+","+componets[2]+","+this.a+")"
  }
}
Color.prototype.toStopStyle = function(){
  var componets = hslToRgb(this.h,this.s,this.l);
  return "stop-color:rgb("+componets.join(",")+"); stop-opacity:"+this.a+"; ";
}
Color.prototype.toName = function(){
  var best = Color.black;
  var dist = 500000.0;
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
  var a = innerLerp( this.a , c2.a , i);
  return new Color(h,s,l,a);
}

Color.prototype.isDifferent = function(other){
  var dist = this.dist(other);
  return dist > 10000; // how different is differnt?
}

Color.prototype.dist = function(other){
  var t = hslToRgb(this.h,this.s,this.l);
  var o = hslToRgb(other.h,other.s,other.l);
  var dr = t[0] - o[0];
  var dg = t[1] - o[1];
  var db = t[2] - o[2];
  var alpha = (this.a * other.a)
  return alpha*((dr*dr)+(dg*dg)+(db*db));
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

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

module.exports = Color;
