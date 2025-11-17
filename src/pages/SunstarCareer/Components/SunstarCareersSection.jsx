import { Mail } from "lucide-react";

export default function SunstarCareersSection({ data }) {
  return (
    <div className="relative bg-primary-green px-8 py-16 overflow-hidden
      pb-[180px] md:pb-[200px] lg:pb-[20px]  /* reserve space for image on mobile */
    ">

      {/* Image - stays absolute ALWAYS, but scales per screen */}
      <img
        src="/images/joinus.svg"
        alt="Join Us"
        className="
          absolute bottom-0 right-1/2 translate-x-1/2 
          w-[240px] sm:w-[300px] md:w-[360px] 
          lg:right-0 lg:translate-x-0 lg:w-[420px] xl:w-[520px]
          pointer-events-none select-none
        "
      />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-mobile/h3 md:text-desktop/h3 text-white leading-tight">
              {data?.heading}
            </h2>

            <p className="text-lg md:text-xl text-white leading-relaxed max-w-lg">
              {data?.description}
            </p>

            <a
              href={`mailto:${data?.email}`}
              className="inline-flex items-center gap-3 text-white hover:underline transition"
            >
              <Mail className="w-6 h-6" />
              <span className="text-sm md:text-lg font-medium">{data?.email}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
