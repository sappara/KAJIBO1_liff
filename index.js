"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;

const { Pool } = require("pg");
app.get("/", function (req, res, next) {
  const pool = new Pool({
    database: process.env.ENV_DB,
    user: process.env.ENB_USER,
    password: process.env.ENV_PASSWORD,
    host: process.env.ENV_HOST,
    port: 5432,
  });
  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query("SELECT roomid FROM rooms", function (err, result) {
        res.render("index", {
          datas: result.rows[0].name,
        });
        console.log(result);
      });
    }
  });
});

// const { Pool } = require("pg");
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// const { Client } = require("pg");
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// //'SELECT table_schema,table_name FROM information_schema.tables;'
// client.connect();
// client.query("SELECT roomid,userid FROM rooms;", (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

app.get("/send-id", function (req, res) {
  res.json({ id: myLiffId });
});
// app.get("/", (req, res) => {
//     //   res.send("Welcome to Confetti Cuisine!");
//     res.render("index");
//   });

// app.get("/db", async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM rooms");
//     const results = { results: result ? result.rows : null };
//     res.render("pages/db", results);
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.send("Error" + err);
//   }
// });

app.listen(port, () => console.log(`app listening on port ${port}!`));
