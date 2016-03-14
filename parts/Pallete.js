module.exports = {
  choseColor:function choseColor( r ){
    return r.choose( this.range );
  },
  choseDifferentColor:function choseDifferentColor( colors , r ){
    if ( !colors.pop ) colors = [colors];
    var options = [];
    for ( var id in this.range ){
      var simalar = false;
      for ( var c in colors ){
        simalar = simalar || (!this.range[id].isDifferent(colors[c]));
      }
      if ( !simalar ){
        options.push( this.range[id] );
      }
    }
    if ( options.length > 0 ){
      return r.choose( options );
    }else{
      console.trace("Not enough different colours!");
      return r.choose( this.range );
    }
  }
};
