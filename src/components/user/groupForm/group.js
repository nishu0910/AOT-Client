import React from 'react'
import './group.css'

class Group extends React.Component{
    constructor(props){
        super(props);
        this.state={
            groupName:'',
            btnLabel:'Create Group',
            groupId:undefined
        }
    }

    createGroupNameHandler=()=>{        

        let userId=this.props.userId;
        var options={
            method:'POST'
        }
        if(this.state.btnLabel == 'Create Group'){
            fetch(`http://localhost:4000/users/CreateGroup?userId=${userId}&groupName=${this.state.groupName}`,options)
            .then(res=> {            
                return res.json()
            })
            .then(data=>{
                console.log("user grp created")
                this.setState({groupId:data.Id})
                this.setState({btnLabel:'Update GroupName'})
                this.setState({groupName:''})
            })
            .catch(err=>console.log(err))
        }
        else{
            fetch(`http://localhost:4000/users/UpdateGroupName?groupId=${this.state.groupId}&groupName=${this.state.groupName}`,options)
            .then(res=> {            
                return res.json()
            })
            .then(data=>{
                console.log("user grp created")
                this.setState({btnLabel:'Update GroupName'})
                this.setState({groupName:''})
            })
            .catch(err=>console.log(err))
        }
        
    }


    render(){
        return(
            <div className="App create-grp">
                {this.state.groupName &&
                    <p>Group Name: {this.state.groupName}</p>
                }
                
                <input className="form-control" type="text"
                 value={this.state.groupName} 
                 onChange={(e)=>{this.setState({groupName:e.target.value})}}></input>
                 <button className="btn btn-primary" onClick={this.createGroupNameHandler}>{this.state.btnLabel}</button>
                 
            </div>
        )
    }
}

export default Group;