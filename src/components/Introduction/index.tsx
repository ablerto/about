"use client"
import styles from "./Introduction.module.scss"
import Canvas from "./FlyingDots.jsx"
import useWindowSize from "../windowdimension/windowSize"

export default function Introduction() {
    const size = useWindowSize();
    return (
        <>
            <div className={styles.container}>
                <Canvas className={styles.backgroundSquare} 
                        width={String(size.width).concat("px")} 
                        height={String(size.height).concat("px")}
                />
                <div className={styles.textSquare}>
                    <div>
                        <h1>Albert Hovda Røed</h1>
                        <p>Cybernetics & Robotics student</p>
                    </div>
                </div>
            </div>
        </>
    )
}