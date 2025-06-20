import ImageShow from "./ImageShow"

export default function Slideshow() {
    return (
        <section className="relative min-h-[100dvh] overflow-hidden" id="hero">
  <div className="absolute inset-0 bg-transparent flex items-center justify-center animate-none z-[9]">
    <div className="text-center space-y-3 md:space-y-4">
      <p className="font-roboto-slab">Ne căsătorim!</p>
      <h1 className="heading-4 md:heading-2 lg:heading-1 font-dancing-script font-bold md:font-normal">
        Andreea & Claudiu
      </h1>
      <p className="text-base md:text-lg font-dancing-script">Împreună cu nașii noștri,</p>
      <h1 className="heading-2 md:heading-1 lg:heading-1 font-dancing-script font-bold md:font-normal">
        Anda & Mihai Călin 
      </h1>
      <p className="text-sm md:text-base font-dancing-script">Și alături de dragii noștri părinți,</p>
      <p className="text-sm md:text-base font-dancing-script">Elena Dumitrescu & Nicolae</p>
      <p className="text-sm md:text-base font-dancing-script">Tomescu Vasilica & Valentin Țoiu</p>
    </div>
  </div>
  <div className="absolute inset-0 z-[8] bg-white/40" />
  <ImageShow />
</section>

    )
}