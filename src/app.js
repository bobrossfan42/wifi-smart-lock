import React, { Component } from 'react';
import firebase from 'firebase';
import Login from './login';
import Home from './home';
 
class App extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }
 
    componentDidMount() {
        var config = {
            apiKey: "AIzaSyCUHLppXkF3zIbYsFk0dU_a_0uyfW2_hCg",
			authDomain: "smart-lock-701e0.firebaseapp.com",
			databaseURL: "https://smart-lock-701e0.firebaseio.com",
			storageBucket: "smart-lock-701e0.appspot.com",
		};
        firebase.initializeApp(config);
 
        firebase.auth().onAuthStateChanged(user => {
 
            if (user) {
                console.log("user logged in");
                this.setState({user});
            } else {
                console.log("user logged out");
                this.setState({user: null});
            }
        });
    }
 
    render() {
		return this.state.user ? <Home /> : <Login />
    }
}
 
export default App;