import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

// Passando para o botão todas as propriedades que ele pode receber
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props} />
  );
}