import React from 'react';
import axios from 'axios';
// import "./App.css";
import { useState } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

function App() {

  let oldID;

  const [ID, setID] = useState(0);
  const [cement, setCement] = useState(0);
  const [slag, setSlag] = useState(0);
  const [flyash, setFlyash] = useState(0);
  const [water, setWater] = useState(0);
  const [superplasticizer, setSuperplasticizer] = useState(0);
  const [coarseaggregate, setCoarseaggregate] = useState(0);
  const [fineaggregate, setFineaggregate] = useState(0);
  const [age, setAge] = useState(0);
  const [csMPa, setCsMPa] = useState(0);

  const [newID, setNewID] = useState(0);
  const [newcement, setNewCement] = useState(0);
  const [newslag, setNewSlag] = useState(0);
  const [newflyash, setNewFlyash] = useState(0);
  const [newwater, setNewWater] = useState(0);
  const [newsuperplasticizer, setNewSuperplasticizer] = useState(0);
  const [newcoarseaggregate, setNewCoarseaggregate] = useState(0);
  const [newfineaggregate, setNewFineaggregate] = useState(0);
  const [newage, setNewAge] = useState(0);
  const [newcsMPa, setNewCsMPa] = useState(0);
  


  const [name, setName] = useState(0);
  // const [age, setAge] = useState(0);
  const [country, setCountry] = useState(0);
  const [position, setPosition] = useState(0);
  const [wage, setWage] = useState(0);

  const [newname, setNewName] = useState("");
  // const [newage, setNewAge] = useState(0);
  const [newcountry, setNewCountry] = useState("");
  const [newposition, setNewPosition] = useState("");
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [employeeList_2, setEmployeeList_2] = useState([]);


  const getEmployees = () => {
    Axios.get("http://localhost:3001/concrete_data_yeh").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const getEmployees_2 = () => {
    Axios.get("http://localhost:3003/employees").then((response) => {
      setEmployeeList_2(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      
      cement: cement,
      slag: slag,
      flyash: flyash,
      water: water,
      superplasticizer: superplasticizer,
      coarseaggregate: coarseaggregate,
      fineaggregate: fineaggregate,
      age: age,
      csMPa: csMPa,
    
      // name: name,
      // age: age,
      // country: country,
      // position: position,
      // wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          cement: cement,
          slag: slag,
          flyash: flyash,
          water: water,
          superplasticizer: superplasticizer,
          coarseaggregate: coarseaggregate,
          fineaggregate: fineaggregate,
          age: age,
          csMPa: csMPa,
          
          // name: name,
          // age: age,
          // country: country,
          // position: position,
          // wage: wage,
        },
      ]);
    });
  };

  const updateID = (ID) => {
    Axios.put("http://localhost:3001/update_ID", { ID: newID, oldID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {
                  ID: newID,
                  oldID: oldID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,
                }
              : val;
          })
        );
      }
    );
  };

  const updateCement = (ID) => {
    Axios.put("http://localhost:3001/update_cement", { cement: newcement, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateSlag = (ID) => {
    Axios.put("http://localhost:3001/update_slag", { slag: newslag, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: newslag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateFlyash = (ID) => {
    Axios.put("http://localhost:3001/update_flyash", { flyash: newflyash, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: newflyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateWater = (ID) => {
    Axios.put("http://localhost:3001/update_water", { water: newwater, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: newwater,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateSuperplasticizer = (ID) => {
    Axios.put("http://localhost:3001/update_superplasticizer", { superplasticizer: newsuperplasticizer, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: newsuperplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateCoarseaggregate = (ID) => {
    Axios.put("http://localhost:3001/update_coarseaggregate", { coarseaggregate: newcoarseaggregate, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: newcoarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateFineaggregate = (ID) => {
    Axios.put("http://localhost:3001/update_fineaggregate", { fineaggregate: newfineaggregate, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: newfineaggregate,
                  age: val.age,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateAge = (ID) => {
    Axios.put("http://localhost:3001/update_age", { age: newage, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: newage,
                  csMPa: val.csMPa,

                }
              : val;
          })
        );
      }
    );
  };

  const updateCsMPa = (ID) => {
    Axios.put("http://localhost:3001/update_csMPa", { csMPa: newcsMPa, ID: ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.ID == ID
              ? {

                  ID: val.ID,
                  cement: val.cement,
                  slag: val.slag,
                  flyash: val.flyash,
                  water: val.water,
                  superplasticizer: val.superplasticizer,
                  coarseaggregate: val.coarseaggregate,
                  fineaggregate: val.fineaggregate,
                  age: val.age,
                  csMPa: newcsMPa,

                }
              : val;
          })
        );
      }
    );
  };

  // const updateEmployeeage = (ID) => {
  //   Axios.put("http://localhost:3001/update_age", { age: newage, ID: ID }).then(
  //     (response) => {
  //       setEmployeeList(
  //         employeeList.map((val) => {
  //           return val.ID == ID
  //             ? {
  //                 ID: val.ID,
  //                 name: val.name,
  //                 country: val.country,
  //                 age: age,
  //                 position: val.position,
  //                 wage: val.wage,
  //               }
  //             : val;
  //         })
  //       );
  //     }
  //   );
  // };
  // const updateEmployeeposition = (ID) => {
  //   Axios.put("http://localhost:3001/update_position", { position: newposition, ID: ID }).then(
  //     (response) => {
  //       setEmployeeList(
  //         employeeList.map((val) => {
  //           return val.ID == ID
  //             ? {
  //                 ID: val.ID,
  //                 name: val.name,
  //                 country: val.country,
  //                 age: val.age,
  //                 position: newposition,
  //                 wage: val.wage,
  //               }
  //             : val;
  //         })
  //       );
  //     }
  //   );
  // };

  // const updateEmployeeWage = (ID) => {
  //   Axios.put("http://localhost:3001/update", { wage: newWage, ID: ID }).then(
  //     (response) => {
  //       setEmployeeList(
  //         employeeList.map((val) => {
  //           return val.ID == ID
  //             ? {
  //                 ID: val.ID,
  //                 name: val.name,
  //                 country: val.country,
  //                 age: val.age,
  //                 position: val.position,
  //                 wage: newWage,
  //               }
  //             : val;
  //         })
  //       );
  //     }
  //   );
  // };

  const deleteData = (ID) => {
    Axios.delete(`http://localhost:3001/delete/${ID}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.ID != ID;
        })
      );
    });
  };

  return (
    <div className="App container">
      <h1>Setting Data</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label className="form-label" htmlFor="cement">
            cement:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter cement"
              onChange={(event) => {
                setCement(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="slag">slag:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter slag"
              onChange={(event) => {
                setSlag(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country">flyash:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter flyash"
              onChange={(event) => {
                setFlyash(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="water">water:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter water"
              onChange={(event) => {
                setWater(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="superplasticizer">superplasticizer:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter superplasticizer"
              onChange={(event) => {
                setSuperplasticizer(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="coarseaggregate">coarseaggregate:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter coarseaggregate"
              onChange={(event) => {
                setCoarseaggregate(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fineaggregate">fineaggregate:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter fineaggregate"
              onChange={(event) => {
                setFineaggregate(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">age:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="csMPa">csMPa:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter csMPa"
              onChange={(event) => {
                setCsMPa(event.target.value)
              }}
            />
          </div>
          <button onClick={addEmployee} class="btn btn-success">
            Add Data
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button class="btn btn-primary" onClick={getEmployees}>
          Show Data
        </button>
        <br />
        <br />
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
              <button className="btn btn-danger" onClick={() => {deleteData(val.ID)}}>Delete</button>
                <p className="card-text">ID: {val.ID}</p>
                <p className="card-text">cement: {val.cement}</p>
                <p className="card-text">slag: {val.slag}</p>
                <p className="card-text">flyash: {val.flyash}</p>
                <p className="card-text">water: {val.water}</p>
                <p className="card-text">superplasticizer: {val.superplasticizer}</p>
                <p className="card-text">coarseaggregate: {val.coarseaggregate}</p>
                <p className="card-text">fineaggregate: {val.fineaggregate}</p>
                <p className="card-text">age: {val.age}</p>
                <p className="card-text">csMPa: {val.csMPa}</p>

                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.ID}
                    onChange={(event) => {
                      setNewID(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateID(val.ID)}}>Update</button>
                </div>
                    
                
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.cement}
                    onChange={(event) => {
                      setNewCement(event.target.value)
                    }}
                  />  
                  <button className="btn btn-warning" onClick={() => {updateCement(val.ID)}}>Update</button>
                </div>

                <div className="d-flex">  
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="text"
                    placeholder={val.slag}
                    onChange={(event) => {
                      setNewSlag(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateSlag(val.ID)}}>Update</button>
                </div>

                <div className="d-flex">  
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="text"
                    placeholder={val.flyash}
                    onChange={(event) => {
                      setNewFlyash(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateFlyash(val.ID)}}>Update</button>
                </div>

                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.water}
                    onChange={(event) => {
                      setNewWater(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateWater(val.ID)}}>Update</button>
                </div>
                
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.superplasticizer}
                    onChange={(event) => {
                      setNewSuperplasticizer(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateSuperplasticizer(val.ID)}}>Update</button>
                </div>
                
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.coarseaggregate}
                    onChange={(event) => {
                      setNewCoarseaggregate(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateCoarseaggregate(val.ID)}}>Update</button>
                </div>

                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.fineaggregate}
                    onChange={(event) => {
                      setNewFineaggregate(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateFineaggregate(val.ID)}}>Update</button>
                </div>
                
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.age}
                    onChange={(event) => {
                      setNewAge(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateAge(val.ID)}}>Update</button>
                </div>

                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder={val.csMPa}
                    onChange={(event) => {
                      setNewCsMPa(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateCsMPa(val.ID)}}>Update</button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

