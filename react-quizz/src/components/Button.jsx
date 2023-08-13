function Button({ children, className, onClick, disable }) {
  return (
    <button className={className} onClick={onClick} disabled={disable}>
      {children}
    </button>
  );
}

export default Button;
