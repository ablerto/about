import React from "react";
import styles from "./headerslide.module.scss";
import Image from "next/image";

export default function HeaderSlide(
    {children, imagePath, imageAlt} : 
    {children: React.ReactNode, imagePath: string, imageAlt: string}
) {
    return (<div className={styles.container}>
        <div className={styles.textContainer}>{children}</div>
        <div className={styles.imageContainer}>
            <Image
            src={imagePath}
            alt={imageAlt} 
            fill={true} />
        </div>
    </div>)
}