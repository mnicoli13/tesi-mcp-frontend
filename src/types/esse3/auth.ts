// types/esse3/auth.ts

import { ValueWrapper } from "./common";

export interface Esse3LoginResponse {
  authToken: string;
  credentials: Esse3Credentials;
  expPwd: boolean;
  internalAuthToken: string;
  profili: any[];
  user: Esse3User;
}

export interface Esse3Credentials {
  jwtKeyId: string | null;
  kind: ValueWrapper; // { value: "BASIC" }
  profile: any | null;
  user: string;
}

export interface Esse3User {
  aliasName: string;
  codFis: string;
  docenteId: number | null;
  firstName: string;
  grpDes: string;
  grpId: number;
  id: number;
  idAb: number | null;
  lastName: string;
  persId: number;
  sessionTimeout: number;
  sex: string;
  soggEstId: number | null;
  tipoFirmaFaId: number;
  tipoFirmaId: number;
  trattiCarriera: TrattoCarriera[];
  userId: string;
}

export interface TrattoCarriera {
  cdsDes: string;
  cdsId: number;
  dettaglioTratto: DettaglioTratto;
  matId: number;
  matricola: string;
  motStastuCod: string;
  motStastuDes: string;
  staMatCod: string;
  staMatDes: string;
  staStuCod: string;
  staStuDes: string;
  stuId: number;
}

export interface DettaglioTratto {
  aaIscrId: number;
  aaOrdId: number;
  aaRegId: number;
  anniFC: number;
  annoCorso: number;
  cdsCod: string;
  cdsId: number;
  condFlg: number;
  domiscrFlg: number;
  durataAnni: number;
  facCod: string;
  facId: number;
  iscrId: number;
  matId: number;
  mobilFlg: number;
  motStaiscrCod: string;
  motStamatCod: string;
  motStastuCod: string;
  normId: number;
  notaBloccanteFlg: number;
  passaggioFlg: number | null;
  pdsCod: string;
  pdsId: number;
  profCod: string;
  ptFlg: number;
  staIscrCod: string;
  staMatCod: string;
  staStuCod: string;
  stuId: number;
  tipoCatAmmId: number | null;
  tipoCorsoCod: string;
  tipoIscrCod: string;
  tipoSpecCod: string;
  ultimoAnnoFlg: number;
}

export interface Esse3JwtLoginResponse {
  jwt: string;
}
