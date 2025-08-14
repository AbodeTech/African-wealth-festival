import LandingOpenRegister from "@/component/lanndingpage/openRegister";
export default function LandingPage() {
  return (
    <div className="flex justify-center items-center h-[calc(100%-64px)]">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            AFRICA WEALTH FESTIVAL 2025
          </h1>
          <p
            className="text-2xl md:text-3xl text-orange-400 mb-8 font-medium drop-shadow-lg
"
          >
            Where Africa&apos;s Wealth Creators Meet, Connect & Grow
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg text-gray-100 mb-12">
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-500/30">
              <div className="w-3 h-3 bg-orange-500 rounded-full drop-shadow-lg"></div>
              <span className="font-medium drop-shadow-md">
                Saturday, September 27, 2025
              </span>
            </div>

            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-500/30">
              <div className="w-3 h-3 bg-primary rounded-full drop-shadow-lg"></div>
              <span className="font-medium drop-shadow-md">
                Pistis Maryland, Lagos
              </span>
            </div>
          </div>
          <LandingOpenRegister
            label="Get Your FREE Ticket Now"
            className="py-4 px-10 transition-all duration-300 transform hover:scale-105 hover:border-accent"
          />
          <p className="text-gray-300 text-sm mt-6 font-light drop-shadow-2xl tracking-wide">
            Limited seats available • Free admission • Networking opportunities
          </p>
        </div>
      </section>
    </div>
  );
}
