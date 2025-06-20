import React from "react"
import { motion, type Variants } from "framer-motion"
import HeroImage from "./HeroImage"

export default function Hero() {
    const variants: Variants = {
        initial: {
            opacity: 0,
            y: "40px"
        },
        animate: {
            opacity: 1,
            y: 0
        }
    }

    const anim = ({ duration, delay }: { duration: number, delay: number }) => ({
        variants: variants,
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true },
        transition: {
            duration,
            type: "spring",
            delay
        }
    })


    return (
        <section id="hero" className="container-box space-y-14 pt-10 md:pt-32">
            <motion.div className="text-center space-y-5 md:space-y-8 w-max mx-auto" {...anim({ duration: 1, delay: 0 })} >
                <p className="font-roboto-slab">Nunta</p>
                <h1 className="heading-4 md:heading-2 lg:heading-1 font-dancing-script font-bold md:font-normal">TOMESCU & ANDREEA</h1>
                <h4 className="text-sm md:text-[1.625rem] font-roboto-slab">
                    Octombrie 01, 2025
                </h4>
            </motion.div>
            <HeroImage />
        </section>
    )
}