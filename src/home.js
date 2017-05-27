import React, {	Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

var styles = StyleSheet.create({
	container: {
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10,
        backgroundColor: "#4FCAFF",
        flex: 1
    },
	
	lockInfo: {
		fontSize: 14,
		backgroundColor: "white",
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 4,
		color: "gray",
		padding: 5,
		marginBottom: 20,
	},
	
	buttonStyle: {
		padding: 5,
		marginBottom: 20,
	},
});
 
class Home extends Component {
	constructor() {
		super();
		var self = this;
		this.state = {lockState: false, lastAction: ""};
		var isLockedRef = firebase.database().ref("data").child("isLocked");
		var isLocked;
		isLockedRef.on("value", function(snap) {
			isLocked = snap.val();
			self.setState({lockState: isLocked});
		});
		var lastAccessedRef = firebase.database().ref("data").child("lastAccessed");
		var lastAccesse;
		lastAccessedRef.on("value", function(snap) {
			lastAccessed = snap.val();
			self.setState({lastAction: lastAccessed})
		});
	}
    handleLogOut() {
        firebase.auth().signOut();
	}
    render() {
        return (
			<View style={styles.container}>
			<Text style={styles.lockInfo}>The lock is currently {this.state.lockState ? "locked" : "open"}</Text>
			<Text style={styles.lockInfo}>The lock was last used on {this.state.lastAction}</Text>
			<Button onPress={this.toggleLock} title="Toggle Lock" />
			<Text style={{marginBottom: 20}} />
            <Button onPress={this.handleLogOut} title="Logout" />
			</View>
        );
    }
	toggleLock() {
		var moment = require('moment-timezone');
		moment.tz.add('America/Vancouver|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');
		var now = moment().tz("America/Vancouver").format();
		
		var isLockedRef = firebase.database().ref("data").child("isLocked");
		var isLocked;
		isLockedRef.on('value', function(snap) {
			isLocked = snap.val();
		});
		isLockedRef.set(!isLocked);
		
		var lastAccessedRef = firebase.database().ref("data").child("lastAccessed");
		lastAccessedRef.set(now);
	}
}
 
export default Home;