
// Lista de productos
const productos = [
    { id: 1, title: "Rosa de Abril", img: "https://i.pinimg.com/736x/60/96/48/609648e10360ee200fb254cff6086fb3.jpg", price: 25000 },
    { id: 2, title: "Dulce Primavera", img: "https://i.pinimg.com/736x/7d/55/8c/7d558c47a3b1468fc55b608aba9eee96.jpg", price: 13000 },
    { id: 3, title: "Dulce Encanto", img: "https://i.pinimg.com/736x/e2/89/d9/e289d97db90c64d6e868f7fc60661457.jpg", price: 17000 },
    { id: 4, title: "Mi Pequeño Jardín", img: "https://i.pinimg.com/736x/c8/42/8f/c8428f3c80de354661102b5ead2515ed.jpg", price: 23000 },
    { id: 5, title: "Flor de Seda", img: "https://i.pinimg.com/736x/fd/c1/17/fdc11771a73c5f2c120eb527c70e6809.jpg", price: 31000 },
    { id: 6, title: "Alma Floral", img: "https://i.pinimg.com/736x/65/45/20/6545208628074e85251c145c1dbce6f1.jpg", price: 23000 }
];

let carrito = [];

// Seleccionamos los elementos del HTML
const catalogo = document.querySelector(".productos");
const containerCart = document.querySelector("#container-cart");
const totalCarrito = document.querySelector("#tot");

// Generamos las tarjetas de los productos
const generateCardsProducts = () => {
    catalogo.innerHTML = "";

    productos.forEach((producto) => {
        const col = document.createElement("div");
        col.classList = "col mb-3";

        const card = `
            <div class="card" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.title}">
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text fs-2">$${producto.price}</p>
                    <button class="btn btn-rosa" onclick="addCart(${producto.id})">
                     Agregar
                    </button>  
                </div>
            </div>
        `;

        col.innerHTML = card;
        catalogo.append(col);
    });
};

// Agregamos productos al carrito
const addCart = (idProduct) => {
    const productFind = productos.find((producto) => producto.id === idProduct);

    if (productFind) {
        if (confirm(`¿Querés agregar ${productFind.title} al carrito?`)) {
            carrito.push(productFind);

            generateCardsCart();
            calcTot();

            // Guardamos el carrito en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    }
};

// Calculamos el total de los productos
const calcTot = () => {
    const total = carrito.reduce((acum, producto) => acum + producto.price, 0);

    totalCarrito.textContent = total;
};

// Mostramos los productos del carrito
const generateCardsCart = () => {
    containerCart.innerHTML = "";

    carrito.forEach((item, index) => {
        const content = document.createElement("div");
        content.classList = "producto-carrito";

        const datos = `
            <img src="${item.img}" alt="${item.title}">

            <div class="datos-producto">
                <p class="titulo-producto">${item.title}</p>
                <p class="precio-producto">$${item.price}</p>

                <button class="text-danger"
                    onclick="deleteProductCart(${index})">
                    Borrar
                </button>
            </div>
        `;

        content.innerHTML = datos;
        containerCart.append(content);
    });
};

// Borramos productos del carrito
const deleteProductCart = (index) => {
    if (index >= 0 && index < carrito.length) {
        const validar = confirm(
            `¿Querés borrar ${carrito[index].title} del carrito?`
        );

        if (validar) {
            carrito.splice(index, 1);

            // Actualizamos el carrito guardado
            localStorage.setItem("carrito", JSON.stringify(carrito));

            generateCardsCart();
            calcTot();
        }
    }
};

// Recuperamos los productos guardados
const generateDataBase = () => {
    const dataBase = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = dataBase;

    generateCardsCart();
    calcTot();
};

// Ejecutamos las funciones
generateCardsProducts();
generateDataBase();



























































