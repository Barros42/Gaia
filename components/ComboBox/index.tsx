import {
  Dispatch,
  SelectHTMLAttributes,
  SetStateAction,
  useCallback,
} from 'react';
import ISelectOptionsEntity from '../../core/entities/SelectOptionsEntity';
import style from './style.module.scss';

interface ComboBoxProps extends React.HTMLAttributes<HTMLSelectElement> {
  placeHolder: string;
  selectedState: Dispatch<SetStateAction<any>>;
  options: ISelectOptionsEntity[];
}

const ComboBox = ({
  placeHolder,
  options,
  selectedState,
  ...rest
}: ComboBoxProps) => {
  const selectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      selectedState(value);
    },
    [selectedState],
  );

  return (
    <label className={style.label}>
      <select onChange={selectChange} defaultValue="" {...rest}>
        <option value="" disabled>
          {placeHolder}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ComboBox;
