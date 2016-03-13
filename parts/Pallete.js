module.exports = {
  choseColor:function choseColor( r ){
    return r.choose( this.range );
  },
  choseDifferentColor:function choseDifferentColor( colors , r ){
    if ( !colors.pop ) colors = [colors];
    var options = [];
    for ( var id in this.range ){
      if ( this.range[id].isDifferent(colors) ){
        options.push( this.range[id] );
      }
    }
    if ( options.length > 0 ){
      return r.choose( options );
    }else{
      return r.choose( this.range );
    }
  }
};
