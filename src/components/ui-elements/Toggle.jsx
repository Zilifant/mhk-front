// Toggle Switch

import '../../styles/toggle.scss';

const Toggle = ({
  className,
  onChange
}) => {

return (
  <label className={`toggle-bg ${className}`}>
    <input
      type='checkbox'
      onChange={onChange}
    />
    <div className='toggle-fg preload'/>
  </label>
);

};

export default Toggle;