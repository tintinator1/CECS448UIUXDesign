export default function AppButton({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  onClick,
  ariaLabel,
}) {
  const variantClass = {
    primary: "primary-button",
    secondary: "secondary-button",
    small: "small-button",
    add: "add-course-button",
  }[variant];

  return (
    <button
      type={type}
      className={`${variantClass} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
