import axios from "axios";
import enviroment from "../enviroment";

export async function getUser(token?: string) {
  try {
    const res = await axios.get(`${enviroment.server_url}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
