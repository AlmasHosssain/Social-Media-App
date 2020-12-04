import React, { Component } from 'react'
import { Link,NavLink,withRouter } from 'react-router-dom'
import { logOut } from '../../store/action/userAction'
import { connect } from 'react-redux'


class Navigation extends Component {
   render() {
      return (
         <nav className="navbar nav navbar-expand-lg navbar-dark bg-dark">
            <Link to='/'>
               <span className="navbar-brand">Social Media</span>
            </Link>
            <div
               dataToggler = "collapse"
               dataTarget = "#nav"
               className="navbar-toggler"
            >
               <span className="navbar-toggler-icon"></span>
            </div>
            <div className="navbar-collapse" id="nav">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <NavLink to='/' activeClass="active" exact >
                        <span className="nav-link">
                           Home
                        </span>
                     </NavLink>
                  </li>
                  
                  {
                     this.props.auth.isAuthenticate ? 
                     <>
                     <li className="nav-item">
                     <NavLink to='/profile' activeClass="active" exact>
                        <span className="nav-link">
                           Profile
                        </span>
                     </NavLink>
                  </li>

                  <li className="nav-item">
                     <NavLink to='/post' activeClass="active" exact>
                        <span className="nav-link">
                           Posts
                        </span>
                     </NavLink>
                  </li>

                  <li className="nav-item">
                     <NavLink to='/message' activeClass="active" exact>
                        <span className="nav-link">
                           Messages
                        </span>
                     </NavLink>
                  </li>
                  
                  <li className='navbar-item'>
                     <NavLink to='/login' activeClass= "active" exact >
                     <button className="btn btn-danger" onClick={()=>{this.props.logOut(this.props.history)}} >Logout</button>
                     </NavLink>
                  </li>
                  
                  </>
                  :
                  <> 
                  <li className="nav-item">
                     <NavLink to='/registration' activeClass="active" exact>
                        <span className="nav-link">
                           Registration
                        </span>
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink to='/login' activeClass="active" exact>
                        <span className="nav-link">
                           Login
                        </span>
                     </NavLink>
                  </li>
                  </>
                  }
               </ul>
            </div>
         </nav>
      )
   }
}

const mapStateToProps= state =>({
   auth : state.auth
})

export default connect(mapStateToProps,{logOut})(withRouter(Navigation))