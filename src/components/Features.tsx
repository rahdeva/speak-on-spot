import { Zap, Target, TrendingUp, Brain } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Topics",
    description:
      "Get random speaking topics in seconds. No preparation needed, just like real impromptu speaking scenarios.",
    color: "#8B5CF6",
    shadowColor: "#8B5CF6",
  },
  {
    icon: Target,
    title: "Timed Practice",
    description:
      "Track your speaking time with an easy-to-use timer. Build stamina and learn to structure your thoughts quickly.",
    color: "#F472B6",
    shadowColor: "#F472B6",
  },
  {
    icon: TrendingUp,
    title: "Build Confidence",
    description:
      "Practice regularly to overcome fear of public speaking. Every session makes you more comfortable and articulate.",
    color: "#FBBF24",
    shadowColor: "#FBBF24",
  },
  {
    icon: Brain,
    title: "Think On Your Feet",
    description:
      "Develop the crucial skill of organizing thoughts instantly. Perfect for interviews, presentations, and daily conversations.",
    color: "#34D399",
    shadowColor: "#34D399",
  },
];

export function Features() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F472B6] rounded-full border-2 border-foreground mb-6 shadow-[3px_3px_0px_0px_#1E293B] animate-pop-in">
            <span className="text-sm font-bold uppercase tracking-wide">
              Why Practice Here?
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Master the Art of
            <span className="relative inline-block ml-3">
              <span className="relative z-10">Speaking</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                style={{ animationDelay: "0.3s" }}
              >
                <path
                  d="M2 10C50 4 100 2 198 8"
                  stroke="#FBBF24"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Impromptu speaking is a superpower. Practice it
            daily and watch your communication skills soar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border-2 border-foreground rounded-3xl p-8 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:-rotate-1 animate-pop-in"
                style={{
                  boxShadow: `8px 8px 0px 0px ${feature.shadowColor}`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Icon circle - floating half out of the card */}
                <div
                  className="relative -mt-16 mb-6 w-20 h-20 rounded-full border-2 border-foreground flex items-center justify-center transition-transform duration-300 group-hover:animate-wiggle"
                  style={{ backgroundColor: feature.color }}
                >
                  <Icon
                    className="size-10 text-white"
                    strokeWidth={2.5}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-extrabold mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative dot */}
                <div
                  className="absolute top-8 right-8 w-4 h-4 rounded-full opacity-50"
                  style={{ backgroundColor: feature.color }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div
            className="inline-block bg-white border-2 border-foreground rounded-2xl p-8 shadow-[6px_6px_0px_0px_#34D399] animate-pop-in"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-2xl font-bold mb-2">
              Ready to become a better speaker?
            </p>
            <p className="text-lg text-muted-foreground">
              Scroll back up and generate your first topic! 🎤
            </p>
          </div>
        </div>
      </div>

      {/* Decorative connecting lines (subtle) */}
      <svg
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 pointer-events-none opacity-20 hidden lg:block"
        style={{ zIndex: -1 }}
      >
        <path
          d="M100 50 Q 200 100 300 50"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeDasharray="10 5"
          fill="none"
        />
        <path
          d="M300 100 Q 400 150 500 100"
          stroke="#F472B6"
          strokeWidth="2"
          strokeDasharray="10 5"
          fill="none"
        />
      </svg>
    </section>
  );
}