import Icon from "./Icons";

/* eslint-disable react/prop-types */
const CommonButton = ({ className = '' }) => {
    return (
        <button className={`w-full rounded-t-none bg-[#FDC114] text-white py-2 mt-4 rounded-lg flex items-center justify-center space-x-2 ${className}`}>
            <span className="text-[#058FA2] font-bold text-xl">
                Book Now
            </span>
            <div className="bg-[#058FA2] rounded-full p-2">
                {/* <img
                    src="/images/HomepageImages/UpArrow.svg"
                    alt=""
                    className="w-3 h-3"
                /> */}
                <Icon name="upArrow" className=" w-3 h-3" />

            </div>
        </button>
    )
}

export default CommonButton;
