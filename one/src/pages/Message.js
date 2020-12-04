import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMessage,createMessage } from '../store/action/messageAction'

class Message extends Component {

   state = {
      messageBody : ''
   }

   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   componentDidMount(){
      this.props.loadMessage()
   }

   submitHandler=(event)=>{
      let { messageBody } = this.state
      event.preventDefault()
      this.props.createMessage({messageBody})
      this.props.loadMessage()
      this.setState({
         messageBody : ''
      })
   }

   
   render() {
      let {message,auth} = this.props
      let {messageBody} = this.state
      return (
         <>
         <div className="cols-sm-8 my-2 bg">
            <div className='list-group'>
               <div className='row mx-2'>
                  <div className='col-sm-8 side my-2'>
         
          {
            message.map(ms=>{
               let showName = ms.userName.substring(0,ms.userName.indexOf(' '))
               return(
                  auth.user.name === ms.userName?
                     <ul className='list-group text-right '>
                        <li className='list-group second' >
                           <small><i>{showName}</i></small>
                           <p>{ms.messageBody}</p>
                        </li>
                     </ul> : <ul className='list-group text-left '>
                        <li className='list-group second' >
                           <small><i>{showName}</i></small>
                           <p>{ms.messageBody}</p>
                        </li>
                     </ul>
                   
               )       
            })
          }
                  </div>
               </div>
               <form onSubmit={this.submitHandler}>
                  <div className='row last'>
                     <div className='col-sm-6 offset-2 my-3'>
                        <textarea
                        className='form-control'
                           placeholder="Do Message.."
                           name='messageBody'
                           value={messageBody}
                           id='messageBody'
                           onChange={this.changeHandler}
                           type = 'text'
                           cols = '15'
                           rows = '1'
                        />
                     </div>
                     <div className='col-sm-2 my-3'>
                        <button className="btn btn-primary" >Send</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         </>
      )
   }
}

const mapStateToProps=state=>({
   message : state.message,
   auth : state.auth
})

export default connect(mapStateToProps,{loadMessage,createMessage})(Message)