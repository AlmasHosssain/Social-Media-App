import * as Types from './type'
import Axios from 'axios' 

export const loadMessage=()=>dispatch=>{
   Axios.get('/api/user/messages/allMessages')
         .then((response)=>{
            dispatch({
              type : Types.LOAD_MESSAGE,
                payload : {
                   message : response.data
               }
            })
        })
        .catch((error)=>{
         console.log(error)
      })
}

export const createMessage=(message)=>dispatch=>{
   Axios.post('/api/user/messages',message)
         .then((response)=>{
            dispatch({
               type : Types.CREATE_MESSAGE,
               payload : {
                  message : response.data
               }
            })
         })
         .catch((error)=>{
            console.log(error)
         })
}