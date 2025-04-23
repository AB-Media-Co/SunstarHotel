const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
      <img 
        src="/images/Logo/spinner.svg" 
        alt="Loading" 
        loading="lazy" 
        className="md:w-60 md:h-60 h-20 w-20" 
      />
    </div>
  );
};

export default Loader;
