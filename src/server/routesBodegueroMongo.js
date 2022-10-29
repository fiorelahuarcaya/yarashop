const express = require("express");
const { MongoClient } = require("mongodb");
const routes = express.Router();

const uri =
  "mongodb+srv://bratty289:YGTl63QI@pruebamongo.lnhsrdp.mongodb.net/test";
const client = new MongoClient(uri);

routes.get("/", async (req, res) => {
  try {
    await client.connect();
    const resultado = await findProducts(client);
    res.send(resultado);
  } finally {
    await client.close();
  }
});

routes.post("/", async (req, res) => {
  const usuario = [
    {
      idAdmin: req.body.idAdmin,
      nombreCompleto: req.body.nombreCompleto,
      correo: req.body.correo,
      password: req.body.password,
      suscripcion: req.body.suscripcion,
    },
  ];
  try {
    await client.connect();
    const result = await createUser(client, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.delete("/:id", (req, res) => {});

routes.put("/:id", (req, res) => {});

async function createUser(client, newUser) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .insertMany(newUser);
  return result;
}

async function findProducts(client) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .find({})
    .toArray();
  if (result) {
    return result;
  } else {
    console.log(`No se encontró productos en yarashop`);
  }
}

module.exports = routes;
