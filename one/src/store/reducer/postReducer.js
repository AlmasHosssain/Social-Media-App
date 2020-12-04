import * as Types from '../action/type'

const postReducer=(state=[],action)=>{
   switch (action.type) {
     case Types.LOAD_POST : {
        return action.payload.posts
     }
     case Types.CREATE_POST : {
        state.unshift(action.payload.post)
        return state
     }
     case Types.DELETE_POST : {
        let tempState = [...state]
        return tempState.filter(singlePost=>{
           return singlePost._id !== action.payload.id
        })
     }
     case Types.UPDATE_POST : {
        let tempState = [...state]
        return tempState.map(singlePost=>{
           if (singlePost._id === action.payload.post._id) {
              return action.payload.post
           }else{
              return singlePost
           } 
        })
     }
     case Types.DO_COMMENT : {
         let tempState = [...state]
         return tempState.map(singlePost=>{
            if (singlePost._id === action.payload.postComment._id) {
               singlePost.comment.unshift(action.payload.postComment.comment[0])
               return singlePost
            }else {
               return singlePost
            }
         })
     }
     case Types.UPDATE_COMMENT : {
        let tempState = [...state]
        return tempState.map(singlePost=>{
           if (singlePost._id === action.payload.updateComment._id) {
              return action.payload.updateComment
           }else{
              return singlePost
           }
        })
     }
     case Types.DELETE_COMMENT : {
        let tempState = [...state]
         return tempState.map(singlePost=>{
           if(singlePost._id === action.payload.deletedComment._id){
               return action.payload.deletedComment
           }
         else{
              return singlePost
           }  
        })
     }
     default : return state 
   }
}

export default postReducer