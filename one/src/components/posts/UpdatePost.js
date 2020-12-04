import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { updatePost } from '../../store/action/postAction'
const customStyles = {
   content : {
     top                   : '50%',
     left                  : '50%',
     right                 : 'auto',
     bottom                : 'auto',
     marginRight           : '-50%',
     transform             : 'translate(-50%, -50%)',
     width                 : "500px",
     height                : "48%"
   }
 };
class UpdatePost extends Component {

   state = {
      body : ''
   }

   componentDidMount(){
      this.setState({
         body : this.props.post.body
      })
   }

   changeHandler=(event)=>{
      this.setState({
         [event.target.name] : event.target.value
      })
   }

   submitHandler=(event)=>{
      event.preventDefault()
      this.props.updatePost(this.props.post._id,this.state)
      //console.log(this.props.post.body)
      this.setState({
         body : ''
      })
   }
   render() {
      let {body} = this.state
      return (
         <div>
            <Modal
               isOpen = {this.props.isUpdate}
               onRequestClose = {this.props.close}
               style = {customStyles}
            >
               <form onSubmit={this.submitHandler}>
                  <div className="d-flex justify-content-between align-items-center">
                  <h1>Update the post</h1>
                  <button onClick={this.props.close} className="btn btn-danger">X</button>
                  </div>
                  <div className='form-group'>
                     <textarea
                        className='form-control'
                        placeholder="Add what's on your mind.."
                        name='body'
                        value={body}
                        id='body'
                        onChange={this.changeHandler}
                        type = 'text'
                        cols = '20'
                        rows = '6'
                     />
                  </div>
                   <button className='btn btn-success my-1'>Save</button>
               </form>
            </Modal>
         </div>
      )
   }
}
export default connect(null,{updatePost})(UpdatePost)