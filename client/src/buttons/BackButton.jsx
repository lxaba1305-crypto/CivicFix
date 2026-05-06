import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function BackButton({ fallback = "/dashboard", label = "Back" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-sm text-stone-500 hover:text-green-600 transition cursor-pointer"
    >
      <FaArrowLeft className="text-base" />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;