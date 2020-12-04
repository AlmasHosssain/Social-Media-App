import * as Types from '../action/type'

let init = {
   user : {},
   error : {},
   isAuthenticate : false
}

const userReducer=(state = init,action)=>{
   switch(action.type){
      case Types.SET_USER:{
         return {
            user : action.payload.user,
            isAuthenticate : Object.keys(action.payload.user).length !==0,
            error : {}
         }
      }
      case Types.USER_ERROR : {
         return {
            ...state,
            error : action.payload.error
         }
      }
      case Types.PASSWORD_ERROR : {
         return {
            user : action.payload.user,
            isAuthenticate : Object.keys(action.payload.user).length !==0
         }
      }
      case Types.UPDATE_USER : {
         return{
            user : action.payload.user,
            isAuthenticate : Object.keys(action.payload.user).length !==0
         }
      }
      default : return state
   }
}

export default userReducer