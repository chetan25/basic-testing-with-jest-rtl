import React from 'react';
import "app.scss";
import styles from "app.module.css";

const Greeting = () => {
    return (
        <>
            <h2 className="app">APP</h2>
            <h2 className={styles.text}>APP</h2>
        </>
    );
};
export default Greeting;