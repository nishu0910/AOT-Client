import React, { Component } from 'react'
import loginLogo  from '../../assets/login.svg'
import  lockLogo  from '../../assets/lock.svg'
import  personLogo  from '../../assets/person.svg'
import  registerLogo  from '../../assets/register.svg'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mailId:'',
            password:''
        };
    }



    signUp = (res,provider) => {
        let userData;

        if (provider == 'facebook') {
            userData = {
                username: res.name,
                emailId: res.email,
                token: res.accessToken,
                password:null
            }
        }
        console.log("calling API")
        //Token from API
        var options={
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify(userData)
        }
        fetch("http:localhost:4000/users/SocialLogin",options)
            .then(res => {
                return res.json()             
               
            }).then(userData=>{
                console.log("data",userData)
                 this.props.setUser(userData);
            })
    }

    responseFacebook = (response) => {
        console.log(response);
        this.signUp(response, 'facebook');
    }

    responseGoogle = (response) => {
        console.log(response);
        this.signUp(response, 'google');

    }

    componentClicked = () => {
        console.log('componentClicked')
    }

    signInClicked=()=>{
        var options={
            method:'POST'            
        }
        fetch(`http:localhost:4000/users/RegisterUser?emailId=${this.state.mailId}&username=${this.state.mailId}&password=${this.state.password}`,options)
            .then(res => {
                return res.json()             
               
            }).then(userData=>{
                console.log("data",userData)
                 this.props.setUser(userData);
            })
            .catch(err=>console.log(err))
    
    }

    render() {
        return (
            <div className="login_container">
                {/* <div className="d-flex justify-content-center">
                    <button className="btn"><img alt="login" src={loginLogo}></img>Login</button>
                    <span className="seperator">|</span>
                    <button className="btn"><img alt="register" src={registerLogo}></img>Register</button>
                </div> */}
                <div className="login_main_section">
                    <div className="main">
                        <div className="main_header whiteSmoke">Login</div>
                        <div className="d-flex flex-column m-3">
                            <div className="input-group">
                                <input className="form-control" value={this.state.mailId} 
                                onChange={(e)=>this.setState({mailId:e.target.value})}
                                placeholder="Enter your Mail" type="text"></input>
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <img alt="person" src={personLogo}></img>
                                    </span>
                                </div>
                            </div>
                            <div className="input-group mt-3">
                                <input className="form-control" type="password" value={this.state.password}
                                onChange={(e)=>this.setState({password:e.target.value})}
                                 placeholder="Password"></input>
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <img alt="lock" src={lockLogo}></img>
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <button className="btn sign_in whiteSmoke" onClick={this.signInClicked}  ><small>SIGN IN/Login</small></button>
                                {/* <button className="btn btn-sm"><small>Lost your Password?</small></button> */}
                            </div>
                        </div>
                        <div className="alt_login d-flex">
                            <div className="d-flex pr-1">
                                <hr width="90%"></hr>
                                <div className="rounded-circle">
                                </div>
                            </div>
                            <span className="align-self-center">OR</span>
                            <div className="d-flex pl-1">
                                <div className="rounded-circle">
                                </div>
                                <hr width="90%"></hr>
                            </div>
                        </div>
                        <div className="social-btns text-center mt-3">
                            <div className="d-flex justify-content-around">
                                <div className="App">
                                    {/* <GoogleLogin
                                        clientId="702611872749-fgk5c4id406u04bldko3hhficc7s218d.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    /> */}

                                    <FacebookLogin
                                        appId="636852380382982"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        onClick={this.componentClicked}
                                        callback={this.responseFacebook} />
                                </div>
                            </div>
                        </div>

                        <div className="login_footer mt-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;