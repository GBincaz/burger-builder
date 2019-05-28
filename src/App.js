import React, { Component } from 'react';
import './App.css';
import UserInput from "./user/UserInput";
import UserOutput from "./user/UserOutput";
import ValidationComponent from "./user/ValidationComponent";
import CharComponent from "./user/CharComponent";

class App extends Component {

    state = {
        username : ''
    };

    handleChange = (input) => (event) => {
        this.setState({
           [input]: event.target.value
        })
    };

    deleteElement = (index) => {
        const username = [...this.state.username];
        username.splice(index, 1);
        const newUsername = username.join('');
        this.setState({
            username: newUsername
        })
    };

    getCharComponents = () => {
        const { username } = this.state;
        return username.split('').map((char, index) => {
            return <CharComponent key={index} handleClick={this.deleteElement.bind(this, index)} value={char}/>
        })
    };

    render () {
        const { username } = this.state;
        return (
            <div className="App">
                <UserInput username={username} handleChange={this.handleChange}/>
                <UserOutput username={username}/>
                <ValidationComponent length={username.length}/>
                {this.getCharComponents()}
            </div>
        );
    }

}

export default App;
