import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateComment } from '../../store/action/postAction'
import Modal from 'react-modal'

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


class UpdateComment extends Component {

   state = {
      commentBody : ''
   }

   componentDidMount(){
      this.setState({
         commentBody : this.props.commentUpdate.commentBody
      })
   }
   
   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      event.preventDefault()
      this.props.updateComment(this.props.commentUpdate._id,this.state)
      console.log(this.props.commentUpdate.commentBody)
      this.setState({
         commentBody : ''
      })
   }

   render() {
      let {commentBody} = this.state
      return ( 
         <div>
            <Modal
               isOpen = {this.props.isCommentUpdate}
               onRequestClose = {this.props.updateCommentClose}
               style = {customStyles}
            >
               <form onSubmit={this.submitHandler}>
                  <div className="d-flex justify-content-between align-items-center">
                     <h3>Update Comment</h3>
                     <button onClick={this.props.updateCommentClose} className="btn btn-danger">X</button>
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
                   <button className='btn btn-success my-1'>Update</button>
               </form>
            </Modal>
         </div>
      )
   }
}

export default connect(null,{updateComment})(UpdateComment)