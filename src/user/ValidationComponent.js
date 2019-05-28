import React, {Component} from 'react';

class ValidationComponent extends Component {
    render() {
        const { length } = this.props;
        const errorText = () => {
            return length < 5 ? 'Text too short' : length > 8 ? 'Text too long enough' : null;
        };

        return (
            <div className='user'>
                <p>{errorText()}</p>
            </div>
        );
    }
}

export default ValidationComponent;