// types/esse3/libretto.ts

import { ModValCod, Stato } from "./common";

/**
 * La response del libretto è un array di LibrettoRiga
 */
export type LibrettoResponse = LibrettoRiga[];

export interface LibrettoRiga {
  aaFreqId: number;
  abilFlg: number;
  adCod: string;
  adDes: string;
  adsceId: number;
  annoCorso: number;
  annoCorsoAnticipo: number | null;
  chiaveADContestualizzata: ChiaveADContestualizzata;
  dataFreq: string;
  dataScadIscr: string;
  esito: Esito;
  freqObbligFlg: number | null;
  freqUffFlg: number;
  genConvAdsceId: number | null;
  gruppoGiudCod: string;
  gruppoGiudDes: string;
  gruppoVotoId: number;
  gruppoVotoLodeFlg: number;
  gruppoVotoMaxVoto: number;
  gruppoVotoMinVoto: number;
  itmId: number;
  matId: number;
  note: string;
  numAppelliPrenotabili: number;
  numPrenotazioni: number;
  ord: number;
  peso: number;
  pianoId: number;
  ragId: number | null;
  raggEsaTipo: string | null;
  ricId: number;
  sovranFlg: number;
  stato: Stato;
  statoDes: string;
  stuId: number;
  superataFlg: number;
  tipoEsaCod: string;
  tipoEsaDes: string;
  tipoInsCod: string;
  tipoInsDes: string;
  tipoRicCod: string;
}

/**
 * La chiave che contestualizza un insegnamento
 */
export interface ChiaveADContestualizzata {
  aaOffId: number;
  aaOrdCod: string;
  aaOrdDes: string;
  aaOrdId: number;
  adCod: string;
  adDes: string;
  adId: number;
  afId: number | null;
  cdsCod: string;
  cdsDes: string;
  cdsId: number;
  pdsCod: string;
  pdsDes: string;
  pdsId: number;
}

/**
 * Informazioni sull'esito (voto, idoneità, data esame)
 */
export interface Esito {
  aaSupId: number | null;
  dataEsa: string;
  lodeFlg: number;
  modValCod: ModValCod;
  supEsaFlg: number;
  tipoGiudCod: string;
  tipoGiudDes: string;
  voto: number | null;
}
