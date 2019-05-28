import React, {Component} from 'react';

class CharComponent extends Component {
    render() {
        return (
            <span onClick={this.props.handleClick}>
                {this.props.value}
            </span>
        );
    }
}

export default CharComponent;