const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  desc = "";
  completadoEn = null;
  constructor(descr) {
    this.id = uuidv4();
    this.desc = descr;
  }
}

module.exports = Tarea;
