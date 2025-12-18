/* eslint-disable react/prop-types */
const Loader = ({ fullScreen = true, size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-12 md:w-16 md:h-16",
    md: "w-20 h-20 md:w-32 md:h-32",
    lg: "w-32 w-32 md:w-48 md:h-48"
  };

  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center p-8">
        <img
          src="/images/Logo/spinner.svg"
          alt="Loading"
          className={`${sizeClasses[size]} animate-spin`}
        />
      </div>
    );
  }

  // Fixed overlay for full screen loading
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-center">
        <img
          src="/images/Logo/spinner.svg"
          alt="Loading"
          className={`${sizeClasses[size]} mx-auto animate-spin`}
        />
      </div>
    </div>
  );
};

export default Loader;
