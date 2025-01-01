import Image from "next/image"

export default function SlideImage({src, alt} : {src: string, alt:string}) {
    return (
        <div className="styles.container">
            <Image 
            src={src}
            alt={alt}
            fill={true}
            objectFit="contain"
            />
        </div>
    )
}