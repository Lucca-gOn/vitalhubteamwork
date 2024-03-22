import axios from 'axios';

//Declarar a porta da api, mesma porta da api do Swagger
const portaApi = '4466';

//Declara o ip da maquina
const ip = '192.168.21.124';

// Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//Configurar o axios
const api = axios.create({
  baseURL: apiUrlLocal
})

export default api;