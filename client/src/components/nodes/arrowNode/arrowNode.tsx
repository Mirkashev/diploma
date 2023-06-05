
import styles from './index.module.css';
import {Form, Popup} from "semantic-ui-react";
import React from "react";

const ArrowNode = ({id,data}) => {

    const {label, update} = data;

    const onChange = (label) => {
        update(id, {
            label
        })
    }

    return (
        <Popup
            on='click'
            // content='I will not flip!'
            pinned
            style={{
                marginLeft: '8px'
            }}
            trigger={<div style={{width: '120px', height: '40px'}}>
                <div>{label}</div>
                <div className={styles.arrow}>

                </div>
            </div>}
            >
            <div>
                <Form.Input defaultValue={data.label} onChange={(event) => onChange(event.target.value)}/>
            </div>
        </Popup>
    )
}

export default ArrowNode
