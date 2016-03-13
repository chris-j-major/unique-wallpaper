var Part = require("../Part");

module.exports = new Part(
  "split", /* name */
  ["base"], /* types */
  function(){
    var opts = {};
    this.subparts = [
      this.createPart("block" , 12 , opts ),
      this.createPart("block" , 24 , opts )
    ];
  }
);
