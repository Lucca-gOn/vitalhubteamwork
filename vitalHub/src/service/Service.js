import axios from 'axios';

//Declarar a porta da api, mesma porta da api do Swagger
const portaApi = '4466';

//Declara o ip da maquina
const ip = '192.168.21.126';

//Allan Casa -> 192.168.15.16
//Allan Escola -> 192.168.21.50
//Lucas Casa -> 192.168.0.11
//Lucas Senai -> 192.168.21.126

// Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//Configurar o axios
const api = axios.create({
  baseURL: apiUrlLocal
})

export default api;