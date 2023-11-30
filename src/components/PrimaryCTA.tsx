import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
  link?: string;
  onClick?: () => void;
}

const PrimaryCTA: React.FC<Props> = ({ text, link, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#276678] text-white px-4 py-2 rounded-md text-md hover:bg-[#1687A7] transition"
    >
      {text}
    </button>
  );
};

export default PrimaryCTA;
