const express = require("express");
const { MongoClient } = require("mongodb");
const routes = express.Router();

const uri =
  "mongodb+srv://bratty289:YGTl63QI@pruebamongo.lnhsrdp.mongodb.net/test";
const client = new MongoClient(uri);

// routes.get("/:id", async (req, res) => {
//   const id = req.params.id * 1.0;
//   try {
//     await client.connect();
//     const resultado = await findUserbyId(client, id);
//     res.send(resultado);
//   } finally {
//     await client.close();
//   }
// });

routes.get("/:correo", async (req, res) => {
  const correo = req.params.correo;
  try {
    await client.connect();
    const resultado = await findUserbyCorreo(client, correo);
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

routes.delete("/:id", async (req, res) => {
  const idAdmin = req.params.id * 1.0;
  try {
    await client.connect();
    const result = await deletebyId(client, idAdmin);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.put("/:id", async (req, res) => {
  let idAdmin = req.params.id * 1.0;
  const usuario = {
    nombreCompleto: req.body.nombreCompleto,
    correo: req.body.correo,
  };

  try {
    await client.connect();
    const result = await updatebyId(client, idAdmin, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});



async function createUser(client, newUser) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .insertMany(newUser);
  return result;
}

async function findUserbyCorreo(client, correo) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .findOne({ correo: correo });

  return result;
}

async function findUserbyId(client, idAdmin) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .findOne({ idAdmin: idAdmin });

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

async function deletebyId(client, idAdmin) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .deleteOne({ idAdmin: idAdmin });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  return result;
}

async function updatebyId(client, idAdmin, modifiedUser) {
  const result = await client
    .db("yarashop")
    .collection("bodeguero")
    .updateOne({ idAdmin: idAdmin }, { $set: modifiedUser });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  return result;
}

module.exports = routes;
