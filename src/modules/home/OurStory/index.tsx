"use client"

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

const timelines = [
    {
        title: "Capitolul I",
        description: "Aici scrieti ce vreti voi"
    },
    {
        title: "Capitolul II",
        description: "Si aici la fel"
    },
    {
        title: "Capitolul III",
        description: "Si aici la fel"
    },
    {
        title: "Capitolul IV",
        description: "Si aici la fel"
    }
]

const anim = (variants: Variants) => ({
    variants,
    initial: "initial",
    whileInView: "animate",
    viewport: {
        once: true
    }
})

export default function OurStory() {

    const stagger: Variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 0.2,
                staggerChildren: 0.5,
                type: "spring"
            },
        }
    }

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
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                type: "spring",
                delay: 0.4
            }
        }
    }


   return (
  <section
    className="relative w-full bg-cover bg-center bg-no-repeat py-20 px-4"
    style={{ backgroundImage: "url('/photos/rings2.jpeg')" }}
  >
    <div className="container-box2 text-white">
      <motion.h2
        className="px-4 md:px-0 heading-4 md:heading-3 xl:heading-2 font-dancing-script font-bold origin-left"
        {...anim(bluryEffect)}
      >
        Povestea noastra
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-betweenBoxMd xl:mt-betweenBox gap-14 md:gap-6 lg:gap-[4.75rem] xl:gap-[10.4375rem]">
        <motion.div
          className="px-4 md:px-0 space-y-4 md:space-y-[2.375rem] col-span-1"
          {...anim(stagger)}
        >
          {timelines.map((timeline, i) => (
            <Timeline
              key={i}
              title={timeline.title}
              description={timeline.description}
              delay={0.2 * (i + 1)}
            />
          ))}
        </motion.div>
        <motion.div className="w-full xl:w-[527px] h-[461px]" {...anim(fadeIn)}>
          <Image
            src="/photos/5.jpg"
            width={800}
            height={800}
            alt="our-story-photo"
            quality={100}
            className="size-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  </section>
)
}



type Props = {
    title: string;
    description: string;
    delay: number
}

function Timeline({ title, description, delay }: Props) {

    const variants: Variants = {
        initial: {
            opacity: 0,
            x: "-50px"
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                delay,
                type: "spring",
                bounce: 0
            }
        }
    }

    return (
        <motion.div
            className="flex justify-start gap-2 md:gap-x-4"
            {...anim(variants)}
        >
            <GoDotFill className="text-base md:text-lg lg:text-xl translate-y-1" />
            <div className="space-y-2 lg:space-y-4">
                <h4 className="text-base md:heading-4 font-dancing-script font-bold">{title}</h4>
                <p className="text-xs md:text-base font-roboto-slab">{description}</p>
            </div>
        </motion.div>
    )
}