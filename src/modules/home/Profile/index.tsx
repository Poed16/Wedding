import { type Variants } from "framer-motion"
import * as Motion from "@/components/Motion"
import ProgressiveImage from "@/components/ProgressiveImage"

const variants: Variants = {
  initial: {
    opacity: 0,
    y: "40px",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

const anim = ({ duration, delay }: { duration: number; delay: number }) => ({
  variants: variants,
  initial: "initial",
  whileInView: "animate",
  viewport: {
    once: true,
    margin: "-20%",
  },
  transition: {
    duration,
    type: "spring",
    delay,
  },
})

export default function Profile() {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-20 px-4"
      style={{ backgroundImage: "url('/photos/candles.jpg')" }}>
      <div className="container-box2 mt-24 md:mt-betweenSectionMd xl:mt-betweenSection grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-3 xl:gap-0   rounded-xl p-6 text-white">
        <div className="order-none md:order-1 flex flex-col justify-center items-center space-y-5 xl:space-y-7">
          <Motion.Box className="text-center space-y-5 md:space-y-7" {...anim({ duration: 1, delay: 0.2 })}>
            <h3 className="heading-4 md:heading-3 font-dancing-script font-bold text-black">Tomescu Claudiu</h3>
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-roboto-slab text-black">Cel mai</p>
              <p className="text-sm md:text-base font-roboto-slab text-black">de treaba baiat</p>
            </div>
          </Motion.Box>

          <Motion.Heading className="heading-4 md:heading-3 font-dancing-script font-bold text-black" {...anim({ duration: 1, delay: 0.3 })}>
            &
          </Motion.Heading>

          <Motion.Box className="text-center space-y-5 md:space-y-7" {...anim({ duration: 1, delay: 0.4 })}>
            <h3 className="heading-4 md:heading-3 font-dancing-script font-bold text-black">Andreea</h3>
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-roboto-slab text-black">O fata</p>
              <p className="text-sm md:text-base font-roboto-slab text-black">deosebita</p>
            </div>
          </Motion.Box>
        </div>

        <div className="flex gap-x-5 lg:gap-x-9">
          <Motion.Box
            className="w-[213px] h-[306px] md:h-[414px] xl:w-[287px] xl:h-[516px]"
            {...anim({ duration: 1, delay: 0.2 })}
          >
            <ProgressiveImage
              src="/photos/3.jpg"
              alt="tom-photos"
              width={500}
              height={1000}
              className="size-full object-cover"
            />
          </Motion.Box>

          <Motion.Box
            className="w-[213px] h-[306px] md:h-[414px] xl:w-[287px] xl:h-[516px] mt-20 md:mt-[155px]"
            {...anim({ duration: 1, delay: 0.4 })}
          >
            <ProgressiveImage
              src="/photos/Andreea.jpg"
              alt="Andreea-photos"
              width={500}
              height={1000}
              className="size-full object-cover"
            />
          </Motion.Box>
        </div>
      </div>
    </section>
  )
}
