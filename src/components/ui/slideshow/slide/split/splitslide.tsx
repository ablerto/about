import styles from "./splitslide.module.scss"

export default function SplitSlide({ children } : {children: React.ReactNode}) {
    return (
        <>
        <div className={styles.container}>
            {children}
        </div>
        </>
    )
}