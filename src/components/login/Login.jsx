import React, { useState } from 'react';
import './login.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Container } from 'react-bootstrap';
import firebaseConfig from '../../firebaseConfig/Firebase.config';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useContext(UserContext)

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }


    //google sing in
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleSingInHandle = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const { email } = result.user
                const googleLoggedIn = {
                    email: email
                }
                setUser(googleLoggedIn)
                storeAuthToken();

            }).catch((error) => console.log(error));
    }

    //facebook logged in
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const facebookSingInHandle = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                var user = result.user;
                console.log(user);
                storeAuthToken();
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }


    //Email logged in
    const submitHandle = (e) => {
        //console.log(user.email && user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => (res) => {
                    storeAuthToken();
                })
                .catch((error) => (error) => console.log(error));
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    storeAuthToken();
                })
                .catch((error) => console.log(error));
        }
        e.preventDefault();
    }

    const blurHandle = (e) => {
        let isValidField
        if (e.target.name === 'email') {
            isValidField = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            isValidField = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(e.target.value);
        }
        if (e.target.name === 'name') {
            isValidField = e.target.value
        }

        if (isValidField) {
            const newUser = { ...user }
            newUser[e.target.name] = e.target.value
            setUser(newUser)
        }
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Container>
            <div className="form-field">
                {newUser ? <h4 className="mb-2">Create an account</h4> : <h4>Login</h4>}
                <form onSubmit={submitHandle}>
                    {newUser && <input className="form-control mt-2" type="text" name="name" onBlur={blurHandle} id="" placeholder="name" required />} <br />
                    <input className="form-control" type="text" name="email" onBlur={blurHandle} placeholder="email" required /><br />
                    <input className="form-control" type="password" name="password" onBlur={blurHandle} id="" placeholder="password" required /><br />
                    <input className="custom-button" type="submit" value={newUser ? 'Sing Up' : 'Sing In'} />
                    {!newUser ? <p className="my-4">Don't have an account? <span className="toggleLogin" onClick={() => setNewUser(!newUser)}>Create an account</span></p> : <p style={{ textAlign: 'center' }} className="my-4">Already have an account? <span className="toggleLogin" onClick={() => setNewUser(!newUser)}>Login</span></p>}
                </form>
                <>
                    <p className="Or">or</p>
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <div>
                            <h3 style={{ cursor: 'pointer' }} onClick={googleSingInHandle} ><FcGoogle /></h3>
                        </div>
                        <div>
                            <h3 style={{ cursor: 'pointer', color: 'rgb(26 115 232)' }} onClick={facebookSingInHandle} ><FaFacebook /></h3>
                        </div>
                    </div>
                </>
            </div>
        </Container>
    );
};

export default Login;