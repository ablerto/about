import React, { ReactNode } from "react";
import SplitSlide from "./split/splitslide";
import styles from "./slide.module.scss";

export default function Slide(
    {
        children, 
    } : 
    {
        children: React.ReactNode, 
    }
) {
    return (<div className={styles.slide}>
        <SplitSlide>
            {children}
        </SplitSlide>
    </div>)
}