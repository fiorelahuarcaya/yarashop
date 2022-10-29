const express = require("express");
const { MongoClient } = require("mongodb");
const routes = express.Router();

const uri =
  "mongodb+srv://bratty289:YGTl63QI@pruebamongo.lnhsrdp.mongodb.net/test";
const client = new MongoClient(uri);

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await client.connect();
    const resultado = await findUserbyId(client, id);
    res.send(resultado);
  } finally {
    await client.close();
  }
});

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
      rucProvee: req.body.rucProvee,
      RazonSocial: req.body.RazonSocial,
      telefonoProvee: req.body.telefonoProvee,
      direccionProvee: req.body.direccionProvee,
      paginaProvee: req.body.paginaProvee,
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

routes.delete("/:id", async (req, res) => {
  const rucProvee = req.params.id;
  try {
    await client.connect();
    const result = await deletebyId(client, rucProvee);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.put("/:id", async (req, res) => {
  let rucProvee = req.params.id;
  const usuario = {
    telefonoProvee: req.body.telefonoProvee,
    direccionProvee: req.body.direccionProvee,
  };

  try {
    await client.connect();
    const result = await updatebyId(client, rucProvee, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});

async function createUser(client, newUser) {
  const result = await client
    .db("yarashop")
    .collection("proveedor")
    .insertMany(newUser);
  return result;
}

async function findUserbyId(client, rucProvee) {
  const result = await client
    .db("yarashop")
    .collection("proveedor")
    .findOne({ rucProvee: rucProvee });

  return result;
}

async function findProducts(client) {
  const result = await client
    .db("yarashop")
    .collection("proveedor")
    .find({})
    .toArray();
  if (result) {
    return result;
  } else {
    console.log(`No se encontró productos en yarashop`);
  }
}

async function deletebyId(client, rucProvee) {
  const result = await client
    .db("yarashop")
    .collection("proveedor")
    .deleteOne({ rucProvee: rucProvee });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  return result;
}

async function updatebyId(client, rucProvee, modifiedUser) {
  const result = await client
    .db("yarashop")
    .collection("proveedor")
    .updateOne({ rucProvee: rucProvee }, { $set: modifiedUser });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  return result;
}

module.exports = routes;
