import axios from "axios";
import https from "https";
import {
  Esse3JwtLoginResponse,
  Esse3LoginResponse,
  LibrettoResponse,
} from "../../types/esse3";

const esse3_base_url = "http://localhost:8080";

export type Esse3LoginProps = {
  username: string;
  password: string;
};

export type Esse3FetchVotesProps = {
  mat_id: number;
  jwt: string;
};

export const esse3Login = async ({
  username,
  password,
}: Esse3LoginProps): Promise<Esse3LoginResponse> => {
  try {
    console.log("esse3Login: ");
    console.log("username: ", username);
    console.log("password: ", password);

    const response = await axios.post(`${esse3_base_url}/esse3/login`, {
      username,
      password,
    });

    console.log("response: ", response);
    console.log("response.data: ", response.data);

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorData =
      error instanceof Error && "response" in error
        ? (error as any).response?.data
        : null;
    console.error("ESSE3 login error:", errorData || errorMessage);
    throw error;
  }
};

export const esse3LoginJWT = async ({
  username,
  password,
}: Esse3LoginProps): Promise<Esse3JwtLoginResponse> => {
  try {
    console.log("esse3LoginJWT: ");
    console.log("username: ", username);
    console.log("password: ", password);

    const response = await axios.post(`${esse3_base_url}/esse3/loginJWT`, {
      username,
      password,
    });

    console.log("response: ", response);
    console.log("response.data: ", response.data);

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorData =
      error instanceof Error && "response" in error
        ? (error as any).response?.data
        : null;
    console.error("ESSE3 login JWT error:", errorData || errorMessage);
    throw error;
  }
};

export const esse3FetchVotes = async ({
  mat_id,
  jwt,
}: Esse3FetchVotesProps): Promise<LibrettoResponse> => {
  try {
    console.log("esse3FetchVotes: ");
    console.log("mat_id: ", mat_id);
    console.log("jwt: ", jwt);

    const response = await axios.post(`${esse3_base_url}/esse3/votes`, {
      mat_id,
      jwt,
    });

    console.log("response: ", response);
    console.log("response.data: ", response.data);

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorData =
      error instanceof Error && "response" in error
        ? (error as any).response?.data
        : null;
    console.error("ESSE3 fet votes error:", errorData || errorMessage);
    throw error;
  }
};
