import React from 'react';
import axios from 'axios';

class Products extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            haspool_data: [],
            hasstorageroom_data: [],
            hasstormprotector_data: [],
            hasyard_data: [],
            isnewbuilt_data: [],
            hasPool: null,
            hasStorageRoom: null,
            hasStormProtector: null,
            hasYard: null,
            isNewBuilt: null,
            predict: null,
            squareMeters: null,
            numberOfRooms: null,
            floors: null,
            cityPartRange: null,
            numPrevOwners: null,
            made: null,
            basement: null,
            attic: null,
            garage: null,
            hasGuestRoom: null,
            price: 0,

            cement: null,
            slag: null,
            flyash: null,
            water: null,
            superplasticizer: null,
            coarseaggregate: null,
            fineaggregate: null,
            age: null,
            csMPa: 0
        }
    }

    componentDidMount(){
        this.getHaspool();
        this.getHasstorageroom();
        this.getHasstormprotector();
        this.getHasyard();
        this.getIsnewbuilt();
    }

    getHaspool = () => {
        axios.get("http://localhost:3001/haspool").then((res) => {
            this.setState({haspool_data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    getHasstormprotector = () => {
        axios.get("http://localhost:3001/hasstormprotector").then((res) => {
            this.setState({hasstormprotector_data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    getHasstorageroom = () => {
        axios.get("http://localhost:3001/hasstorageroom").then((res) => {
            this.setState({hasstorageroom_data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    getHasyard = () => {
        axios.get("http://localhost:3001/hasyard").then((res) => {
            this.setState({hasyard_data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    getIsnewbuilt = () => {
        axios.get("http://localhost:3001/isnewbuilt").then((res) => {
            this.setState({isnewbuilt_data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleNumberChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: parseInt(value)
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/predict_regression', this.state).then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
                csMPa: res.data.csMPa
            })
          }
        }).catch(error => {
          console.log(error);
        });
    }

    CreatModelBotton = (e) => {
        axios.get("http://localhost:3001/recreatemodel_regression").then((res) => {
            this.setState({1: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        // console.log(this.state.haspool_data);
        return(
            <main>
                <div className="container py-5">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.CreatModelBotton}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-lg btn-block btn-warning">สร้างโมเดล</button>
                                    </div>
                                </div>
                            </form>
                            <br/>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>cement</label>
                                            <input type="number" className="form-control" name="cement" placeholder="cement" onChange={this.handleNumberChange} value={this.state.cement} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>slag</label>
                                            <input type="number" className="form-control" name="slag" placeholder="slag" onChange={this.handleNumberChange} value={this.state.slag} />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-4">
                                        <div class="form-group">
                                            <label>hasYard</label>
                                            <select className="form-control" name="hasYard" onChange={this.handleChange}>
                                                <option value="">--Select--</option>
                                                {(this.state.hasyard_data).map((d, i) => (
                                                    <option value={d.hasYard}>{d.hasYard}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="row">
                                    {/* <div className="col-md-4">
                                        <div class="form-group">
                                            <label>hasPool</label>
                                            <select className="form-control" name="hasPool" onChange={this.handleChange}>
                                                <option value="">--Select--</option>
                                                {(this.state.haspool_data).map((d, i) => (
                                                    <option value={d.hasPool}>{d.hasPool}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> */}
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>flyash</label>
                                            <input type="number" className="form-control" name="flyash" placeholder="flyash" onChange={this.handleNumberChange} value={this.state.flyash} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>water</label>
                                            <input type="number" className="form-control" name="water" placeholder="water" onChange={this.handleNumberChange} value={this.state.water} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>superplasticizer</label>
                                            <input type="number" className="form-control" name="superplasticizer" placeholder="superplasticizer" onChange={this.handleNumberChange} value={this.state.superplasticizer} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>coarseaggregate</label>
                                            <input type="number" className="form-control" name="coarseaggregate" placeholder="coarseaggregate" onChange={this.handleNumberChange} value={this.state.coarseaggregate} />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-4">
                                        <div class="form-group">
                                            <label>isNewBuilt</label>
                                            <select className="form-control" name="isNewBuilt" onChange={this.handleChange}>
                                                <option value="">--Select--</option>
                                                {(this.state.isnewbuilt_data).map((d, i) => (
                                                    <option value={d.isNewBuilt}>{d.isNewBuilt}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="row">
                                    {/* <div className="col-md-4">
                                        <div class="form-group">
                                            <label>hasStormProtector</label>
                                            <select className="form-control" name="hasStormProtector" onChange={this.handleChange}>
                                                <option value="">--Select--</option>
                                                {(this.state.hasstormprotector_data).map((d, i) => (
                                                    <option value={d.hasStormProtector}>{d.hasStormProtector}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> */}
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fineaggregate</label>
                                            <input type="number" className="form-control" name="fineaggregate" placeholder="fineaggregate" onChange={this.handleNumberChange} value={this.state.fineaggregate} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>age</label>
                                            <input type="number" className="form-control" name="age" placeholder="age" onChange={this.handleNumberChange} value={this.state.age} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>garage</label>
                                            <input type="number" className="form-control" name="garage" placeholder="garage" onChange={this.handleNumberChange} value={this.state.garage} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>hasStorageRoom</label>
                                            <select className="form-control" name="hasStorageRoom" onChange={this.handleChange}>
                                                <option value="">--Select--</option>
                                                {(this.state.hasstorageroom_data).map((d, i) => (
                                                    <option value={d.hasStorageRoom}>{d.hasStorageRoom}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>hasGuestRoom</label>
                                            <input type="number" className="form-control" name="hasGuestRoom" placeholder="hasGuestRoom" onChange={this.handleNumberChange} value={this.state.hasGuestRoom} />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-lg btn-block btn-info">ทำนายผล</button>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div class="alert alert-warning" role="alert">
                                            <h1 className='text-center'>csMPa : {(this.state.csMPa).toLocaleString()} </h1>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Products;