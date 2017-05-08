# WaitingSpinner

> A WaitingSpinner is a custom component for showing a "waiting" or "loading"
spinner icon in applications.

## Usage
```js
import WaitingSpinner from './src/components/WaitingSpinner/WaitingSpinner';
import React from 'react';

export default React.createClass({    
    render() {
        return (
            <WaitingSpinner type={'primary'} size={'large'} />
        }
    }
});
```

## Options
- className: PropTypes.string,
- size: PropTypes.oneOf(['small', 'medium', 'large'])
- type: PropTypes.oneOf(['default', 'primary', 'inverted'])
