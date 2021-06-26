require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
// const { mostrarMenu, pausa } = require("./helpers/mensajes");
const {
  inquiererMenu,
  pausa,
  leerInput,
  borrarT,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArr(tareasDB);
  }
  //await pausa();
  do {
    opt = await inquiererMenu();
    // console.log(opt);
    switch (opt) {
      case 1:
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case 2:
        tareas.listadoCompleto();
        break;
      case 3:
        tareas.listarTrueOrFalse(true);
        break;
      case 4:
        tareas.listarTrueOrFalse(false);
        break;
      case 5:
        const ids = await mostrarListadoChecklist(tareas.listarArr);
        console.log({ ids });
        tareas.toggleCompletadas(ids);
        break;
      case 6:
        const id = await borrarT(tareas.listarArr);
        if (id !== 0) {
          const ok = await confirmar("Desea Borrar esta tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea Borrada".yellow);
          }
          console.log({ ok });
          console.log({ id });
        }
        break;
    }

    guardarDB(tareas.listarArr);

    if (opt !== 0) await pausa();
  } while (opt !== 0);
  console.clear();
};

main();
