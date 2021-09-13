import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/buttons.scss';

const Button = ({
  className,
  href,
  to,
  exact,
  children,
  type,
  onClick,
  disabled
}) => {

  if (href) {
    return (
      <a
        className={`btn btn--a btn--${className}`}
        href={href}
      >
        {children}
      </a>
    );
  };

  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`btn btn--link btn--${className}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <button
      className={`btn btn--${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

};

export default Button;
