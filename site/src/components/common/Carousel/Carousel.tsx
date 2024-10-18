'use client';

import { ArrowBackIcon, ArrowFrontIcon } from "@/components/icons";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import "./Carousel.css";


enum TransitionStyle {
    InPlace = "in-place",
    Scroll = "scroll"
};

type CarouselProps = {
    children: ReactNode[],
    className?: string,
    autoScroll?: boolean,
    scrollInterval?: number,
    transitionStyle?: "in-place" | "scroll"
};

export const Carousel:React.FC<CarouselProps> = ({
    children,
    className,
    autoScroll = true,
    scrollInterval = 3000,
    transitionStyle = TransitionStyle.InPlace
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = children.length;

    const next = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalItems);
    }, [totalItems]);

    const previous = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
    }, [totalItems]);

    const setCurrent = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        if(autoScroll) {
            const interval = setInterval(next, scrollInterval);
            return () => clearInterval(interval);
        }
    }, [autoScroll, scrollInterval, next]);

    const renderChildren = (() => {
        switch(transitionStyle) {
            case TransitionStyle.InPlace:
                return (
                    <div className="w-full h-full flex-shrink-0">
                        {children[currentIndex]}
                    </div>
                );
            case TransitionStyle.Scroll:
                return (
                    <div className="flex transition-transform duration-300" 
                        style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${totalItems * 100}%` }}>
                            {children.map((child, index) => (
                                <div key={`carousel-${index}`} className="w-full flex-shrink-0">
                                    {child}
                                </div>
                                    
                            ))}
                    </div>
                );
        }
    })();

    return (
        <section className={`flex overflow-hidden ${className}`}>
            
            {renderChildren}

            {/* Indicators */}
            <div className="absolute w-full flex justify-between items-center bottom-4 z-10">
                <div className="flex justify-center w-full space-x-2">
                    {children.map((_, index) => (
                        <button key={`carousel-bullet-${index}`} 
                            className={`bullet ${(currentIndex === index) && 'selected'}`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            </div>
            {/* Controls */}
            <div className="absolute inset-0 hidden lg:flex justify-between items-center pointer-events-none">
                <button className="arrow" onClick={previous}>
                    <ArrowBackIcon size={"full"}/>
                </button>
                <button className="arrow" onClick={next}>
                    <ArrowFrontIcon size={"full"}/>
                </button>
            </div>
        </section>
    );
};