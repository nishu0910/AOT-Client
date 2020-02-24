import React from 'react'
import './members.css'

class Member extends React.Component{
    constructor(props){
        super(props);
        this.state={
            adminId:props.userId,
            members:[]
        }
    }

    componentDidMount(){

        var userId=this.props.userId

        fetch(`http://localhost:4000/users/GetAllGroupMembers?userId=${userId}`)
        .then(res=>res.json())
        .then(data=>{
           console.log("members",data)
           this.setState({members:data})
        })
    }


    removeMember=(memberToDelete,index)=>{

        var userId=this.props.userId
        var options={
            method:'DELETE'
        }
        fetch(`http://localhost:4000/users/RemoveUserFromGroup?userId=${memberToDelete}&adminId=${userId}`,options)
        .then(res=>res.json())
        .then(data=>{
           console.log("members",data)
           //this.setState({members:data})
           var newMembers = [...this.state.members]
           newMembers.splice(index,1)
           this.setState({members:newMembers})
        })
    }

    render(){
        return(
            <div className="members-container">
                <p>Members in Group</p>
                {this.state.members.map((member,index)=>{
                    return (
                        <div key={index} className="member-item">
                            <p>{member.UserName}</p>
                            <button className="btn btn-danger" onClick={()=>{this.removeMember(member.Id,index)}}>Remove</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Member;