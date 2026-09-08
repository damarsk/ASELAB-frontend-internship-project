type ButtonProps = {
  variant?: "solid" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant = "solid",
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";

  const variantStyles = {
    solid: "bg-brand-primary text-white hover:bg-brand-primary-hover",
    outline:
      "border border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary-light",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
