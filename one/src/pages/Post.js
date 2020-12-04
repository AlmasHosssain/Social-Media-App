import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPost,deletePost,deleteComment } from '../store/action/postAction'
import CreatePost from '../components/posts/CreatePost'
import UpdatePost from '../components/posts/UpdatePost'
import DoComment from '../components/comment/DoComment'
import UpdateComment from '../components/comment/UpdateComment'

class Post extends Component {

   state={
      isOpen : false,
      isUpdate : false,
      commentOpen : false,
      commentUpdateOpen : false,
      id : ''
   }
   postBoxOpen=()=>{
      this.setState({
         isOpen : true
      })
   }
   postBoxClose=()=>{
      this.setState({
         isOpen : false
      })
   }
   updateBoxOpen=(id)=>{
      this.setState({
         isUpdate : true,
         id
      })
   }
   updateBoxClose=()=>{
      this.setState({
         isUpdate : false,
         id : ''
      })
   }

   commentBoxOpen=(id)=>{
      this.setState({
         commentOpen : true,
         id
      })
   }

   commentBoxClose=()=>{
      this.setState({
         commentOpen :  false,
         id : ''
      })
   }

   commentUpdateBoxOpen=(id)=>{
      this.setState({
         commentUpdateOpen : true,
         id
      })
   }

   commentUpdateBoxClose=()=>{
      this.setState({
         commentUpdateOpen : false,
         id : ''
      })
   }

   componentDidMount(){
      this.props.loadPost()
   }

   render() {
      let {auth,post} = this.props
      return (
         
         <>
         <div className='my-1'>
            <CreatePost
               isOpen = {this.state.isOpen}
               close = {this.postBoxClose}
             />
            <button className='btn btn-primary'
               style = {{background : 'transparent',color:'black'}}
               onClick= {this.postBoxOpen}
             >Write what's on your mind</button>
         </div>
         <div className='form-group my-3'>
           <ul className='list-group'>
             {
                post.map(singlePost=>{
                   return(
                      <li key = {singlePost._id}
                        className='list-group-item my-2'
                       >  
                        <h3>{singlePost.userName}</h3>
                         <p>{singlePost.body}</p>
                          
                        {
                           auth.user._id === singlePost.user ? 
                              
                              <div style={{position : 'relative'}} >
                              <button className='btn btn-primary' style={{position: 'absolute',float : 'right',bottom :'10%',right : '17%'}} 
                              >Share</button>

                              <button className='btn btn-success' style={{position: 'absolute',float : 'right',bottom :'10%',right : '8%'}} 
                              onClick={()=>{this.updateBoxOpen(singlePost._id)}}
                              >Update</button>
                              {
                                 this.state.id === singlePost._id?
                                 <UpdatePost
                                    isUpdate = {this.state.isUpdate}
                                     close = {this.updateBoxClose}
                                    post = {singlePost}
                                 /> : null
                              }
                              
                              <button className='btn btn-danger' style={{position: 'absolute',float : 'right',bottom :'10%',right : '0%'}}
                              onClick={()=>{this.props.deletePost(singlePost._id)}}
                              >Delete</button>
                              </div>
                           : null
                        }
                        
                        
 <h5>Comments : </h5>
{
  singlePost.comment.map(singleAll=>{
   //console.log(singleAll)
   return(
   <li className='list-group-item'>
      <h5>{singleAll.userName}</h5>
      <p>{singleAll.commentBody}</p>
      {
         auth.user._id === singleAll.userId ? 
           <div>
            <button className='btn btn-success' style={{background : 'transparent',color:'green'}} onClick= {()=>{this.commentUpdateBoxOpen(singleAll._id)}}>Update</button>
            {
               this.state.id === singleAll._id ?
               <UpdateComment
                isCommentUpdate = {this.state.commentUpdateOpen}
                updateCommentClose = {this.commentUpdateBoxClose}
                commentUpdate = {singleAll}
                /> : null
            }

             <button className='btn btn-danger mx-2' style={{background : 'transparent',color:'red'}}
             onClick={()=>{this.props.deleteComment(singleAll._id)}}
             >Delete</button>
           </div> : null
      }
    </li> 
   )
  })
}                        
                           
                           <button className='btn button-narrow my-2'     style={{border : '.5px solid black'}}
                           onClick= {()=>{this.commentBoxOpen(singlePost._id)}}
                            >Do Comment</button>
                            {
                               this.state.id === singlePost._id?
                               <DoComment
                                 isComment = {this.state.commentOpen}
                                 commentClose = {this.commentBoxClose}
                                 post = {singlePost}
                                
                              /> : null
                            }
                      </li>
                   )
                })
             }
           </ul>
         </div>
         </>
      )
   }
}

const mapStateToProps=state=>({
   auth : state.auth,
   post : state.post
})
export default connect(mapStateToProps,{loadPost,deletePost,deleteComment})(Post)