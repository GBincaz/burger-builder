import React from 'react';
import './user.css'

const UserOutput = (props) => {
    const { username } = props;
    return (
        <div className='user'>
            <p>{username.length}</p>
        </div>
    )
};

export default UserOutput;