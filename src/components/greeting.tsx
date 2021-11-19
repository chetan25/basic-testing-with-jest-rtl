import React from "react";
import "app.scss";
import styles from "app.module.css";
import { useGlobalState } from "store/global";
import translator from "lang/translator";

const Greeting = () => {
    const { user } = useGlobalState();

    return (
        <div data-testid={translator("greeting")}>
            <h2 className="app">Hello {user?.name}</h2>
            <h2 className={styles.text}>APP</h2>
        </div>
    );
};
export default Greeting;
