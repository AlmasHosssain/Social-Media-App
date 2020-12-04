import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadUserData} from '../store/action/userAction'
import UserUpdate from '../components/userUpdate/UserUpdate'

class Profile extends Component {
   state = {
      isOpen : false
   }

   componentDidMount(){
      this.props.loadUserData(this.props.auth.user._id)
   }

   updateModalOpen=()=>{
      this.setState({
         isOpen : true
      })
   }

   updateModalClose=()=>{
     this.setState({
        isOpen : false
     })
   }

   render() {
      let {auth} = this.props
      return (
         <div className="row my-3" >
            <div className="col-md-6 offset-md-4">
               <h2>{auth.user.name}</h2>
               <h2>{auth.user.email}</h2>
               <h2>{auth.user.dept}</h2>
               <h2>{auth.user.session}</h2>
               <h2>0{auth.user.phoneNo}</h2>
            </div>
            <div className="col-md-6 offset-md-4" >
               <button className='btn btn-secondary'
               onClick= {this.updateModalOpen}
                >Update Profile</button>
                <UserUpdate 
                  isOpen = {this.state.isOpen}
                  close = {this.updateModalClose}
                  user = {auth.user}
                 />
            </div>
         </div>
      );
   }
}
const mapStateToProps = state =>({
   auth : state.auth
})
export default 
connect(mapStateToProps,{loadUserData})(Profile);
