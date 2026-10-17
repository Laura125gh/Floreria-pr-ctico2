// async// await  CONTENEDOR DEL CLIMA ACTUAL D ELA CIUDAD 
let clima = [];
const traerclima = async () => {

    try {
        // cuando sale todo bien
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Catamarca&appid=ea4e5f0e85efa1d3db52bcfa41179ef2&units=metric&lang=es");
        const data = await response.json();
        return data;

    } catch (error) {
        alert(`ERROR `);
    }

    const data = await response.json();
    return data;
};
traerclima().then((info) => {
    clima = info;
    console.log(clima);
});

traerclima().then((info) => {
    if (!info || !info.main) {
        return;
    }

    document.getElementById("ciudad").textContent = info.name;

    document.getElementById("temperatura").textContent =
       ` Temperatura: ${info.main.temp} °C`;

    document.getElementById("descripcion").textContent =
        `Estado del clima: ${info.weather[0].description}`;

    document.getElementById("sensacion").textContent =
        `Sensación térmica: ${info.main.feels_like} °C`;

    document.getElementById("humedad").textContent =
        `Humedad: ${info.main.humidity} %`;
});