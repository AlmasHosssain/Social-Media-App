import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { createPost } from '../../store/action/postAction'

const customStyles = {
   content : {
     top                   : '50%',
     left                  : '50%',
     right                 : 'auto',
     bottom                : 'auto',
     marginRight           : '-50%',
     transform             : 'translate(-50%, -50%)',
     width                 : "500px",
     height                : "46%"
   }
 };
class CreatePost extends Component {

   state = {
      body : ''
   }

   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      let {body} = this.state
      event.preventDefault()
      this.props.createPost({body})
      this.setState({
         body : ''
      })
   }

   render() {
      let {body} = this.state
      return (
         <div>
            <Modal 
               isOpen = {this.props.isOpen}
               onRequestClose = {this.props.close}
               style = {customStyles}
            >
               <form onSubmit={this.submitHandler}>
                  <div className="d-flex justify-content-between align-items-center">
                  <h1>Add a new post</h1>
                  <button onClick={this.props.close} className="btn btn-danger">X</button>
                  </div>
                  <textarea
                     className='form-control extra'
                     placeholder="Add what's on your mind.."
                     name='body'
                     value={body}
                     id='body'
                     onChange={this.changeHandler}
                     type = 'text'
                     cols = '20'
                     rows = '6'
                   />
                   <button className='btn btn-success my-1' >Post</button>
               </form>
            </Modal>
         </div>
      )
   }
}

export default connect(null,{createPost})(CreatePost)