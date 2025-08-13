import { Link } from "react-router-dom";
import { useGetUserByEmail } from "../../../ApiHooks/useUser";

const LoyaltyProgramHeader = () => {
  const userEmail = localStorage.getItem("user_email");
  const { data: userData } = useGetUserByEmail(userEmail);

  const stays = Number(userData?.data?.totalBookings) || 0;

  // Try to build a friendly display name; fall back to email prefix or "Guest"
  const displayName =
    [userData?.data?.firstName, userData?.data?.lastName].filter(Boolean).join(" ") ||
    userData?.data?.fullName ||
    (userEmail ? userEmail.split("@")[0] : "Guest");

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col pt-24 content md:flex-row items-start md:items-center justify-between bg-gray-50 p-8">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-mobile/h3 md:text-desktop/h2 font-bold text-primary-green mb-2">
            Join Sunstar Rewards.
          </h1>
          <p className="text-gray-500 max-w-md">
            Sunstar’s loyalty program for frequent travelers—earn perks and exclusive
            benefits every time you stay with us.
          </p>
        </div>

        {/* Right Section (Card) */}
        <div className="bg-white border shadow-lg border-gray-100 rounded-xl flex flex-col w-80">
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-3">
              <span className="text-primary-green font-semibold text-xl">Sunstar</span>
              <span className="text-primary-green font-semibold">{displayName}</span>
            </div>

            <div className="flex justify-center">
              {/* Swap this asset for your Sunstar illustration if available */}
              <img
                src="/images/sunstar-loyalty-illustration.svg"
                alt="Sunstar Rewards"
                className="h-[100px]"
                onError={(e) => {
                  // Fallback to the existing illustration if the Sunstar one isn't present yet
                  e.currentTarget.src = "/images/loyalty-illustration.svg";
                }}
              />
            </div>
          </div>

          <Link
            to="/user/profile"
            state={{ tab: "loyalty" }}
            className="bg-primary-green cursor-pointer rounded-b-xl px-6 py-4 flex justify-between items-center text-white font-medium"
          >
            <span>{stays} Stays &gt;</span>
            <span>See your benefits</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgramHeader;
