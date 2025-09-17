import axios from "axios";
import { auth } from "/firebaseConfig";

const callBackend = async () => {
  const token = await auth.currentUser.getIdToken();
  const res = await axios.get("http://localhost:8080/api/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(res.data);
};
