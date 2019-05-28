import React, {Component} from 'react';

const UserInput = (props) => {
    const style = {
        marginTop: '80px'
    }

    const { username, handleChange } = props;
    return (
        <div style={style}>
            <input value={username} onChange={handleChange('username')}/>
        </div>
    )
};

export default UserInput;