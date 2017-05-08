import React, { PropTypes, createClass } from 'react';
import cx from 'classnames';

import './Card.scss';

const Card = createClass({

    displayName: 'Card',

    propTypes: {
        bodyContent: PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
        size: PropTypes.oneOf(['default', 'tall']),
        title: PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            size: 'default'
        };
    },

    _renderContent() {
        if (this.props.bodyContent) {
            return (
                <div
                    className="card__body-copy"
                    dangerouslySetInnerHTML={{ __html: this.props.bodyContent }} />
            );
        }

        return (
            <div className="card__body-copy">
                {this.props.children}
            </div>
        );
    },

    render() {
        const classNames = cx('card', `card--${this.props.size}`, this.props.className);

        return (
            <div className={classNames}>
                <div className="card__inner">
                    <h2 className="card__title">{this.props.title}</h2>
                    {this._renderContent()}
                </div>
            </div>
        );
    }
});

export default Card;
