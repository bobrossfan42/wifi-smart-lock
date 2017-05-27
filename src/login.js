import React, { Component } from "react";
import { StatusBar, Text, TextInput, View, StyleSheet, Image, Button } from "react-native";
import firebase from "firebase";

var styles = StyleSheet.create({
    title:{
        fontSize:30,
        color: "#595959",
        fontWeight: "bold",
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 4,
        marginBottom: 20,
		marginTop: 5,
    },
 
    input: {
        height: 40,
		width: 200,
        borderColor: "gray",
        borderWidth: 1,
		marginBottom: 20,
		borderRadius: 4,
		textAlign: "center",
		backgroundColor: "white"
    },
 
    container: {
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10,
        backgroundColor: "#4FCAFF",
        flex: 1
    }
});
 
class Login extends Component {
    handleLogin() {
        let email = this.state.email;
        let password = this.state.pass;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
 
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
				
				<Image
				source={require("./stemlogo.png")}
				/>
 
                <Text style={styles.title}>Wi-Fi Smart Lock</Text>
 
                <TextInput onChangeText={(email) => { this.setState({ email }) } }
                    autoCapitalize="none"
                    returnKeyType="next"
                    autoFocus={true}
                    onSubmitEditing={(event) => {
                        this.refs.passwordInput.focus();
                    } }
                    style={styles.input}
                    placeholder="Email" />
 
                <TextInput ref="passwordInput" onChangeText={(pass) => { this.setState({ pass }) } }
                    onSubmitEditing={() => this.handleLogin()}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    returnKeyType="go" />
					
				<Button 
					onPress={() => this.handleLogin()} 
					style={styles.buttonStyle}
					title="Login" 
				/>
            </View>
        );
    }
}
 
export default Login;