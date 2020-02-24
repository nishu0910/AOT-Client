import React from 'react';
import './App.css';
import Login from './components/login/login';
import UserBoard from './components/user/userBoard'

class App extends React.Component{
constructor(props){
  super(props)
  this.state={
    user:undefined
  }
}
  

  setUser=(user)=>{
    this.setState({user:user})
  }

  logoutUser=()=>{
    this.setState({user:undefined})
  }
  render(){
    let userDashboard=null;
    if(this.state.user){
      userDashboard = (
        <UserBoard user={this.state.user}/>
      )
    }
    else{
      userDashboard = (
        <Login setUser={this.setUser}/>
      )
    }
    return (
      <div className="App">
        {userDashboard}
      </div>
    );
  }
}

export default App;
