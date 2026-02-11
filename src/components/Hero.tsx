import { Sparkles, ArrowRight } from "lucide-react";

interface HeroProps {
  onStartPractice: () => void;
}

export function Hero({ onStartPractice }: HeroProps) {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="relative z-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBBF24] rounded-full border-2 border-foreground mb-6 shadow-[3px_3px_0px_0px_#1E293B] animate-pop-in">
              <Sparkles className="size-4" strokeWidth={2.5} />
              <span className="text-sm font-bold uppercase tracking-wide">
                Practice Makes Perfect
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Speak
              <span className="relative inline-block mx-3">
                <span className="relative z-10">On</span>
                <div className="absolute -inset-2 bg-[#F472B6] -rotate-2 rounded-lg -z-10"></div>
              </span>
              Spot
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Master the art of impromptu speaking. Generate
              random topics, practice with a timer, and build
              your confidence one speech at a time.
            </p>

            {/* Start Practice Button */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onStartPractice}
                className="group relative px-8 py-4 bg-[#8B5CF6] text-white rounded-full border-2 border-foreground font-bold text-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  boxShadow: "4px 4px 0px 0px #1E293B",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "6px 6px 0px 0px #1E293B";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "4px 4px 0px 0px #1E293B";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow =
                    "2px 2px 0px 0px #1E293B";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow =
                    "6px 6px 0px 0px #1E293B";
                }}
              >
                <span className="flex items-center gap-3">
                  Start Practice
                  <div className="size-8 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight
                      className="size-4 text-foreground"
                      strokeWidth={2.5}
                    />
                  </div>
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Decorative visual */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Large yellow circle background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FBBF24] rounded-full opacity-30 animate-float"></div>

            {/* Pink circle */}
            <div className="absolute top-12 right-24 w-32 h-32 bg-[#F472B6] rounded-full border-2 border-foreground shadow-[6px_6px_0px_0px_#1E293B] animate-pop-in"></div>

            {/* Violet square */}
            <div
              className="absolute bottom-24 left-12 w-28 h-28 bg-[#8B5CF6] border-2 border-foreground shadow-[6px_6px_0px_0px_#1E293B] animate-pop-in"
              style={{ animationDelay: "0.1s" }}
            ></div>

            {/* Emerald triangle */}
            <div
              className="absolute top-1/2 right-12 animate-pop-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[86px] border-b-[#34D399]"
                style={{
                  filter: "drop-shadow(6px 6px 0px #1E293B)",
                }}
              ></div>
            </div>

            {/* Small yellow circle */}
            <div
              className="absolute bottom-12 right-32 w-16 h-16 bg-[#FBBF24] rounded-full border-2 border-foreground shadow-[4px_4px_0px_0px_#1E293B] animate-pop-in"
              style={{ animationDelay: "0.3s" }}
            ></div>

            {/* Microphone icon representation */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full border-2 border-foreground shadow-[8px_8px_0px_0px_#8B5CF6] flex items-center justify-center animate-pop-in"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="text-6xl">🎤</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}