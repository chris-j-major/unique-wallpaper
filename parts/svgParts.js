function LinearGradient(opts,stops){
  this.opts = opts;
  this.stops = stops;
  this.id = "not added yet!"
}
LinearGradient.prototype.build = function linearGradientBuild( xml ){
  this.opts.id = this.id;
  var lg = xml.ele('linearGradient',this.opts);
  for ( var stopId in this.stops ){
    var stop = this.stops[stopId];
    var opts = { offset: stopId , style: stop.toStopStyle() };
    lg.ele("stop",opts);
  }
  return lg;
}
LinearGradient.buildPoints = function buildPoints( random ){
  var f = Math.floor(random.float() * 100);
  var f2 = Math.floor(100 - f);
  if ( random.bool() ){
    return {x1:"0%",y1:f+"%",x2:"100%",y2:f2+"%"}
  }else{
    return {x1:f+"%",y1:"0%",x2:f2+"%",y2:"100%"}
  }
}

function Rect(opts){
  this.opts = opts;
  this.id = "not added yet!"
}
Rect.prototype.build = function RectBuild( xml ){
  this.opts.id = this.id;
  return xml.ele('rect',this.opts);
}

function Mask(opts,parts){
  this.opts = opts;
  this.parts = parts;
  this.id = "not added yet!"
}
Mask.prototype.build = function RectBuild( xml ){
  this.opts.id = this.id;

  var e = xml.ele('mask',this.opts);
  for ( var id in this.parts ){
    this.parts[id].build( e );
  }
  return e;
}

module.exports = {
  LinearGradient:LinearGradient,
  Rect:Rect,
  Mask:Mask
}
