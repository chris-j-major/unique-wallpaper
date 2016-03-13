var Part = require("../Part");

module.exports = new Part(
  "blockColor", /* name */
  ["base","block","block-simple"], /* types */
  function(){
    this.color = this.parent.get('pallete').choseColor( this.random.float() );
    this.image.addTerm("color",this.color);
  }
);
