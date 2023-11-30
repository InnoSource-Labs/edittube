const HeroLeft = () => {
  return (
    <div className="w-4/5 mx-auto md:w-1/2   self-center">
      <div className="pb-5 ">
        <h1 className="font-semibold text-3xl md:text-5xl lg:text-7xl">
          Make your Video
          <br />
          flow smoother
        </h1>
        <h2 className="font-medium text-xl text-gray-600 tracking-wide pt-5">
          Approve new video from the comfort of your <br />
          home or anywhere anytime.
        </h2>
      </div>
      <div className=" md:w-full  flex flex-col md:flex-row gap-4 md:gap-7 text-center">
        <div className="bg-[#276678] text-white px-4 py-2 border-2 rounded-md">
          Get Started
        </div>
        <div className="bg-[#276678] text-white px-4 py-2 border-2 rounded-md">
          Become an Editor
        </div>
      </div>
    </div>
  );
};

export default HeroLeft;
