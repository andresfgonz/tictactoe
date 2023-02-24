import { FC, useCallback } from 'react';
import styles from './form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ObjectShape } from 'yup';

type FormValues = {
  player1: string;
  player2: string;
};

const initialValues: FormValues = {
  player1: '',
  player2: '',
};

const validationSchema = Yup.object().shape({
  player1: Yup.string().required('Required field'),
  player2: Yup.string().required('Required field'),
});

export type ComponentProps = {
  setPlayers: (player1Name: string, player2Name: string) => void;
};

export const PlayersForm: FC<ComponentProps> = ({ setPlayers }) => {
  const handleSubmit = useCallback(
    (values: FormValues) => {
      setPlayers(values.player1, values.player2);
    },
    [setPlayers],
  );

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={form.handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="player1">Player 1 Name</label>
          <input
            id="player1"
            data-testid="player1input"
            name="player1"
            type="text"
            onChange={form.handleChange}
            value={form.values.player1}
          />
          <div className={styles.errorMessageContainer}>
            <p>{form.errors.player1}</p>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="player2">Player 2 Name</label>
          <input
            id="player2"
            data-testid="player2input"
            name="player2"
            type="text"
            onChange={form.handleChange}
            value={form.values.player2}
          />
          <div className={styles.errorMessageContainer}>
            <p>{form.errors.player2}</p>
          </div>
        </div>
        <button type="submit" className={styles.submitButton} data-testid="submitButton">
          Start!
        </button>
      </form>
    </div>
  );
};
