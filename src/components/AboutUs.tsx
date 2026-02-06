import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-(--color-background) py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-sm font-medium uppercase tracking-widest text-(--color-primary)">
            This is how BamBite has started
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h2 className="font-serif text-4xl font-medium leading-tight heading md:text-5xl lg:text-6xl text-balance">
              About Bambite
            </h2>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="body">
                What begins in  <span className="font-semibold primary_text">Bam&apos;s</span> world - his discoveries, his creativity,
                his joyful little recipes - is now being shared with you. Every
                dish is an invitation to connect, to feel comfort, and to
                experience new flavours carried from his home to yours, wherever
                you are. No matter how much the world changes, Bam believes one
                thing will always stay the same: food is happiness, comfort, and
                connection. BamBite exists to connect cultures, generations, and
                moments through the simple happiness of great food.
              </p>
            </div>

            <a
              href="/about_us"
              className="inline-block mt-10 px-8 py-3 secondary_btn border border_border text-sm rounded-3xl tracking-wider uppercase transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Right Column - Images */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Portrait Image */}
              <div className="col-span-8 relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/noodleMenu.jpg"
                  alt="Chef Bam in the kitchen"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Smaller Dish Image */}
              <div className="col-span-4 flex flex-col gap-4 justify-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/noodleMenu.jpg"
                    alt="Signature Asian fusion dish"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Decorative Element */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/noodleMenu.jpg"
                    alt="Signature Asian fusion dish"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
