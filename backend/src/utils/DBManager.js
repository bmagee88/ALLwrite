const { Client } = require("pg");


async function connect(db) {
  if (db == "postgres") {
    const client = new Client({
      host: "localhost",
      user: "postgres",
      port: 5432,
      password: "root",
      database: "dballwrite",
    });
    client.connect();
    console.log("connection made");
    return client;
  }
  return { "connection status": "not connected" };
}

function endConnection(client){
    client.end();
    console.log("connection ended");
}

module.exports = {connect, endConnection};
