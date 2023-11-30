import PrimaryCTA from "../../components/PrimaryCTA";
import { useUserAuthContext } from "../../providers/UserAuthProvider";

const HeroLeft = () => {
  const { login, isAuthenticated } = useUserAuthContext();

  return (
    <div className="w-4/5 lg:w-1/2 mx-auto self-center">
      <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl">
        Streamline your YouTube workflow
      </h1>
      <h2 className="font-medium text-base md:text-xl lg:text-2xl text-gray-600 tracking-wide py-5">
        Review and Publish videos directly from the Editors, from your comfort.
        No download is needed!
      </h2>
      {isAuthenticated ? (
        <PrimaryCTA text="Get Started" link="/home" />
      ) : (
        <PrimaryCTA text="Login" onClick={login} />
      )}
    </div>
  );
};

export default HeroLeft;
