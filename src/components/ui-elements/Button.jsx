import React from 'react';
import { Link } from 'react-router-dom';
// import styles from '../styles/Button.module.scss';
// import '../styles/Button.scss'

const Button = props => {
  if (props.href) {
    return (
      <a
        // className={`${styles.btn}`}
        className={`btn btn--${props.className}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  };
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        // className={`${styles.btn} ${styles['btn-dash']}`}
        className={`btn btn--${props.className}`}
      >
        {props.children}
      </Link>
    );
  };
  return (
    <button
      // className={`${styles.btn}`}
      className={`btn btn--${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// // import '../styles/Button.scss';

// // tagged template-literal, standard javascript
// // `button` is a method on the `styled` object that will return a new component with the style provided in the backticks
// const StyledButton = styled.button`
//   -webkit-appearance: none;
//      -moz-appearance: none;
//           appearance: none;
//   background-color: rgba(8,145,178,1);
//   color: rgba(255,255,255,1);
//   padding: .5rem 1rem;
//   border: 3px solid rgba(8,145,178,1);
//   border-radius: 0;
//   margin: .5rem;
//   text-transform: uppercase;

//   &:hover {
//     background-color: rgba(6,182,212,1);
//     border: 3px solid rgba(6,182,212,1);
//   }

//   &:active {
//     background-color: rgba(236,72,153,1);
//     border: 3px solid rgba(236,72,153,1);
//     outline: none;
//   }

//   &:focus { outline: none; }
//   &:disabled,
//   &:hover:disabled,
//   &:active:disabled {
//     background: #ccc;
//     color: #979797;
//     border-color: #ccc;
//     cursor: not-allowed;
//   }
// `;

// const Button = props => {
//   if (props.href) {
//     return (
//       
//         <a
//           // className={`btn btn--${props.className}`}
//           href={props.href}
//         >
//           {props.children}
//         </a>
//       
//     );
//   }
//   if (props.to) {
//     return (
//       
//         <Link
//           to={props.to}
//           exact={props.exact}
//           // className={`btn btn--${props.className}`}
//         >
//           {props.children}
//         </Link>
//       
//     );
//   }
//   return (
//     <StyledButton
//       // className={`btn btn--${props.className}`}
//       type={props.type}
//       onClick={props.onClick}
//       disabled={props.disabled}
//     >
//       {props.children}
//     
//   );
// };

// export default Button;
