"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;

const { Pool } = require("pg");
// app.get("/", function (req, res, next) {
//   const pool = new Pool({
//     database: process.env.ENV_DB,
//     user: process.env.ENB_USER,
//     password: process.env.ENV_PASSWORD,
//     host: process.env.ENV_HOST,
//     port: 5432,
//   });
//   pool.connect(function (err, client) {
//     if (err) {
//       console.log(err);
//     } else {
//       client.query(
//         "SELECT roomid, pgp_sym_decrypt(userid, $1) as name FROM rooms ",
//         [process.env.DB_ENCRYPT_PASS],
//         function (error, results) {
//           if (error) {
//             throw error;
//           }
//           res.render("index", {
//             datas: results.rows,
//             id: myLiffId,
//           });
//           // console.log(result);
//         }
//       );
//     }
//   });
// });
//datas: result.rows[0].name,
// "SELECT roomid, pgp_sym_decrypt(userid, $1) as userid FROM rooms "
// "SELECT roomid, userid FROM rooms WHERE pgp_sym_encrypt($1, $2) ",

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
app.get("/4/:roomid", function (req, res, next) {
  //   let roomid = req.params.roomid;
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
      client.query(
        "SELECT step4 FROM step4s WHERE roomid = ?",
        [req.params.roomid],
        function (error, results) {
          if (error) {
            throw error;
          }
          res.render("index", {
            datas: results.rows,
            id: myLiffId,
          });
          // console.log(result);
          //   "/:roomid"
          // "SELECT * FROM step4s WHERE roomid = ?",
          // [req.params.roomid],
          //   "5ecdb3259323a"
          //   両テーブルとも登録あればうまくいく「"SELECT a.step4, b.step5 FROM step4s a, step5s b WHERE a.roomid = $1 AND b.roomid = $1"」
          //   両テーブルとも登録あればうまくいく「"SELECT a.step4, b.step5, c.step6 FROM step4s a, step5s b, step6s c WHERE EXISTS(SELECT * FROM step4s WHERE a.roomid = $1) AND EXISTS(SELECT * FROM step5s WHERE b.roomid = $1) AND EXISTS(SELECT * FROM step6s WHERE c.roomid = $1)"」
          //   unionだとstep4のところにしか出力されない「 "SELECT step4 FROM step4s a WHERE EXISTS(SELECT * FROM step4s WHERE a.roomid = $1) union SELECT step5 FROM step5s b WHERE EXISTS(SELECT * FROM step5s WHERE b.roomid = $1)"」
          //   カンマ区切りはエラー「 "SELECT step4 FROM step4s a WHERE EXISTS(SELECT * FROM step4s WHERE a.roomid = $1) , SELECT step5 FROM step5s b WHERE EXISTS(SELECT * FROM step5s WHERE b.roomid = $1)"」
          //   and繋ぎもエラー「"SELECT step4 FROM step4s a WHERE EXISTS(SELECT * FROM step4s WHERE a.roomid = $1) AND SELECT step5 FROM step5s b WHERE EXISTS(SELECT * FROM step5s WHERE b.roomid = $1)"」
        }
      );
    }
  });
});
app.get("/5/:roomid", function (req, res, next) {
  //   let roomid = req.params.roomid;
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
      client.query(
        "SELECT step5 FROM step5s WHERE roomid = ?",
        [req.params.roomid],
        function (error, results) {
          if (error) {
            throw error;
          }
          res.render("index2", {
            datas: results.rows,
            id: myLiffId,
          });
        }
      );
    }
  });
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

app.get("/send-id", function (req, res) {
  res.json({ id: myLiffId });
});
// app.get("/send-roomid", function (req, res) {
//   res.json({ roomid: "roomid1" });
// });

// app.get("/send-roomid", function (req, res) {
//   const pool = new Pool({
//     database: process.env.ENV_DB,
//     user: process.env.ENB_USER,
//     password: process.env.ENV_PASSWORD,
//     host: process.env.ENV_HOST,
//     port: 5432,
//   });
//   pool.connect(function (err, client) {
//     if (err) {
//       console.log(err);
//     } else {
//       client.query(
//         "SELECT roomid, pgp_sym_decrypt(userid, $1) as name FROM rooms ",
//         [process.env.DB_ENCRYPT_PASS],
//         function (error, results) {
//           if (error) {
//             throw error;
//           }
//           res.json({ datas: results.rows });
//         }
//       );
//     }
//   });
// });

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
