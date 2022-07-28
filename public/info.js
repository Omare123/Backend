// import { report, platform, memoryUsage, cwd, version } from 'node:process';
const info = async () => {
    let div = document.getElementById('info');
    const resp = await axios.get('http://localhost:8080/api/info');
    const {argv, plat, ver, memory, direc, cwd} = resp.data
    div.innerHTML = `<p> 
        Argumenstos de entrada: ${argv}</p>
        <p>Nombre de la plataforma: ${plat}</p>
        <p>Versión de node.js: ${ver}</p>
        <p>Memoria total reservada: ${memory}</p>
        <p>Path de ejecución: ${direc}</p>
        <p>Carpeta del proyecto: ${cwd}</p>
    </p>`
}

info();