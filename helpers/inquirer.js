const inquirer = require("inquirer");
const { async } = require("rxjs");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?\n",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Crear Tarea`,
      },
      {
        value: 2,
        name: `${"2.".green} Listar Tareas`,
      },
      {
        value: 3,
        name: `${"3.".green} Listar Tareas Completadas`,
      },
      {
        value: 4,
        name: `${"4.".green} Listar Tareas Pendientes`,
      },
      {
        value: 5,
        name: `${"5.".green} Completar Tarea(s)`,
      },
      {
        value: 6,
        name: `${"6.".green} Borrar Tarea`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquiererMenu = async () => {
  console.clear();
  console.log("=========================".green);
  console.log(" Seleccione una opcion".yellow);
  console.log("=========================\n".green);

  const { opcion } = await inquirer.prompt(menuOpts);
  return opcion;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "descrip",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { descrip } = await inquirer.prompt(question);
  return descrip;
};

const pausa = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const borrarT = async (tareas = []) => {
  console.log();
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: tarea.id,
      name: `${idx}${tarea.desc}`,
    };
  });
  choices.unshift({
    value: 0,
    name: "0. ".green + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: tarea.id,
      name: `${idx}${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleecione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquiererMenu,
  pausa,
  leerInput,
  borrarT,
  confirmar,
  mostrarListadoChecklist,
};
