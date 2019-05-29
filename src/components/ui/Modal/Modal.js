import React from 'react';
import classes from './Modal.module.css'

const Modal = (props) => {
    return (
        <div className={classes.Modal}>
            {props.cildren}
        </div>
    );
};

export default Modal;
