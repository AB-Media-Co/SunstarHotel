import { useEffect, useState, useMemo } from "react";
import CountUp from "react-countup";
import { getOwnersStatsAPI } from "../../../ApiHooks/dev-owners-stats";

const LiveBanner = () => {
  const [statsData, setStats] = useState({
    approvedCount: 0,
    rejectedCount: 0,
    revivedCount: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getOwnersStatsAPI(); // should return pure stats object
        setStats({
          approvedCount: Number(data?.approvedCount) || 0,
          rejectedCount: Number(data?.rejectedCount) || 0,
          revivedCount: Number(data?.revivedCount) || 0,
        });
      } catch (e) {
        console.error("Failed to fetch owners stats:", e);
      }
    })();
  }, []);

  const cards = useMemo(
    () => [
      {
        icon: "/images/othericons/Deals.svg",
        number: statsData.revivedCount,
        prefix: "Deal",
        status: "Revived",
      },
      {
        icon: "/images/othericons/rejected.svg",
        number: statsData.rejectedCount,
        prefix: "Deal",
        status: "Rejected",
      },
      {
        icon: "/images/othericons/DealApprove.svg",
        number: statsData.approvedCount,
        prefix: "Deal",
        status: "Approved",
      },
    ],
    [statsData]
  );

  return (
    <div className="bg-[#FFC60D] w-full">
      <div className="md:max-w-screen-xl flex-wrap md:mx-auto py-4 md:py-6 px-2 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="flex items-center md:justify-center gap-2 md:gap-4 rounded-lg p-3 md:p-4"
            >
              <img
                src={item.icon}
                alt={item.status}
                className="w-10 h-10 md:w-14 md:h-14"
              />
              <div className="flex gap-1 md:gap-2 items-center leading-tight">
                <span className="text-white text-2xl md:text-4xl font-bold tabular-nums">
                  {/* Use CountUp or plain number—your choice */}
                  <CountUp start={0} end={Number(item.number) || 0} duration={1.2} separator="," />
                  {/* {Number(item.number) || 0} */}
                </span>
                <div className="flex gap-1 md:gap-0 md:flex-col">
                  <span className="text-white text-lg md:text-sm font-medium">
                    {item.prefix}
                  </span>
                  <span className="text-white text-lg md:text-sm font-medium">
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveBanner;
