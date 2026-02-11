export function FloatingShapes() {
  return (
    <>
      {/* Background pattern - subtle dots */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #64748B 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top left circle */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#8B5CF6] rounded-full opacity-10 animate-float"></div>

        {/* Top right triangle */}
        <div
          className="absolute top-32 right-16 opacity-10 animate-float"
          style={{
            animationDelay: "0.5s",
            animationDuration: "4s",
          }}
        >
          <div className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[140px] border-b-[#F472B6]"></div>
        </div>

        {/* Middle left square */}
        <div
          className="absolute top-1/2 -left-16 w-40 h-40 bg-[#FBBF24] opacity-10 rotate-45 animate-float"
          style={{
            animationDelay: "1s",
            animationDuration: "5s",
          }}
        ></div>

        {/* Bottom right circle */}
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#34D399] rounded-full opacity-10 animate-float"
          style={{
            animationDelay: "1.5s",
            animationDuration: "6s",
          }}
        ></div>

        {/* Small circles scattered */}
        <div
          className="absolute top-1/4 left-1/4 w-12 h-12 bg-[#F472B6] rounded-full opacity-20 animate-float"
          style={{
            animationDelay: "2s",
            animationDuration: "3s",
          }}
        ></div>

        <div
          className="absolute top-3/4 right-1/3 w-16 h-16 bg-[#8B5CF6] rounded-full opacity-20 animate-float"
          style={{
            animationDelay: "2.5s",
            animationDuration: "4.5s",
          }}
        ></div>

        <div
          className="absolute top-1/3 right-1/4 w-10 h-10 bg-[#FBBF24] rounded-full opacity-20 animate-float"
          style={{
            animationDelay: "3s",
            animationDuration: "5.5s",
          }}
        ></div>

        {/* Squiggle line decoration - top */}
        <svg
          className="absolute top-24 left-1/4 w-48 h-24 opacity-20"
          viewBox="0 0 200 100"
          fill="none"
          style={{ animationDelay: "0.5s" }}
        >
          <path
            d="M10 50 Q 40 20, 70 50 T 130 50 T 190 50"
            stroke="#8B5CF6"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Squiggle line decoration - bottom */}
        <svg
          className="absolute bottom-32 right-1/4 w-48 h-24 opacity-20"
          viewBox="0 0 200 100"
          fill="none"
          style={{ animationDelay: "1s" }}
        >
          <path
            d="M10 50 Q 40 80, 70 50 T 130 50 T 190 50"
            stroke="#34D399"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Confetti pieces */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {/* Small triangles */}
          <div
            className="absolute top-[20%] left-[15%] opacity-30 animate-float"
            style={{
              animationDelay: "0.3s",
              animationDuration: "4s",
            }}
          >
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-[#F472B6]"></div>
          </div>

          <div
            className="absolute top-[60%] left-[80%] opacity-30 animate-float"
            style={{
              animationDelay: "1.2s",
              animationDuration: "3.5s",
            }}
          >
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-[#FBBF24]"></div>
          </div>

          <div
            className="absolute top-[40%] left-[70%] opacity-30 animate-float"
            style={{
              animationDelay: "2s",
              animationDuration: "5s",
            }}
          >
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-[#34D399]"></div>
          </div>

          {/* Small squares */}
          <div
            className="absolute top-[70%] left-[25%] w-6 h-6 bg-[#8B5CF6] opacity-30 rotate-12 animate-float"
            style={{
              animationDelay: "0.8s",
              animationDuration: "4.5s",
            }}
          ></div>

          <div
            className="absolute top-[35%] left-[90%] w-5 h-5 bg-[#F472B6] opacity-30 rotate-45 animate-float"
            style={{
              animationDelay: "1.5s",
              animationDuration: "3.8s",
            }}
          ></div>
        </div>

        {/* Large blob shape behind content - left side */}
        <div
          className="absolute top-1/4 -left-32 w-80 h-80 bg-gradient-to-br from-[#8B5CF6]/10 to-[#F472B6]/10 opacity-50 animate-float"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            animationDuration: "8s",
          }}
        ></div>

        {/* Large blob shape - right side */}
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-[#FBBF24]/10 to-[#34D399]/10 opacity-50 animate-float"
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            animationDuration: "7s",
            animationDelay: "1s",
          }}
        ></div>
      </div>
    </>
  );
}