import { useState } from "react";
import styles from "./User.module.css";
import HeaderBar from "../../components/headerBar/HeaderBar";
import SelectUser from "../../components/selectUser/SelectUser";

function User() {

    return (
        <>
            <div className={styles.page}>
                <div className={styles.header}>
                    <HeaderBar />
                </div>
                <div className={styles.content}>
                    <SelectUser
                        className={styles.user}
                    />
                </div>
            </div>
        </>
    );
}

export default User;
