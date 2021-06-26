const fs = require("fs");
const archivo = "./database/data.json";

exports.guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

exports.leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }
  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);
  //console.log(data);
  return data;
};
