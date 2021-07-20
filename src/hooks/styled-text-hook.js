import { nanoid } from 'nanoid';

export const useStyledText = () => {

  const renderStyledText = (elements, parentCls='styled-text-wrapper') => (
    <div className={parentCls}>
      {elements.map(el => <span key={nanoid()} className={el.style}>{el.text}</span>)}
    </div>
  );

  return {
    renderStyledText
  };
};