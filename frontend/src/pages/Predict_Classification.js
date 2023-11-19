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

            // cement: null,
            // slag: null,
            // flyash: null,
            // water: null,
            // superplasticizer: null,
            // coarseaggregate: null,
            // fineaggregate: null,
            // age: null,
            // csMPa: 0,

            label: 0,
            fea_1: null,
            fea_2: null,
            fea_3: null,
            int_data: null,
            fea_5: null,
            fea_6: null,
            fea_7: null,
            fea_8: null,
            fea_9: null,
            fea_10: null,
            fea_11: null


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
        axios.post('http://localhost:3001/predict_classification', this.state).then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
                label: res.data.label
            })
          }
        }).catch(error => {
          console.log(error);
        });
    }

    CreatModelBotton = (e) => {
        axios.get("http://localhost:3001/recreatemodel_classification").then((res) => {
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
                                            <label>fea_1</label>
                                            <input type="number" className="form-control" name="fea_1" placeholder="fea_1" onChange={this.handleNumberChange} value={this.state.fea_1} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_2</label>
                                            <input type="number" className="form-control" name="fea_2" placeholder="fea_2" onChange={this.handleNumberChange} value={this.state.fea_2} />
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
                                            <label>fea_3</label>
                                            <input type="number" className="form-control" name="fea_3" placeholder="fea_3" onChange={this.handleNumberChange} value={this.state.fea_3} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>int_data</label>
                                            <input type="number" className="form-control" name="int_data" placeholder="int_data" onChange={this.handleNumberChange} value={this.state.int_data} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_5</label>
                                            <input type="number" className="form-control" name="fea_5" placeholder="fea_5" onChange={this.handleNumberChange} value={this.state.fea_5} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_6</label>
                                            <input type="number" className="form-control" name="fea_6" placeholder="fea_6" onChange={this.handleNumberChange} value={this.state.fea_6} />
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
                                            <label>fea_7</label>
                                            <input type="number" className="form-control" name="fea_7" placeholder="fea_7" onChange={this.handleNumberChange} value={this.state.fea_7} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_8</label>
                                            <input type="number" className="form-control" name="fea_8" placeholder="fea_8" onChange={this.handleNumberChange} value={this.state.fea_8} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_9</label>
                                            <input type="number" className="form-control" name="fea_9" placeholder="fea_9" onChange={this.handleNumberChange} value={this.state.fea_9} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_10</label>
                                            <input type="number" className="form-control" name="fea_10" placeholder="fea_10" onChange={this.handleNumberChange} value={this.state.fea_10} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <label>fea_11</label>
                                            <input type="number" className="form-control" name="fea_11" placeholder="fea_11" onChange={this.handleNumberChange} value={this.state.fea_11} />
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
                                            <h1 className='text-center'>เครดิต : {(this.state.label).toLocaleString()} </h1>
                                        </div>
                                        <div class="alert alert-warning" role="alert">
                                            <h1 className='text-center'>1 -- ดี   ||  0 -- ไม่ดี</h1>
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