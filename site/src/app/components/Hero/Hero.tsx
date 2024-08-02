import Image from "next/image";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="relative flex items-end w-full h-[75dvh]">
            <Image src={"https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                alt="" 
                width={800} 
                height={600}
                className="hero-bg"
                />
            <div className="main-container w-1/3 mb-40">
                <span className="category-tag">Interior Design</span>
                <h1 className="hero-title">Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.</h1>
            </div>
        </section>
    )
};

export default Hero;