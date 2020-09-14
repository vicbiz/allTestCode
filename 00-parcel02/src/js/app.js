import regeneratorRuntime from "regenerator-runtime";
import User from "./components/User";

const app = async () => {
  document.getElementById("user").innerHTML = await User();
};

// Init
app();

document.getElementById("getUserBtn").addEventListener("click", app);
