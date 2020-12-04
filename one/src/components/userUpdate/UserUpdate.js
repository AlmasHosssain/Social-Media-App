import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { updateUser } from '../../store/action/userAction'
const customStyles = {
   content : {
     top                   : '50%',
     left                  : '50%',
     right                 : 'auto',
     bottom                : 'auto',
     marginRight           : '-50%',
     transform             : 'translate(-50%, -50%)',
     width                 : "42%",
     height                : "90%"
   }
 };
class UserUpdate extends Component {

   state = {
      name : '',
      email : '',
      dept : '',
      session : '',
      phoneNo : '',
      password : '',
      confirmPassword : ''
   }

   componentDidMount(){
      this.setState({
         name : this.props.user.name,
         email : this.props.user.email,
         dept : this.props.user.dept,
         session : this.props.user.session,
         phoneNo : this.props.user.phoneNo
      })
   }

   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      event.preventDefault()
      let {name,email,dept,session,phoneNo,password,confirmPassword}= this.state
      this.props.updateUser(this.props.user._id,{name,email,dept,session,phoneNo,password,confirmPassword})
      this.setState({
         name : '',
         email : '',
         dept : '',
         session : '',
         phoneNo : '',
         password : '',
         confirmPassword : ''
      })
      this.props.close()
   }

   render() {
      let {name,email,session,phoneNo,password,confirmPassword} = this.state
      return (
         <div>
            <Modal
               isOpen = {this.props.isOpen}
               style= {customStyles}
               onRequestClose={this.props.close}
            >
               <form onSubmit={this.submitHandler}>
                <div className="d-flex justify-content-between align-items-center">
                   <h1>Update User</h1>
                   <button onClick={this.props.close} className="btn btn-danger">X</button>
                </div>
                <div className="form-group">
               <label htmlFor="name" >Name:</label>
               <input
                     type = "text"
                     className = 'form-control'
                     placeholder = "Please update your name"
                     value = {name}
                     id= "name"
                     name = "name"
                     onChange = {this.changeHandler}
                   />
                  
             </div>
             <div className="form-group">
               <label htmlFor="email" >Email:</label>
               <input
                     type = "text"
                     className = 'form-control'
                     placeholder = "Please update your email"
                     value = {email}
                     id= "email"
                     name = "email"
                     onChange = {this.changeHandler}
                   />  
             </div>
             <div className="form-group">
                  <label htmlFor='dept' >Department:</label>
                  <select
                     onChange = {this.changeHandler}
                     name = 'dept'
                     className="form-control"
                  >
                     <option selected> Select A Option Please </option>
                     <option  value="English" >English</option>
                     <option value="Bangla">Bangla</option>
                     <option value="Economics" >Economics</option>
                     <option value="Computer Science & Engineering" >Computer Science & Engineering</option>
                     <option value="Information & Communication Technology" >Information & Communication Technology</option>
                     <option value="Math" >Math</option>
                     <option value="Law" >Law</option>
                     <option value="BBA" >BBA</option>
                  </select>
               </div>

               <div className="form-group">
               <label htmlFor="session" >Session:</label>
               <input
                     type = "text"
                     className = 'form-control'
                     placeholder = "Please enter your password"
                     value = {session}
                     id= "session"
                     name = "session"
                     onChange = {this.changeHandler}
                   />
              </div>

              <div className="form-group">
               <label htmlFor="phoneNo" >Phone Number:</label>
               <input
                     type = "number"
                     className = 'form-control'
                     placeholder = "Please enter your password"
                     value = {phoneNo}
                     id= "phoneNo"
                     name = "phoneNo"
                     onChange = {this.changeHandler}
                   />
              </div>
             <div className="form-group">
               <label htmlFor="password" >Password:</label>
               <input
                     type = "password"
                     className = 'form-control'
                     placeholder = "Please enter your new password"
                     value = {password}
                     id= "password"
                     name = "password"
                     onChange = {this.changeHandler}
                   />
                  
             </div>
             <div className="form-group">
               <label htmlFor="confirmPassword" >Confirm Password:</label>
               <input
                     type = "password"
                     className = 'form-control'
                     placeholder = "Retype your password for confirmation"
                     value = {confirmPassword}
                     id= "confirmPassword"
                     name = "confirmPassword"
                     onChange = {this.changeHandler}
                   />
             </div>
             <button className='btn btn-primary'>Submit</button>
               </form>
            </Modal>
         </div>
      )
   }
}

export default connect(null,{updateUser})(UserUpdate)
