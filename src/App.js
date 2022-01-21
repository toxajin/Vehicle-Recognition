import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import ParticlesApp from './Components/ParticlesApp/ParticlesApp';
import VehicleRecognition from './Components/VehicleRecognition/VehicleRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

class App extends Component{
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      boxes: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name:'',
        email:'',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn:false})
    } else if(route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  CalculateVehicleLocation=(data)=>{
    const clarifaiVehicle = (data.outputs[0].data.regions);
    //[0].region_info.bounding_box)
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    let boxs = clarifaiVehicle.map(box=> {
      return{
      leftCol: box.region_info.bounding_box.left_col*width,
      topRow: box.region_info.bounding_box.top_row*height,
      rightCol: width - (box.region_info.bounding_box.right_col * width),
      bottomRow: height - (box.region_info.bounding_box.bottom_row * height)
    }
    })
    return boxs;
  }

  displayVehicleBoxes=(boxes)=>{
    this.setState({boxes:boxes});
  }


  OnChange =(event) =>{
    this.setState({input: event.target.value});
  }

  OnClick=()=>{
    this.setState({
      imageUrl:this.state.input
    });
    this.setState({boxes:''});
      fetch('https://murmuring-savannah-20477.herokuapp.com/imageurl', {
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          input:this.state.input
        })
      })
      .then(res => res.json())
      .then(response => {
        this.displayVehicleBoxes(this.CalculateVehicleLocation(response));
        if(response) {
          fetch('https://murmuring-savannah-20477.herokuapp.com/image', {
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id,
              cars:this.state.boxes.length
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log)
        }
      })
      .catch(err => console.log(err));
  }

  render(){
    const {isSignedIn, route, boxes, imageUrl, user} = this.state;
    return (
      <div className="App">
        <ParticlesApp />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' ?
          <div>
            <Logo />
            <Rank user={user}/>
            <ImageLinkForm OnChange={this.OnChange} OnClick={this.OnClick}/>
            <VehicleRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div>
          :(this.state.route === 'signin' || this.state.route === 'signout'
          ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
  }
      </div>
    );
  }
  
}
export default App;