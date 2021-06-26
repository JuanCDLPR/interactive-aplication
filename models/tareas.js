const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listarArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      //   console.log(key)
      listado.push(this._listado[key]);
    });
    return listado;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArr(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listarArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx}. ${desc} :: ${estado}`);
    });
  }

  listarTrueOrFalse(status = true) {
    console.log();
    let cont = 0;
    this.listarArr.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (status && completadoEn) {
        cont += 1;
        console.log(
          `${cont.toString().green}. ${desc} :: ${completadoEn.green}`
        );
      } else {
        if (!status && !completadoEn) {
          cont += 1;
          console.log(`${cont.toString().green}. ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listarArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}
module.exports = Tareas;
