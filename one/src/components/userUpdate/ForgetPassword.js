import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sendEmailForUpdatePassword} from '../../store/action/userAction'
import { errorMonitor } from 'nodemailer/lib/mailer'

class ForgetPassword extends Component {

   state = {
      email : '',
      error : {}
   }

   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      event.preventDefault()
      let {email} = this.state
      this.props.sendEmailForUpdatePassword({email})
      this.setState({
         email : ''
      })
   }

   render() {
      let {email} = this.state
      return (
         <form onSubmit={this.submitHandler}>
           <div className='form-group col-sm-6 offset-3 my-5'>
            <label htmlFor = 'email'>Email : </label>
            <input
               type="text"
               className = 'form-control'
               placeholder = "Enter your active email please."
               value= {email}
               name = "email"
               id = "email"
               onChange= {this.changeHandler}
             />
               <button className="btn btn-primary my-3">Submit</button>
           </div>
         </form>
      )
   }
}

export default connect(null,{sendEmailForUpdatePassword})(ForgetPassword)