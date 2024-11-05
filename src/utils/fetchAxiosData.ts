import axios, { isAxiosError } from "axios";

// funzione reutilizzabile per effettuare una richiesta HTTP GET utilizzando axios
export const fetchAxiosData = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response) {
        throw `${err.response.status} - ${
          err.response.data.message || "Qualcosa è andato storto"
        }`;
      } else if (err.request) {
        throw "Errore di rete: nessuna risposta dal server";
      } else {
        throw err.message;
      }
    } else {
      throw err instanceof Error
        ? err.message
        : "Si è verificato un errore sconosciuto";
    }
  }
};
