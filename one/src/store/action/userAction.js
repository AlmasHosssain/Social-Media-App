import Axios from 'axios'
import * as Types from '../action/type'
import jwtDecoder from 'jwt-decode'
import authToken from '../../utill/authToken'

export const registrationAction=(user,history)=>dispatch=>{
   Axios.post('/api/users/registration',user)
         .then((response)=>{
            console.log(response)
            dispatch({
               type : Types.USER_ERROR,
               payload : {
                  error : {}
               }
            })
            history.push('/login')
         })
         .catch((error)=>{
            console.log(error)
            dispatch({
               type : Types.USER_ERROR,
               payload : {
                  error : error.response.data
               }
            })
         })
}

export const loginAction=(user,history)=>dispatch=>{
   Axios.post('/api/users/login',user)
      .then((response)=>{
         let token = response.data.token
         localStorage.setItem('userToken',token)
         let decode = jwtDecoder(token)
         authToken(token)
         dispatch({
            type : Types.SET_USER,
            payload : {
               user : decode
            }
         })
         history.push('/profile')
      })
      .catch((error)=>{
         dispatch({
            type : Types.USER_ERROR,
            payload : {
               error : error.response.data
            }
         })
      })
}

export const logOut =(history)=>dispatch=>{
   localStorage.removeItem('userToken')
   history.push('/login') 
      dispatch({
         type : Types.SET_USER,
         payload : {
            user  : {}
         }
      })
}

export const updatePassword=(userPassword,history)=>dispatch=>{
   Axios.put('/api/users/',userPassword)
         .then((response)=>{
            dispatch({
               type : Types.USER_ERROR,
               payload : {
                  error : {}
               }
            })
            history.push('/login')
         })
         .catch((error)=>{
            console.log(error)
            dispatch({
               type : Types.USER_ERROR,
               payload : {
                  error : error.response.data
               }
            })
         })
}
export const updateUser=(userId,user)=>dispatch=>{
   Axios.put(`/api/users/${userId}`,user)
         .then((response)=>{
            console.log(response)
            dispatch({
               type : Types.UPDATE_USER,
               payload : {
                  user : response.data.user
               }
            })
         })
         .catch((error)=>{
            console.log(error)
         })
}

export const loadUserData=(userId)=>dispatch=>{
   Axios.get(`/api/users/${userId}`)
         .then((response)=>{
            dispatch({
               type : Types.UPDATE_USER,
               payload : {
                  user : response.data.user
               }
            })
         })
         .catch((error)=>{
            console.log(error)
         })
}

export const sendEmailForUpdatePassword=(email,history)=>dispatch=>{
   Axios.post('/api/test/email',email)
         .then((response)=>{
            console.log(response+'send successfully')
            
         })
         .catch((error)=>{
            console.log(error)
         })
}
