import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import {
  esse3FetchVotes,
  esse3Login,
  esse3LoginJWT,
} from "../../api/esse3/esse3";

export interface Esse3LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

// Schema di validazione
const schema = yup.object({
  username: yup.string().required("Username richiesto."),
  password: yup
    .string()
    .min(6, "La password deve avere almeno 6 caratteri.")
    .required("Password richiesta."),
  remember: yup.boolean().required(),
});

export function useEsse3LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<Esse3LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const togglePassword = () => setShowPassword((s) => !s);

  const onSubmit = async (values: Esse3LoginFormValues) => {
    console.log("Login attempt", values);

    try {
      const loginResponse = await esse3Login({
        username: values.username,
        password: values.password,
      });

      const mat_id = loginResponse.user.trattiCarriera[0].matId;

      const loginJWTResponse = await esse3LoginJWT({
        username: values.username,
        password: values.password,
      });

      const jwt = loginJWTResponse.jwt;

      const votes = await esse3FetchVotes({
        mat_id: mat_id,
        jwt: jwt,
      });

      console.log("votes: ", votes);
      enqueueSnackbar("Login effettuato con successo.", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar("Errore durante il login.", { variant: "error" });
    }
  };

  return {
    ...form,
    showPassword,
    togglePassword,
    onSubmit,
  };
}
