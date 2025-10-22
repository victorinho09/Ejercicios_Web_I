const http = require('http');
require('dotenv').config();
const os = require('os');
const ps = require('process');

const PORT = process.env.PORT;
const PERIODO = process.env.PERIODO;
const INFO_PROCESO = process.env.INFO_PROCESO;
const PROCESO_USO_MEMORIA = process.env.PROCESO_USO_MEMORIA;
const PROCESO_ARQ = process.env.PROCESO_ARQ;
const PROCESO_DIR_ACTUAL = process.env.PROCESO_DIR_ACTUAL;
const PROCESO_CPU_USO = process.env.PROCESO_CPU_USO;
const PROCESO_PID = process.env.PROCESO_PID;
const PROCESO_UPTIME = process.env.PROCESO_UPTIME;
const PROCESO_VERSION = process.env.PROCESO_VERSION;
const INFO_OS = process.env.INFO_OS;
const OS_CPU_USAGE = process.env.OS_CPU_USAGE;
const OS_INTERFACES_RED = process.env.OS_INTERFACES_RED;
const OS_INTERFACES_RED_IP = process.env.OS_INTERFACES_RED_IP;
const OS_INTERFACES_RED_MASCARA = process.env.OS_INTERFACES_RED_MASCARA;
const OS_INTERFACES_RED_MAC = process.env.OS_INTERFACES_RED_MAC;
const OS_INTERFACES_RED_FAMILIA = process.env.OS_INTERFACES_RED_FAMILIA;
const OS_INTERFACES_RED_INTERNO = process.env.OS_INTERFACES_RED_INTERNO;
const OS_UPTIME = process.env.OS_UPTIME;
const OS_RAM_LIBRE = process.env.OS_RAM_LIBRE;
const OS_HOMEDIR = process.env.OS_HOMEDIR;
const OS_VERSION = process.env.OS_VERSION;
const OS_RAM_TOTAL = process.env.OS_RAM_TOTAL;

const server = http.createServer((request, response) => {
  console.log('Ha entrado una petición');
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.end('Se ha realizado la petición entrante');
});

server.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`);
  console.log(`Nombre del host: ${os.hostname()}`);
  console.log(`Cantidad total de RAM: ${os.totalmem()}`);
  console.log(`Cantidad libre de RAM: ${os.freemem()}`);
});

setInterval(() => {
  if (INFO_PROCESO === 'true') {
    console.log('--------Información del proceso--------');

    if (PROCESO_USO_MEMORIA === 'true') {
      console.log(`Uso de memoria: ${process.memoryUsage().heapUsed}`);
    }

    if (PROCESO_ARQ === 'true') {
      console.log(`Arquitectura de la CPU: ${process.arch}`);
    }

    if (PROCESO_DIR_ACTUAL === 'true') {
      console.log(`Directorio actual de trabajo: ${process.cwd()}`);
    }

    if (PROCESO_CPU_USO === 'true') {
      console.log(`Uso de CPU del proceso: ${process.cpuUsage()}`);
    }

    if (PROCESO_PID === 'true') {
      console.log(`PID del proceso: ${process.pid}`);
    }

    if (PROCESO_UPTIME === 'true') {
      console.log(`Uptime de Node: ${process.uptime()}`);
    }

    if (PROCESO_VERSION === 'true') {
      console.log(`Versión de Node: ${process.version}`);
    }
  }

  if (INFO_OS === 'true') {
    console.log('--------Información del S.O--------');
    if (OS_CPU_USAGE === 'true') {
      for (const cpu of os.cpus()) {
        console.log(
          `Uso de CPU -> Modelo: ${cpu.model}, Velocidad ${cpu.speed}`
        );
      }
    }
    if (OS_INTERFACES_RED === 'true') {
      for (const interface in os.networkInterfaces()) {
        console.log(`---Interfaz de red ${interface}--- `);
        const networkInfo = os.networkInterfaces()[interface];
        for (const config of networkInfo) {
          if (OS_INTERFACES_RED_IP === 'true') {
            console.log(`Dirección IP: ${config.address}`);
          }
          if (OS_INTERFACES_RED_MASCARA === 'true') {
            console.log(`Máscara de subred: ${config.netmask}`);
          }
          if (OS_INTERFACES_RED_MAC === 'true') {
            console.log(`Dirección MAC: ${config.mac}`);
          }
          if (OS_INTERFACES_RED_FAMILIA === 'true') {
            console.log(`Familia: ${config.family}`);
          }
          if (OS_INTERFACES_RED_INTERNO === 'true') {
            console.log(`Interno: ${config.internal}`);
          }
          console.log('---');
        }
      }
    }

    if (OS_UPTIME === 'true') {
      console.log(`Uptime del sistema:  ${os.uptime()}`);
    }
    if (OS_RAM_LIBRE === 'true') {
      console.log(`Memoria RAM libre en bytes: ${os.freemem()}`);
    }
    if (OS_HOMEDIR === 'true') {
      console.log(`Directorio home del usuario: ${os.homedir()}`);
    }
    if (OS_VERSION === 'true') {
      console.log(`Versión del S.O: ${os.release()}`);
    }
    if (OS_RAM_TOTAL === 'true') {
      console.log(`Memoria RAM total en bytes: ${os.totalmem()}`);
    }
  }
}, PERIODO);
