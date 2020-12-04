import React, { Component } from 'react'
import {connect} from 'react-redux'
import { logOut } from '../store/action/userAction'
import { Link } from 'react-router-dom'

class Home extends Component {
   render() {
      return (
         <div>
            {
               this.props.auth.isAuthenticate ? 
               <button className="btn btn-danger" 
                onClick = {()=>{this.props.logOut(this.props.history)}}
                >Logout</button>
               : <Link to='/login' ><button className="btn btn-success">Login</button></Link>
            }
         </div>
      )
   }
}

const mapStateToProps = state=>({
   auth : state.auth
})

export default connect(mapStateToProps,{logOut})(Home)