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
}

module.exports = {
  LinearGradient:LinearGradient
}
