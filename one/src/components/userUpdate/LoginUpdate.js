import React, { Component } from 'react';
import Modal from 'react-modal'
import {updatePassword} from '../../store/action/userAction'
import { connect } from 'react-redux'


class LoginUpdate extends Component {

   state = {
      email : '',
      password : '',
      confirmPassword : '',
      error : {}
   }

   static getDerivedStateFromProps(nextProps,prevProps){
      if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevProps.error)) {
         return {
            error : nextProps.auth.error
         }
      }else{
         return null
      }
   }

   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      event.preventDefault()
      let {email,password,confirmPassword,error} = this.state
      this.props.updatePassword({email,password,confirmPassword,error},this.props.history)
      // console.log(this.props.history)
      this.setState({
         email : '',
         password : '',
         confirmPassword : ''
      })
      
   }

   render() {
      let {email,password,confirmPassword,error} = this.state
      return (
            <div className="col-sm-6 offset-3 my-5">
               <form onSubmit={this.submitHandler}>
                <div className="form-group">
                     <label htmlFor='email'>Email:</label>
                     <input
                        type="text"
                        className = {error.email? 'form-control is-invalid' : 'form-control'}
                        placeholder = "Enter your active email please."
                        value= {email}
                        name = "email"
                        id = "email"
                        onChange= {this.changeHandler}
                      />
                      {error.email && <div className='invalid-feedback'>
                     {error.email}
                  </div>}
                  </div>
                  <div className="form-group">
                     <label htmlFor='password'>Password:</label>
                     <input
                        type="password"
                        className = {error.password? 'form-control is-invalid' : 'form-control'}
                        placeholder = "Please enter your new password please."
                        value= {password}
                        name = "password"
                        id = "password"
                        onChange= {this.changeHandler}
                      />
                      {error.password && <div className='invalid-feedback'>
                     {error.password}
                  </div>}
                  </div>

                  <div className="form-group">
                   <label htmlFor="confirmPassword" >Confirm Password:</label>
                   <input
                     type = "password"
                     className = {error.confirmPassword? 'form-control is-invalid' : 'form-control'}
                     placeholder = "Retype your password for confirmation"
                     value = {confirmPassword}
                     id= "confirmPassword"
                     name = "confirmPassword"
                     onChange = {this.changeHandler}
                   />
                   {error.confirmPassword && <div className='invalid-feedback'>
                     {error.confirmPassword} 
                  </div>}
                  </div>
                  <div className='text-danger'>
                     {
                        error.message
                     }
                  </div>
                  <button className='btn btn-primary'>Submit</button>
               </form>
         </div>
      );
   }
}

const mapStateToProps=state=>({
   auth : state.auth
})

export default connect(mapStateToProps,{updatePassword})(LoginUpdate);
