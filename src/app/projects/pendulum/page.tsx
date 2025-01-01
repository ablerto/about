import Slide from "@/components/ui/slideshow/slide/slide";
import SlideImage from "@/components/ui/slideshow/slide/slideImage/slideImage";
import styles from "./page.module.scss"
import Slideshow from "@/components/ui/slideshow/slideshow";
import Physics_text from "@/components/projects/pendulum/physics_text";
import HeaderSlide from "@/components/ui/slideshow/slide/header/headerslide";

export default function PendulumProject() {
    return (<>
        <Slideshow>
            <HeaderSlide imagePath="/images/a.jpg" imageAlt="Image">
                <h1>Her er en header</h1>
            </HeaderSlide>
            <Slide>
                <Physics_text />
                <SlideImage
                src="/images/a.jpg"
                alt="picture" />
            </Slide>
        </Slideshow>
    </>)
}