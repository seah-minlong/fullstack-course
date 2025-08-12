import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
