import { jwtDecode } from "jwt-decode";

/**
 * Interfaccia per il payload del JWT
 */
interface JWTPayload {
  exp: number; // Timestamp di scadenza (in secondi)
  iat?: number; // Timestamp di creazione
  sub?: string; // Subject (user ID)
  [key: string]: any;
}

/**
 * Controlla se un token JWT sta per scadere
 * @param token - Token JWT da controllare
 * @param bufferMinutes - Minuti di buffer prima della scadenza (default: 5)
 * @returns True se il token sta per scadere entro il buffer specificato
 */
export function isTokenExpiringSoon(
  token: string,
  bufferMinutes: number = 5
): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);

    if (!decoded.exp) {
      // Se non c'è exp, consideriamo il token come scaduto
      return true;
    }

    const expirationTime = decoded.exp * 1000; // Converti in millisecondi
    const now = Date.now();
    const bufferMs = bufferMinutes * 60 * 1000;

    // Ritorna true se mancano meno di bufferMinutes alla scadenza
    return expirationTime - now < bufferMs;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    // In caso di errore nella decodifica, consideriamo il token come scaduto
    return true;
  }
}

/**
 * Controlla se un token JWT è scaduto
 * @param token - Token JWT da controllare
 * @returns True se il token è scaduto
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);

    if (!decoded.exp) {
      return true;
    }

    const expirationTime = decoded.exp * 1000;
    const now = Date.now();

    return now >= expirationTime;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return true;
  }
}

/**
 * Decodifica un token JWT e restituisce il payload
 * @param token - Token JWT da decodificare
 * @returns Payload del token o null in caso di errore
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
