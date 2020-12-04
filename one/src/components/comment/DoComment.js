import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { doComment } from '../../store/action/postAction'
const customStyles = {
   content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : "500px",
      height                : "33%"
   }
 };

class DoComment extends Component {
   
   state = {
      commentBody : ''
   }
   
   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      event.preventDefault()
      let {commentBody} = this.state
      this.props.doComment(this.props.post._id,{commentBody})
      this.setState({
         commentBody : ''
      })
   }

   render() {
      let {commentBody} = this.state
      return (
         <div>
            <Modal
               isOpen= {this.props.isComment}
               onRequestClose = {this.props.commentClose}
               style = {customStyles}
            >
            <form onSubmit={this.submitHandler}>
                  <div className="d-flex justify-content-between align-items-center">
                  <h3>Do Comment</h3>
                  <button onClick={this.props.commentClose} className="btn btn-danger">X</button>
                  </div>
                  <textarea
                     className='form-control'
                     placeholder="Comment here.."
                     name='commentBody'
                     value={commentBody}
                     id='commentBody'
                     onChange={this.changeHandler}
                     type = 'text'
                     cols = '20'
                     rows = '3'
                   />
                   <button className='btn btn-success my-1' >Comment</button>
               </form>
            </Modal>
         </div>
      )
   }
}

export default connect(null,{doComment})(DoComment)