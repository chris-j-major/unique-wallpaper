var Struct = require('./struct');

module.exports = {
  process:function process(key,width,height,parts,opts){
    return new Struct(key,width,height,parts,opts);
  }
};
