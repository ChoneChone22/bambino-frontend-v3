export default function OriginStory() {
  return (
    <section className="relative primary_background py-24 md:py-32 lg:py-40">
      <div className="absolute left-0 top-0 h-32 w-full bg-linear-to-b from-foreground/5 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] primary_text">
              Chapter One
            </span>
            <h2 className="font-serif text-4xl heading font-medium leading-tight md:text-5xl lg:text-6xl">
              {"And that's how BamBite was born"}
            </h2>
          </div>

          {/* Right Column - Description */}
          <div
            className="flex flex-col justify-center transition-all delay-300 duration-1000 
             "
          >
            <p className="text-lg leading-relaxed md:text-xl body">
              Hi, <span className="font-medium primary_text">I’m Bam</span> .
              Welcome to my imaginative little world where familiar flavors meet
              new ideas and every bite becomes a joyful adventure. Bambite is
              the way of connecting generations, cultures, and experiences
              through food. Inspired by cuisines from across Asia, we explore
              flavors, techniques, and dishes beyond the familiar with
              creativity and care. The result is food that feels comforting and
              approachable, yet a little unexpected — offering something new
              while still feeling right at home. At{" "}
              <span className="font-medium primary_text">BamBite</span>,every
              dish is an invitation to discover, enjoy, and have fun through
              flavor.
            </p>
          </div>
        </div>

        <div
          className="mt-20 rounded-2xl card p-8 md:p-12 lg:p-16 transition-all delay-500 duration-1000 ${
           "
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full primary_btn px-4 py-2">
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            <p className="font-serif text-2xl leading-relaxed sub_heading">
              BamBite is dedicated to creating food that brings people closer
              and makes every meal enjoyable. We focus on preparing dishes with
              care, quality ingredients, and attention to detail so customers
              feel welcomed and valued. By exploring new ideas while respecting
              cultural roots, we aim to serve food that creates happy memories,
              encourages sharing, and leaves people feeling satisfied and
              connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
