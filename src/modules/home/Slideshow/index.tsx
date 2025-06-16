import ImageShow from "./ImageShow"

export default function Slideshow() {
    return (
        <section className="relative min-h-[100dvh] overflow-hidden" id="hero">
            <div className="absolute inset-0 bg-transparent flex items-center justify-center animate-none z-[9]">
                <div className="text-center space-y-5 md:space-y-6 -translate-y-[100%]">
                    <p className="font-roboto-slab">Nunta lui</p>
                    <h1 className="heading-4 md:heading-2 lg:heading-1 font-dancing-script font-bold md:font-normal">Claudiu & Andreea</h1>
                </div>
            </div>
            <div className="absolute inset-0 z-[8] bg-white/40"/>
           <ImageShow />
        </section>
    )
}