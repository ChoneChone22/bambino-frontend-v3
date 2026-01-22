import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-wide">
              BamBite
            </Link>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed max-w-sm">
              An intimate dining experience where every dish tells a story of craftsmanship and local tradition.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4">Visit</h4>
            <address className="not-italic text-primary-foreground/70 text-sm leading-relaxed">
              123 Culinary Lane<br />
              New York, NY 10001<br />
              <span className="block mt-4">Wed - Sun</span>
              6:00 PM - 11:00 PM
            </address>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <a href="tel:+12125551234" className="block hover:text-primary-foreground transition-colors">
                +1 (212) 555-1234
              </a>
              <a href="mailto:hello@terroir.com" className="block hover:text-primary-foreground transition-colors">
                hello@terroir.com
              </a>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-primary-foreground transition-colors" aria-label="Instagram">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Terroir. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}