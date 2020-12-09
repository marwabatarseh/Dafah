
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import usercontext from "./context";
import { Link } from 'react-router-dom';

export default function Conditional() {
    const { userData, setUserData } = useContext(usercontext);
    // the history to change the url 
    const history = useHistory();
    const signup = () => history.push("/adduser");
    // const login = () => history.push("/login");
    const logout = () => { // in log out we will set the token & user to undefined .
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("aaddUser-token", "");
        history.push("/Homepage");
    };
    return (
        <nav className="auth-buttonss">
            {userData.user ? (
               <li className="navbar-item ml-auto" onClick={logout}>
               <Link to="/logout" className="nav-link ">Log out</Link>
               </li> 
            ) : (
                    <>
                        <li className="navbar-item  ml-auto">
          <Link to="/adduser" className="nav-link" onClick={signup}>Sign-up</Link>
          </li>
           
                    </>
                )}
        </nav>
    )
}
