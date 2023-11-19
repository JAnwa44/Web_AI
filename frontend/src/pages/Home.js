import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        axios.post('http://localhost:3001/predict', this.state).then(res => {
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
        axios.get("http://localhost:3001/recreatemodel").then((res) => {
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
                    <div class="alert alert-info alert-dismissible fade show " role="alert">
                        <strong>Welcome!</strong> You can choose a prediction.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        
                    </div>
                    
                        <div className="card-body">
                        <div class="card text-center">
                            <div class="card-header">
                                <ul class="nav nav-pills card-header-pills">
                                    <li class="nav-item">
                                        {/* <a class="nav-link active" href="#">Regression</a> */}
                                        <Link to="/Predict_Regression" class="nav-link active">Regression</Link> 
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/Predict_Classification" class="nav-link">Classification</Link> 
                                        {/* <a class="nav-link" href="#">Classification</a> */}
                                    </li>
                                <li class="nav-item">
                            {/* <a class="nav-link disabled" href="#">Disabled</a> */}
                        </li>
                    </ul>
                </div>
                
            <div class="card-body">
                <h5 class="card-title">Great!</h5>
                <p class="card-text">You You You</p>
                <Link to="/Table" class="btn btn-primary">Go somewhere</Link>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
            </div>
                        {/* <div class="btn-group btn-group-lg btn btn-lg float-right " role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-outline-info">Regression</button>
                                <button type="button" class="btn btn-info">Classification</button>
                            </div> */
                            }
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Products;