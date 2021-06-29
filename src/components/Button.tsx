import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

// Passando para o botão todas as propriedades que ele pode receber
// & = todas as propriedades, +
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`}
     {...props} 
    />
  );
}