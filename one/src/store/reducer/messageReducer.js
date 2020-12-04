import * as Types from '../action/type'

const messageReducer = (state = [],action)=>{
   switch (action.type) {
      case Types.LOAD_MESSAGE:{
         return action.payload.message
      }
      case Types.CREATE_MESSAGE : {
         state.push(action.payload.message)
         return state
      }
      default: return state
   }
}

export default messageReducer