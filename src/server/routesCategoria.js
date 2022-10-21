const express = require("express");
const { db } = require("./db.js");
const routes = express.Router();

routes.get("/", (req, res) => {
  db("SELECT * FROM [dbo].[categoria];", (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID
routes.get("/:id", (req, res) => {
  let id = req.params.id;
  db(`SELECT * FROM [dbo].[categoria] WHERE idCategoria = ${id};`, (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

routes.post("/", (req, res) => {
  //INSERT INTO categoria (idCategoria, nombreCat, descripcion) VALUES
  //(9, 'Tubérculos', 'papas, camotes'),
  // "idCategoria":9,"nombreCat":"Tubérculos","descripcion":"papas, camotes"
  const { idCategoria, nombreCat, descripcion } = req.body;
  db(
    `INSERT INTO [dbo].[categoria] (idCategoria, nombreCat, descripcion) VALUES (${idCategoria}, '${nombreCat}', '${descripcion}')`,
    (record) => {
      res.send(record);
    }
  );
});

routes.delete("/:id", (req, res) => {
  let id = req.params.id;
  db(`DELETE FROM [dbo].[categoria] WHERE idCategoria = ${id}`, (record) => {
    res.send(record);
  });
});

routes.put("/:id", (req, res) => {
  let id = req.params.id;
  const { nombreCat, descripcion } = req.body;

  let str = "";

  if (nombreCat != null) str += ` nombreCat ='${nombreCat}' ,`;

  if (descripcion != null) str += ` descripcion ='${descripcion}' ,`;

  str = str.substring(0, str.length - 1);

  db(
    `UPDATE [dbo].[categoria] SET ${str} WHERE idCategoria = ${id}`,
    (record) => {
      res.send(record);
    }
  );
});

module.exports = routes;
