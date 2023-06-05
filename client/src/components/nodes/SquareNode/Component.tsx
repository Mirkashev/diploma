import React from 'react';

const SquareNode = ({data}) => {

    const {label} = data;

    return (
        <div style={{
            width: '180px',
            height: '120px',
            background: '#618aef',

        }}>
            <div style={{
                margin: 'auto',
                paddingTop: '44px',
                textAlign: 'center',
                color: 'white'
            }}>
                {label}
            </div>
        </div>
    )
}

export default SquareNode
