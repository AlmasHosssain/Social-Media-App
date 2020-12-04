import * as Types from './type'
import Axios from 'axios'

export const loadPost=()=>dispatch=>{
   Axios.get('/api/posts')
         .then((response)=>{
            dispatch({
               type : Types.LOAD_POST,
               payload : {
                  posts : response.data
               }
            })
         })
         .catch((error)=>{
            console.log(error)
         })
}

export const createPost=(post)=>dispatch=>{
   Axios.post('/api/posts',post)
         .then((response)=>{
            //console.log(response)
            dispatch({
               type : Types.CREATE_POST,
               payload : {
                  post : response.data
               }
            })
         })
         .catch((error)=>{
            console.log(error)
         })
}

export const deletePost=postId=>dispatch=>{
   Axios.delete(`/api/posts/${postId}`)
        .then((response)=>{
            dispatch({
               type : Types.DELETE_POST,
               payload : {
                  id : response.data._id
               }
            })
        })
        .catch(error=>{
           console.log(error)
        })
}

export const updatePost=(postId,post)=>dispatch=>{
   Axios.put(`/api/posts/${postId}`,post)
        .then((response)=>{
           //console.log(response)
           dispatch({
              type : Types.UPDATE_POST,
              payload : {
                 post : response.data.post
              }
           })
        })
        .catch((error)=>{
           console.log(error)
        })
}

export const doComment=(postId,comment)=>dispatch=>{
   Axios.post(`/api/posts/comment/${postId}`,comment)
        .then((response)=>{
           //console.log(response)
           dispatch({
              type : Types.DO_COMMENT,
              payload : {
                 postComment : response.data
              }
           })
        })
        .catch((error)=>{
           console.log(error)
        })
}

export const updateComment=(commentId,updatedComment)=>dispatch=>{
   Axios.put(`/api/posts/comment/${commentId}`,updatedComment)
         .then((response)=>{
            //console.log(response.data.response._id)
            dispatch({
               type : Types.UPDATE_COMMENT,
               payload : {
                  updateComment : response.data.response
               }
            })
         })
         .catch((error)=>{
            console.log(error)
         })
}

export const deleteComment=commentId=>dispatch=>{
   Axios.delete(`/api/posts/comment/${commentId}`)
        .then((response)=>{
           //console.log(response.data.response)
           dispatch({
              type : Types.DELETE_COMMENT,
              payload : {
                 deletedComment : response.data.response
              }
           })
        })
        .catch((error)=>{
           console.log(error)
        })
}