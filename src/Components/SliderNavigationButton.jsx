/* eslint-disable react/prop-types */
import Icon from "./Icons";

const SliderNavigationButton = ({ direction, onClick, disabled }) => {
    const iconSrc =
        direction === "prev"
            ? <Icon name="leftIcon" />


            : <Icon name="rightIcon" />

    return (
        <button
            className={`bg-primary-yellow text-primary-white p-4 rounded-full ${disabled ? "opacity-50 bg-gray-500" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            <img src={iconSrc} alt={direction} className="h-6 w-6" />
        </button>
    );
};

export default SliderNavigationButton;
