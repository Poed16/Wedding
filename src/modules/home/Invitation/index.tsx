"use client";

import React from "react";
import Image from "next/image"
import { AnimatePresence } from "framer-motion";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { RiArrowDownWideLine } from "react-icons/ri"
import { motion, type Variants } from 'framer-motion'
import { useInvitation } from "@/store/useInvitation";
import { useMusic } from "@/hooks/useMusic";

const variants: Variants = {
    initial: {
        opacity: 1,
        y: 0
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: "40px"
    }
}

const anim = ({ delay }: { delay: number }) => ({
    variants: variants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: {
        duration: 0.8,
        type: "spring",
        delay
    }
})

export default function Invitation() {
    const invitation = useInvitation()

    return (
        <AnimatePresence initial={false} mode="wait">
            {!invitation.isOpen &&
                <Card />}
        </AnimatePresence>
    )
}

function Card() {
  const invitation = useInvitation()

  function openInvitation() {
    invitation.openInvitation()
  }

  React.useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement
    if (html) html.style.overflow = "hidden"

    return () => {
      if (html) html.style.overflow = "visible"
    }
  }, [])

  useLockBodyScroll()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
     <motion.section
        className="w-full h-full max-w-[2650px] mx-auto flex justify-center px-7 md:px-14 py-7 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/photos/hero.jpg')" }}
        {...anim({ delay: 0 })}>
        <div className="w-full xl:w-5/12 space-y-6 flex flex-col justify-center items-center text-center">
          <div className="space-y-4">
            <div className="-space-y-3">
              <h3 className="heading-3 font-dancing-script">01</h3>
              <h3 className="heading-3 font-dancing-script">Octombrie</h3>
              <h3 className="heading-3 font-dancing-script">25</h3>
            </div>
            <div className="w-[1.5px] bg-black h-36 mx-auto" />
            <h2 className="heading-3 xl:heading-2 font-bold font-dancing-script">
              Andreea & <br /> Claudiu
            </h2>
          </div>

          <div className="pt-4">
            <button onClick={openInvitation} className="group">
              <div className="flex flex-col justify-center items-center border border-black rounded-lg px-4 py-2 pb-1 -space-y-1">
                <p className="font-dancing-script text-lg ">Deschide invitația</p>
                <RiArrowDownWideLine className="text-3xl group-hover:translate-y-1 group-active:scale-75 transition duration-300" />
              </div>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}



// const search = useSearchParams()
// const inviteFor = (search.get("to"))P
