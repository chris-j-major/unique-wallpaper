var Color = require("../core/color");

var checks = ["red","blue","black","white","green","purple"];

for ( var i in checks ){
  console.log( checks[i] +" : "+ Color[checks[i]].toName()+"   "+Color[checks[i]].toHex() );
}
