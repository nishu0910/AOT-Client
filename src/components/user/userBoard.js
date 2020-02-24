import React from 'react'
import Group from '../user/groupForm/group'
import UserGrpDashboard from '../user/userGrpListing/userGrpDashboard'
import Member from './members/members'
import './userBoard.css'

class UserBoard extends React.Component{
constructor(props){
    super(props)
    this.state={};
}

render(){
    return(
        <div className="board-container">
            <Group userId={this.props.user.Id}></Group>
            <UserGrpDashboard userId={this.props.user.Id}></UserGrpDashboard>
            <Member userId={this.props.user.Id}></Member>

        </div>
    )
}

}

export default UserBoard;