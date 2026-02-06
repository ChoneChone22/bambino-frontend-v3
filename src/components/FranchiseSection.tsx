import { Building2, TrendingUp, Users, Award } from "lucide-react";

const benefits = [
  {
    icon: Building2,
    title: "Proven Business Model",
    description:
      "A strong and recognizable brand.",
  },
  {
    icon: TrendingUp,
    title: "Strong ROI",
    description:
      "A tested business model with real results",
  },
  {
    icon: Users,
    title: "Comprehensive Training",
    description:
      "Training, operational support, and marketing guidance",
  },
  {
    icon: Award,
    title: "Brand Recognition",
    description: "A growing community that believes in shared success",
  },
];
export default function FranchiseSection() {
  return (
    <section id="franchise" className="py-24 md:py-32 secondary_background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-serif heading2 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl text-balance mb-8">
              Franchise With Us
            </p>
            <p className="heading2 font-serif text-2xl font-medium leading-relaxed mb-4"> Partner with a Growing Restaurant Brand</p>
            <p className="heading2 leading-relaxed">
              We are excited to invite passionate entrepreneurs and investors to
              become part of our growing restaurant family. Our brand is built
              on quality food, exceptional service, and a proven business model
              designed for long-term success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 border secondary_border transition-colors rounded-lg"
              >
                <benefit.icon className="w-8 h-8 mb-4 heading2" />
                <h3 className="font-serif text-xl mb-2 heading2">
                  {benefit.title}
                </h3>
                <p className="heading2 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
