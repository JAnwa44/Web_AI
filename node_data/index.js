const express = require("express");
const mysql = require('mysql');
const app = express();
const port = 3001;
const axios = require('axios');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_train"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

// app.get("/haspool", (req, res) => {
//     con.query("SELECT * FROM haspool", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.json({ data: result })
//     });
// });

// app.get("/hasstorageroom", (req, res) => {
//     con.query("SELECT * FROM hasstorageroom", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.json({ data: result })
//     });
// });

// app.get("/hasstormprotector", (req, res) => {
//     con.query("SELECT * FROM hasstormprotector", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.json({ data: result })
//     });
// });

// app.get("/hasyard", (req, res) => {
//     con.query("SELECT * FROM hasyard", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.json({ data: result })
//     });
// });

// app.get("/isnewbuilt", (req, res) => {
//     con.query("SELECT * FROM isnewbuilt", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.json({ data: result })
//     });
// });



// ------------------------------------------------------------------------------------------------------------------- //
// classification                                                                                                      //  
// ------------------------------------------------------------------------------------------------------------------- //

app.get("/recreatemodel_classification", (req, res) => {

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/create_model_classification',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/predict_classification", (req, res) => {
    let arr_data = req.body;
    let arr_df = JSON.stringify({
        "fea_1": arr_data.fea_1,
        "fea_2": arr_data.fea_2,
        "fea_3": arr_data.fea_3,
        "int_data": arr_data.int_data,
        "fea_5": arr_data.fea_5,
        "fea_6": arr_data.fea_6,
        "fea_7": arr_data.fea_7,
        "fea_8": arr_data.fea_8,
        "fea_9": arr_data.fea_9,
        "fea_10": arr_data.fea_10,
        "fea_11": arr_data.fea_11
    })

    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/predict_classification',
        headers: {
            'Content-Type': 'application/json'
        },
        data: arr_df
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

})

// ------------------------------------------------------------------------------------------------------------------- //
// classification                                                                                                      //  
// ------------------------------------------------------------------------------------------------------------------- //



// ------------------------------------------------------------------------------------------------------------------- //
// regression                                                                                                          //  
// ------------------------------------------------------------------------------------------------------------------- //

app.get("/recreatemodel_regression", (req, res) => {

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/create_model_regression',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/predict_regression", (req, res) => {
    let arr_data = req.body;
    let arr_df = JSON.stringify({
        "cement": arr_data.cement,
        "slag": arr_data.slag,
        "flyash": arr_data.flyash,
        "water": arr_data.water,
        "superplasticizer": arr_data.superplasticizer,
        "coarseaggregate": arr_data.coarseaggregate,
        "fineaggregate": arr_data.fineaggregate,
        "age": arr_data.age,
    })

    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/predict_regression',
        headers: {
            'Content-Type': 'application/json'
        },
        data: arr_df
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    

})

app.get("/data_concrete", (req, res) => {
    con.query("SELECT * FROM concrete_data_yeh", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({ data: result })
    });
});

// ------------------------------------------------------------------------------------------------------------------- //
// regression                                                                                                          //  
// ------------------------------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------------------------------------------------------------- //
// Table                                                                                                               //  
// ------------------------------------------------------------------------------------------------------------------- //


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "project_train",
  });
  
  app.get("/concrete_data_yeh", (req, res) => {
      db.query("SELECT * FROM concrete_data_yeh", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  });
  
  app.post("/create", (req, res) => {
    const cement = req.body.cement;
    const slag = req.body.slag;
    const flyash = req.body.flyash;
    const water = req.body.water;
    const superplasticizer = req.body.superplasticizer;
    const coarseaggregate = req.body.coarseaggregate;
    const fineaggregate = req.body.fineaggregate;
    const age = req.body.age;
    const csMPa = req.body.csMPa;
  
    db.query(
      "INSERT INTO concrete_data_yeh (cement, slag, flyash, water, superplasticizer, coarseaggregate, fineaggregate, age, csMPa) VALUES (?,?,?,?,?,?,?,?,?)",
      [cement, slag, flyash, water, superplasticizer, coarseaggregate, fineaggregate, age, csMPa],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  
  app.put("/update_ID", (req, res) => {
    const ID = req.body.ID;
    const oldID = req.body.oldID;
    // const name = req.body.name;
    db.query(
      "UPDATE concrete_data_yeh SET ID = ? WHERE ID = ?",
      [ID, oldID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  
  app.put("/update_cement", (req, res) => {
    const ID = req.body.ID;
    const cement = req.body.cement;
    db.query(
      "UPDATE concrete_data_yeh SET cement = ? WHERE ID = ?",
      [cement, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_slag", (req, res) => {
    const ID = req.body.ID;
    const slag = req.body.slag;
    db.query(
      "UPDATE concrete_data_yeh SET slag = ? WHERE ID = ?",
      [slag, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_flyash", (req, res) => {
    const ID = req.body.ID;
    const flyash = req.body.flyash;
    db.query(
      "UPDATE concrete_data_yeh SET flyash = ? WHERE ID = ?",
      [flyash, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_water", (req, res) => {
    const ID = req.body.ID;
    const water = req.body.water;
    db.query(
      "UPDATE concrete_data_yeh SET water = ? WHERE ID = ?",
      [water, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_superplasticizer", (req, res) => {
    const ID = req.body.ID;
    const superplasticizer = req.body.superplasticizer;
    db.query(
      "UPDATE concrete_data_yeh SET superplasticizer = ? WHERE ID = ?",
      [superplasticizer, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_coarseaggregate", (req, res) => {
    const ID = req.body.ID;
    const coarseaggregate = req.body.coarseaggregate;
    db.query(
      "UPDATE concrete_data_yeh SET coarseaggregate = ? WHERE ID = ?",
      [coarseaggregate, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_fineaggregate", (req, res) => {
    const ID = req.body.ID;
    const fineaggregate = req.body.fineaggregate;
    db.query(
      "UPDATE concrete_data_yeh SET fineaggregate = ? WHERE ID = ?",
      [fineaggregate, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_age", (req, res) => {
    const ID = req.body.ID;
    const age = req.body.age;
    db.query(
      "UPDATE concrete_data_yeh SET age = ? WHERE ID = ?",
      [age, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.put("/update_csMPa", (req, res) => {
    const ID = req.body.ID;
    const csMPa = req.body.csMPa;
    db.query(
      "UPDATE concrete_data_yeh SET csMPa = ? WHERE ID = ?",
      [csMPa, ID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  app.delete("/delete/:ID", (req, res) => {
    const ID = req.params.ID;
    db.query("DELETE FROM concrete_data_yeh WHERE ID = ?", ID, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

// ------------------------------------------------------------------------------------------------------------------- //
// Table                                                                                                               //  
// ------------------------------------------------------------------------------------------------------------------- //

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});