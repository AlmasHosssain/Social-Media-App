import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { registrationAction } from '../store/action/userAction'
import { connect } from 'react-redux'

class Registration extends Component {

   state = {
      name : '',
      email : '',
      dept : '',
      session : '',
      phoneNo : '',
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
      let {name,email,dept,session,phoneNo,password,confirmPassword,error} = this.state
      this.props.registrationAction({name,email,dept,session,phoneNo,password,confirmPassword,error},this.props.history)
   }
   render() {
      let {name,email,session,phoneNo,password,confirmPassword,error} = this.state
      return (
         <div className="row my-2">
           <div className="col-md-6 offset-md-3">
            <h1 className="display-3 text-center text-primary my-4">Registration here</h1>
           
           <form onSubmit={this.submitHandler}>
             <div className="form-group">
               <label htmlFor="name" >Name:</label>
               <input
                     type = "text"
                     className = {error.name? 'form-control is-invalid' : 'form-control'}
                     placeholder = "Please enter your name"
                     value = {name}
                     id= "name"
                     name = "name"
                     onChange = {this.changeHandler}
                   />
                  {error.name && <div className='invalid-feedback'>
                     {error.name}
                  </div>}
             </div>
             <div className="form-group">
               <label htmlFor="email" >Email:</label>
               <input
                     type = "text"
                     className = {error.email? 'form-control is-invalid' : 'form-control'}
                     placeholder = "Please enter your email"
                     value = {email}
                     id= "email"
                     name = "email"
                     onChange = {this.changeHandler}
                   />
                  {error.email && <div className='invalid-feedback'>
                     {error.email}
                  </div>}
                  <div className="text-danger my-2">
               {
                  error.message
               }
             </div>
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
                  {error.dept && <div className='invalid-feedback'>
                     {error.dept}
                  </div>}
               </div>

               <div className="form-group">
               <label htmlFor="session" >Session:</label>
               <input
                     type = "text"
                     className = {error.session? 'form-control is-invalid' : 'form-control'}
                     placeholder = "Please enter your password"
                     value = {session}
                     id= "session"
                     name = "session"
                     onChange = {this.changeHandler}
                   />
                  {error.session && <div className='invalid-feedback'>
                     {error.session}
                  </div>}
              </div>

              <div className="form-group">
               <label htmlFor="phoneNo" >Phone Number:</label>
               <input
                     type = "number"
                     className = {error.phoneNo? 'form-control is-invalid' : 'form-control'}
                     placeholder = "Please enter your password"
                     value = {phoneNo}
                     id= "phoneNo"
                     name = "phoneNo"
                     onChange = {this.changeHandler}
                   />
                  {error.phoneNo && <div className='invalid-feedback'>
                     {error.phoneNo}
                  </div>}
              </div>

             <div className="form-group">
               <label htmlFor="password" >Password:</label>
               <input
                     type = "password"
                     className = {error.password? 'form-control is-invalid' : 'form-control'}
                     placeholder = "Please enter your password"
                     value = {password}
                     id= "password"
                     name = "password"
                     onChange = {this.changeHandler}
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
                     placeholder = "Please enter your confirm password"
                     value = {confirmPassword}
                     id= "confirmPassword"
                     name = "confirmPassword"
                     onChange = {this.changeHandler}
                   />
                  {error.confirmPassword && <div className='invalid-feedback'>
                     {error.confirmPassword} 
                  </div>}
             </div>
             
             <button className="btn btn-primary">Register</button>
             <br/>
             <h3 className='display-4' >Or</h3>
             <Link to='/login'>Login here</Link>

           </form>
           </div>
         </div>
      )
   }
}

const mapStateToProps = state =>({
   auth : state.auth
})

export default connect(mapStateToProps,{registrationAction})(Registration)