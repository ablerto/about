import React from "react";
import styles from "./slideshow.module.scss"

export default function Slideshow({children} : {children:React.ReactNode}) {
    return (<div className={styles.container}>
        {children}
    </div>)
}