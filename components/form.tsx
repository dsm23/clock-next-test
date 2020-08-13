import {
  ChangeEventHandler,
  Dispatch,
  FormHTMLAttributes,
  FunctionComponent,
  SetStateAction,
} from 'react';

import styles from '../styles/Form.module.scss';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  criteria: string;
  liftState: Dispatch<SetStateAction<string>>;
}

const FormSearchCriteria: FunctionComponent<Props> = ({
  criteria,
  liftState,
  ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
    liftState(event.currentTarget.value);

  return (
    <form className={styles.form} {...props}>
      <div className={styles.labelSpacing}>
        <label className={styles.label} htmlFor="search-field">
          Search (keywords)
        </label>
      </div>
      <div className={styles.inputSpacing}>
        <input
          className={styles.input}
          id="search-field"
          name="criteria"
          value={criteria}
          onChange={handleChange}
        />
      </div>

      {/* <div>
        <button className={styles.btn} type="submit">
          Search
        </button>
      </div> */}
    </form>
  );
};

export default FormSearchCriteria;
