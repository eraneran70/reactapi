import React from 'react';
import Formsy from 'formsy-react';

export default React.createClass({

    displayName: 'HiddenField',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired
    },

    mixins: [Formsy.Mixin],

    render() {
        return (
            <input type={'hidden'} name={this.props.name} value={this.props.value} />
        );
    }
});
