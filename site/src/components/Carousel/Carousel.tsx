import Image from "next/image";
import { ArrowBackIcon, ArrowFrontIcon } from "../icons";
import { CategoryTag } from "../common";
import "./Carousel.css";


export const Carousel: React.FC<{className?: string}> = ({className}) => {
    return (
        <section className={`relative flex items-end w-full ${className}`}>
            <Image src={"https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                alt="" 
                width={1600} 
                height={1200}
                className="background"
                />
            <div className="absolute w-full bottom-0 p-4">
                {/* Category tag */}
                <CategoryTag>Interior Design</CategoryTag>
                {/* Title */}
                <h1 className="title">Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.</h1>
                {/* Controls */}
                <div className="flex justify-between items-center">
                    {/* Bullets */}
                    <div className="flex bottom-0 justify-center lg:justify-start w-full space-x-2">
                        <span className="bullet selected"/>
                        <span className="bullet"/>
                        <span className="bullet"/>
                    </div>
                    {/* Arrows */}
                    <div className="bottom-0 right-0 hidden lg:flex">
                        <span className="arrow">
                            <ArrowBackIcon size={"full"}/>
                        </span>
                        <span className="arrow">
                            <ArrowFrontIcon size={"full"}/>
                        </span>
                    </div>
                </div>
                
            </div>
        </section>
    );
};