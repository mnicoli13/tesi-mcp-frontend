import * as yup from 'yup';

/**
 * Schema di validazione Yup per il form di login
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email richiesta')
    .email('Email non valida'),
  password: yup
    .string()
    .required('Password richiesta')
    .min(6, 'La password deve essere di almeno 6 caratteri'),
});

/**
 * Schema di validazione Yup per il form di registrazione
 */
export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Nome richiesto')
    .min(2, 'Il nome deve essere di almeno 2 caratteri'),
  lastName: yup
    .string()
    .required('Cognome richiesto')
    .min(2, 'Il cognome deve essere di almeno 2 caratteri'),
  email: yup
    .string()
    .required('Email richiesta')
    .email('Email non valida'),
  password: yup
    .string()
    .required('Password richiesta')
    .min(6, 'La password deve essere di almeno 6 caratteri')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[0-9])/,
      'La password deve contenere almeno 2 tra: maiuscola, minuscola, numero'
    ),
  confirmPassword: yup
    .string()
    .required('Conferma password richiesta')
    .oneOf([yup.ref('password')], 'Le password non corrispondono'),
});

/**
 * Type inference dai schemas
 */
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
