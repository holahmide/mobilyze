import { ChangeEventHandler, FC, MouseEvent } from 'react';
import './styles.css';

interface InputProps {
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  required?: boolean;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  name: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({
  autoFocus,
  className,
  required = false,
  label,
  name,
  onChange,
  placeholder,
  ...rest
}) => {
  const handleDoubleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      {label ? (
        <label className="custom-input-label" htmlFor={name}>
          {label} <span>*</span>
        </label>
      ) : (
        ''
      )}

      <input
        autoFocus={autoFocus}
        className={`custom-input transition ${className}`}
        defaultValue={label}
        placeholder={placeholder}
        name={name}
        required={required}
        onChange={onChange}
        onDoubleClick={handleDoubleClick}
        {...rest}
      />
    </div>
  );
};

export default Input;
