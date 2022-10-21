/*
 * PARA NO PERDERME - Este script sirve para realizar:
 * Creación de base de datos tras la creación de una cuenta. (MongoDB)
 * Se necesita el id del bodeguero que se está creando.
 */

const { MongoClient } = require("mongodb");
const express = require("express");
const routes = express.Router();

routes.get("/:idTienda", (req, res) => {
  const idTienda = req.params.idTienda * 1.0;

  async function creandBD() {
    try {
      // El 'idUsuario' compra el 'idProducto' en 'cantidad' por el monto de 'pago'.
      await crearDBodeguero(client, idTienda);
      res.send("Execution Correct");
    } catch (e) {
      res.send("Unexpected Error: " + e);
    } finally {
      // Close the connection to the MongoDB cluster
      await client.close();
    }
  }
  creandBD().catch(console.error);
});

async function crearDBodeguero(client, id) {
  //const bodeguerosCollection = client.db("yarashop").collection("bodeguero");
  createCollection(getClient(), `tienda-${id}`, "reportes");
  createCollection(getClient(), `tienda-${id}`, "productos");
}

function getClient() {
  const uri =
    "mongodb+srv://bratty289:YGTl63QI@pruebamongo.lnhsrdp.mongodb.net/test";
  return new MongoClient(uri);
}

async function createCollection(client, dbName, collectionName) {
  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db(dbName);
    //*Check if collection already exists
    currentDB
      .listCollections({ name: collectionName })
      .next(function (err, collectionInfo) {
        if (collectionInfo) {
          console.log(
            `Collection with the name ${collectionName} already exists`
          );
          db.close();
        } else {
          currentDB.createCollection(collectionName, function (err, res) {
            if (err) throw err;
            console.log(`Collection created with the name ${collectionName}`);
            db.close();
          });
        }
      });
  });
}

module.exports = routes;
