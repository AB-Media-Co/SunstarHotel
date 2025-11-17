const Description = ({ descCard }) => {
  return (
    <div className="content py-10  ">

      <h2 className="text-mobile/h3 md:text-desktop/h3  font-bold mb-4">{descCard?.heading}</h2>
      <p className="text-mobile/body/2 md:text-desktop/body/1 mb-4">
        {descCard?.description}
      </p>
      <p className="text-mobile/body/2 md:text-desktop/body/1 font-semibold">
        Discover flexibility, comfort, and convenience right when you need it.{" "}
        <span className="font-bold">Book your Day Use Room today!</span>
      </p>
    </div>
  );
};

export default Description;
