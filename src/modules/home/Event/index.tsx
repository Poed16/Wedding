"use client"

import { useEffect } from "react"
import { GoDotFill } from "react-icons/go"
import { IoCalendarClearOutline } from "react-icons/io5"
import { BsClock } from "react-icons/bs"
import { PiMapPin } from "react-icons/pi"
import { motion, Variants } from "framer-motion"

// Tiparește global google pentru TypeScript
declare global {
  interface Window {
    initMap: () => void
    google: any
  }
}

const bluryEffect: Variants = {
  initial: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
  animate: { opacity: 1, filter: "blur(0)", scale: 1, transition: { duration: 1 } },
}

const stagger: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1, delay: 0.2, staggerChildren: 1, type: "spring" },
  },
}

const anim = (variants: Variants) => ({
  variants,
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true },
})

export default function Event() {
  useEffect(() => {
    window.initMap = function () {
      // Map 1: Restaurant
      const map1 = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 44.4388, lng: 26.0343 },
        zoom: 17,
        mapTypeId: "satellite",
      })

      new window.google.maps.Marker({
        position: { lat: 44.4388, lng: 26.0343 },
        map: map1,
        title: "Locația nunții - Strada Lujerului",
      })

      // Map 2: Cununia Civila
      const map2 = new window.google.maps.Map(document.getElementById("map2") as HTMLElement, {
        center: { lat: 44.4325, lng: 26.1039 },
        zoom: 16,
        mapTypeId: "satellite",
      })

      new window.google.maps.Marker({
        position: { lat: 44.4325, lng: 26.1039 },
        map: map2,
        title: "Cununia Civilă - Piața Universității",
      })
    }

    if (!document.getElementById("google-maps-script")) {
      const script = document.createElement("script")
      script.id = "google-maps-script"
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYrUoDoRHNd9BWge74arTaw4pkB8ctsMs&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    } else {
      if (window.google && window.google.maps) {
        window.initMap()
      }
    }
  }, [])

  return (
    <section
  className="relative w-full bg-cover bg-center bg-no-repeat py-20 px-4"
  style={{ backgroundImage: "url('/images/event-bg.jpg')" }}
>
  <div className="container-box2 flex flex-col items-center gap-24 text-black">
    
    {/* Locația evenimentului */}
    <div className="flex flex-col items-center text-center gap-6 w-full max-w-2xl">
      <motion.h2
        className="heading-4 md:heading-3 xl:heading-2 font-dancing-script font-bold"
        {...anim(bluryEffect)}
      >
        Locația evenimentului
      </motion.h2>

      <div className="flex flex-col items-center gap-6">
        <motion.h4 className="text-base md:heading-4 font-dancing-script font-bold" {...anim(bluryEffect)}>
          Data
        </motion.h4>

        <motion.ul className="space-y-3 md:space-y-4" {...anim(stagger)}>
          <Li delay={0.2}>
            <IoCalendarClearOutline className="text-xl md:text-2xl" />
            <p className="text-xs md:text-base font-roboto-slab">01 Octombrie 2025</p>
          </Li>
          <Li delay={0.4}>
            <BsClock className="text-xl md:text-2xl" />
            <p className="text-xs md:text-base font-roboto-slab">19:00 - până la final</p>
          </Li>
          <Li delay={0.6}>
            <PiMapPin className="text-2xl md:text-3xl" />
            <p className="text-xs md:text-base font-roboto-slab">
              <span className="font-bold">Restaurant Exemplar</span><br />
              Strada Lujerului, București
            </p>
          </Li>
        </motion.ul>
      </div>

      <div id="map" className="w-full max-w-[630px] h-[320px] xl:h-[389px] rounded-xl overflow-hidden" />
    </div>

    {/* Cununia Civilă */}
    <div className="flex flex-col items-center text-center gap-6 w-full max-w-2xl">
      <motion.h2
        className="heading-4 md:heading-3 xl:heading-2 font-dancing-script font-bold"
        {...anim(bluryEffect)}
      >
        Cununia civilă
      </motion.h2>

      <div className="flex flex-col items-center gap-6">
        <motion.h4 className="text-base md:heading-4 font-dancing-script font-bold" {...anim(bluryEffect)}>
          Data
        </motion.h4>

        <motion.ul className="space-y-3 md:space-y-4" {...anim(stagger)}>
          <Li delay={0.2}>
            <IoCalendarClearOutline className="text-xl md:text-2xl" />
            <p className="text-xs md:text-base font-roboto-slab">01 Octombrie 2025</p>
          </Li>
          <Li delay={0.4}>
            <BsClock className="text-xl md:text-2xl" />
            <p className="text-xs md:text-base font-roboto-slab">14:00 - Primăria Sector 6</p>
          </Li>
          <Li delay={0.6}>
            <PiMapPin className="text-2xl md:text-3xl" />
            <p className="text-xs md:text-base font-roboto-slab">
              <span className="font-bold">Primăria Sector 6</span><br />
              București, Bd. Iuliu Maniu 150
            </p>
          </Li>
        </motion.ul>
      </div>

      <div id="map2" className="w-full max-w-[630px] h-[320px] xl:h-[389px] rounded-xl overflow-hidden" />
    </div>
  </div>
</section>
  )
}

const Li = ({ delay, children }: { children: React.ReactNode; delay: number }) => {
  const variants: Variants = {
    initial: { opacity: 0, x: "-50px" },
    animate: { opacity: 1, x: 0, transition: { delay, type: "spring", bounce: 0 } },
  }

  return (
    <motion.li className="flex items-start gap-4 md:gap-6" {...anim(variants)}>
      {children}
    </motion.li>
  )
}
