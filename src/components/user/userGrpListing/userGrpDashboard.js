import React from 'react'
import './userGrpDashboard.css'

class UserGrpDashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userGroups:[]
        }
    }

    componentDidMount(){

        fetch("http://localhost:4000/users/GetAllGroups")
        .then(res=> res.json())
        .then(data=>{
            console.log("User grps",data)
            this.setState({userGroups:data})
        })
    }

    addToUserGroup = (groupId) =>{

        let userId=this.props.userId;
        var options={
            method:'POST'
        }
        fetch(`http://localhost:4000/users/JoinGroup?groupId=${groupId}&userId=${userId}`,options)
        .then(res=> {
            console.log("user joined grp")
        })
    }

    render(){
        return(
            <div className="userGrps">
                <p>Groups in Total</p>
                {this.state.userGroups.map((grp,i)=>{
                    return(
                        <div key={i} className="grpItem">
                            <p>{grp.GroupName}</p>
                            <button className="btn btn-primary" onClick={()=>{this.addToUserGroup(grp.GroupId)}}>Join</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default UserGrpDashboard