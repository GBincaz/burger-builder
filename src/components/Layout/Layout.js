import React from 'react';
import AuxComponent from '../../hoc/AuxComponent';
import classes from './Layout.module.css'

const Layout = ( props ) => {
    return (
        <AuxComponent>
            <div>
                <span>Toolbar</span>
                <span>SideDrawer</span>
                <span>Backdrop</span>
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </AuxComponent>
    );
};

export default Layout;