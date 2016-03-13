var Part = require("../Part");

module.exports = new Part(
  "blockColor", /* name */
  ["block","block-simple"], /* types */
  function(){
    this.color = this.choseColor();
    this.image.addTerm("color",this.color);
    this.description = this.color.toHex();
  }
);
