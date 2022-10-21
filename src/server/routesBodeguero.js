const express = require("express");
const { db } = require("./db.js");
const routes = express.Router();

routes.get("/", (req, res) => {
  db("SELECT * FROM [dbo].[bodeguero];", (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID
routes.get("/:id", (req, res) => {
  let id = req.params.id;
  db(`SELECT * FROM [dbo].[bodeguero] WHERE idAdmin = ${id};`, (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

routes.post("/", (req, res) => {
  //INSERT INTO bodeguero (idAdmin, nombreCompleto, correo, password, suscripcion) VALUES
  //(1, 'Jhonatan Guevara Ames', 'jhony.ames25@gmail.com', '123', 'FREE'),
  // "idAdmin":1,"nombreCompleto":"Jhonatan Guevara Ames","correo":"jhony.ames25@gmail.com","password":"123","suscripcion":"FREE"
  const { nombreCompleto, correo, password, suscripcion } = req.body;
  db(
    `INSERT INTO [dbo].[bodeguero] (nombreCompleto, correo, password, suscripcion) VALUES ('${nombreCompleto}', '${correo}', '${password}', '${suscripcion}')`,
    (record) => {
      res.send(record);
    }
  );
});

routes.delete("/:id", (req, res) => {
  let id = req.params.id;
  db(`DELETE FROM [dbo].[bodeguero] WHERE idAdmin = ${id}`, (record) => {
    res.send(record);
  });
});

routes.put("/:id", (req, res) => {
  let id = req.params.id;
  const { nombreCompleto, correo, password, suscripcion } = req.body;

  let str = "";

  if (nombreCompleto != null) str += ` nombreCompleto ='${nombreCompleto}' ,`;

  if (correo != null) str += ` correo ='${correo}' ,`;

  if (password != null) str += ` password ='${password}' ,`;

  if (suscripcion != null) str += ` suscripcion ='${suscripcion}' ,`;

  str = str.substring(0, str.length - 1);

  db(`UPDATE [dbo].[bodeguero] SET ${str} WHERE idAdmin = ${id}`, (record) => {
    res.send(record);
  });
});

module.exports = routes;
