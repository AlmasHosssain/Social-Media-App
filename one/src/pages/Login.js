import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginAction } from '../store/action/userAction'
import { connect } from 'react-redux'
import LoginUpdate from '../components/userUpdate/LoginUpdate'

class Login extends Component {

   state = {
      email : '',
      password : '',
      error : {},
      isOpen : false 
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
      let {email,password,error} = this.state
      this.props.loginAction({email,password,error},this.props.history)
   }
   loginUpdateSectionOpen=()=>{
      this.setState({
         isOpen : true
      })
   }
   loginUpdateSectionClose=()=>{
      this.setState({
         isOpen : false
      })
   }
   render() {
      let {email,password,error} = this.state
      return (
         <div className="row">
            <div className="col-md-6 offset-md-3">
               <h1 className="display-3 text-center text-primary" >Login here</h1>
               <form onSubmit={this.submitHandler}>
                  <div className="form-group">
                     <label htmlFor='email'>Email:</label>
                     <input
                        type="text"
                        className = {error.email? 'form-control is-invalid' : 'form-control'}
                        placeholder = "Please enter the email please."
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
                        placeholder = "Please enter the password please."
                        value= {password}
                        name = "password"
                        id = "password"
                        onChange= {this.changeHandler}
                      />
                     {error.password && <div className='invalid-feedback'>
                     {error.password}
                     </div>}
                  </div>
                  <div className='text-danger my-2'>
                     {
                        error.message
                     }
                  </div>
                  <button className="btn btn-primary">Login</button>
                  <br />
                  <h3 className='display-4'>Or</h3>
                  <Link to='/registration'>Registration here</Link>
               </form>
               {/* <button
                  onClick= {this.loginUpdateSectionOpen}
                  className='btn btn-secondary'
                  style={{background: 'transparent',color: 'black'}}
                  >Forget Password?</button><br/><br/>
                  <LoginUpdate
                     isOpen = {this.state.isOpen}
                     close = {this.loginUpdateSectionClose}
                   /> */}

                   <Link to='/passwordChangeEmail'>
                     <button className='btn btn-primary' >Forget Password?</button>
                   </Link>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state=>({
   auth : state.auth
})
export default connect(mapStateToProps,{loginAction})(Login)