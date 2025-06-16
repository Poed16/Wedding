"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { twMerge } from 'tailwind-merge'
import ModalGallery from "./ModalGallery"

const bluryEffect: Variants = {
    initial: {
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95
    },
    animate: {
        opacity: 1,
        filter: "blur(0)",
        scale: 1,
        transition: {
            duration: 1
        }
    }
}

const fadeIn: Variants = {
    initial: {
        opacity: 0,
        y: "40px",
    },
    animate: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            type: "spring",
            delay
        }
    })
}

const anim = (variants: Variants) => ({
    variants,
    initial: "initial",
    whileInView: "animate",
    viewport: {
        once: true
    }
})

const images = [
    "/photos/1.jpg",
    "/photos/2.jpg",
    "/photos/3.jpg",
    "/photos/4.jpg",
    "/photos/5.jpg"

]

export default function Gallery() {

    let [isOpen, setOpen] = React.useState(false)
    let [currentIndex, setCurrentIndex] = React.useState<number>(0)
    let [direction, setDirection] = React.useState(0)

    function prev() {
        setCurrentIndex(prevIndex => {
            return prevIndex <= 0 ? images.length - 1 : prevIndex - 1;
        });
        setDirection(-1)
    }

    function next() {
        setCurrentIndex(prevIndex => {
            return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        });
        setDirection(1)
    }

    function selectImage(index: number) {
        return function () {
            setCurrentIndex(index)
            setOpen(true)
        }
    }

    function closeModal() { setOpen(false) }

    return (
  <section
    className="relative w-full bg-cover bg-center bg-no-repeat py-20 px-4"
    style={{ backgroundImage: "url('/photos/brick.jpeg')" }}
  >
    <div className="container-box2 grid grid-cols-1 xl:grid-cols-3 items-start py-9 md:py-24 xl:py-[7.375rem] border-white gap-y-14 md:gap-y-24 text-white">
      <div className="col-span-2 flex justify-center items-center gap-3 md:gap-6 order-1 xl:order-none">
        <Column>
          <Photo imageSrc={images[0]} delay={0} onClick={selectImage(0)} />
          <Photo imageSrc={images[2]} delay={0.2} onClick={selectImage(2)} />
          <Photo imageSrc={images[4]} delay={0.2} onClick={selectImage(4)} />
        </Column>
        <Column className="mt-20 xl:mt-[9.5625rem]">
          <Photo imageSrc={images[1]} delay={0.2} onClick={selectImage(1)} />
          <Photo imageSrc={images[3]} delay={0.4} onClick={selectImage(3)} />
        </Column>
      </div>
      <motion.div
        className="space-y-4 md:space-y-5 relative xl:sticky xl:top-[7.375rem] text-center px-5 md:px-0"
        {...anim(bluryEffect)}
      >
        <h2 className="heading-4 md:heading-3 xl:heading-2 font-dancing-script text-white">
          Galeria noastra
        </h2>
        <p className="text-xs md:text-base font-roboto-slab text-white">
          Cele mai frumoase momente ale noastre dinaintea nuntii
        </p>
      </motion.div>
    </div>
    <ModalGallery
      isOpen={isOpen}
      image={images[currentIndex]}
      direction={direction}
      onPrev={prev}
      onNext={next}
      onClose={closeModal}
    />
  </section>
)

}


const Column = ({ children, className, ...rest }: React.ComponentProps<'div'>) => {

    const classMerge = twMerge(
        "flex flex-col gap-3 md:gap-6", className
    )

    return (
        <div className={classMerge} {...rest}>
            {children}
        </div>
    )
}


const Photo = ({ imageSrc, delay, objectPosition = "", onClick }:
    { imageSrc: string, delay: number, objectPosition?: string, onClick: () => void }
) => {
    return (
        <motion.div
            className="w-full h-[200px] xl:w-[322px] xl:h-[427px] cursor-pointer"
            {...anim(fadeIn)}
            custom={delay}
            onClick={onClick}
        >
            <Image
                src={imageSrc}
                alt="photo-frame"
                width={1000}
                height={1500}
                quality={100}
                className={`size-full object-cover ${objectPosition}`}
            />
        </motion.div>
    )
}