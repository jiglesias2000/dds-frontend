import httpService from "./http.service";
import { config } from "../config";
import modalService from "./modalDialog.service";



const login = async (usuario, clave, navigate) => {
  let resp = await httpService.post(config.urlServidor + "/api/login", {
    usuario,
    clave,
  });

  if (resp.data?.accessToken) {
    sessionStorage.setItem("usuarioLogueado", usuario);
    sessionStorage.setItem("accessToken", resp.data.accessToken);
    sessionStorage.setItem("refreshToken", resp.data.refreshToken);
    if (setUsuarioLogueado) setUsuarioLogueado(usuario);
    navigate("/Inicio");
  } else {
    if (setUsuarioLogueado) setUsuarioLogueado(null);
    //alert("Usuario o clave incorrectos");
    modalService.Alert("Usuario o clave incorrectos");
  }
};

const logout = () => {
  sessionStorage.removeItem("usuarioLogueado");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  if (setUsuarioLogueado) setUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
  return sessionStorage.getItem("usuarioLogueado");
};

const AuthService = {
  login,
  logout,
  getUsuarioLogueado,
};

let setUsuarioLogueado = null;
AuthService.config = (x) => (setUsuarioLogueado = x);

export default AuthService;
