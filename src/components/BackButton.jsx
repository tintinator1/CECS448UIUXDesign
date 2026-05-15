import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

export default function BackButton({
  to = -1,
  children = "Back",
  className = "",
  ariaLabel = "Go back",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <AppButton
      variant="secondary"
      className={className}
      onClick={handleClick}
      ariaLabel={ariaLabel}
    >
      {children}
    </AppButton>
  );
}
