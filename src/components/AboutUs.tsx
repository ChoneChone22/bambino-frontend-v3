import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-3xl md:text-4xl lg:text-5xl text-(--color-text)  mb-4">
            About Us
          </p>
          <p className="text-(--color-text) leading-relaxed max-w-xl mx-auto text-xl">
            At BamBite, we believe in the power of restraint. Every dish is a
            carefully composed study in contrasts—bold flavors presented with
            elegant simplicity.
          </p>
        </div>

        {/* Image Gallery - Compact Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
          <div className="relative aspect-3/4 overflow-hidden group">
            <Image
              src="/forcontact.jpg"
              alt="Restaurant interior"
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>
          {/* <p className="text-[10px] uppercase tracking-ultra-wide text-muted-foreground mt-3 text-center">
            Craft
          </p> */}

          <div className="relative aspect-3/4 overflow-hidden group">
            <Image
              src="/forcontact.jpg"
              alt="Restaurant interior"
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>
          {/* <p className="text-[10px] uppercase tracking-ultra-wide text-muted-foreground mt-3 text-center">
            Curate
          </p> */}

          <div className="relative aspect-3/4 overflow-hidden group">
            <Image
              src="/forcontact.jpg"
              alt="Restaurant interior"
              fill
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>
          {/* <p className="text-[10px] uppercase tracking-ultra-wide text-muted-foreground mt-3 text-center">
            Source
          </p> */}
        </div>
      </div>
      <div className="text-center mt-12">
        <button className="bg-(--color-background) text-(--color-text) border border-(--color-primary) inline-block mt-10 px-8 py-3 hover:text-white text-sm rounded-3xl tracking-wider uppercase hover:bg-primary transition-all duration-300 ">Learn More</button>
      </div>
    </section>
  );
}
