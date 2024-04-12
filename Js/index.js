const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
  productos.forEach((producto) => {
    const nuevaBicicleta = document.createElement("div");
    nuevaBicicleta.classList = "product-box";
    nuevaBicicleta.innerHTML = `
      <div class="product-img-container">
        <img class="product-img" src="${producto.urlImagen}" alt="pastillas">
      </div>
      <div class="product-details">
        <h3 class="product-title">${producto.nombre}</h3>
        <p class="product-price">$${producto.precio}</p>
      </div>
      <i class="bi bi-bag-plus-fill add-cart"></i>
    `;
    contenedorTarjetas.appendChild(nuevaBicicleta);
    const botonCarrito = nuevaBicicleta.querySelector(".add-cart");
    botonCarrito.addEventListener("click", () => {
      handle_addCartItem(producto);
      botonCarrito.removeEventListener("click", () => {});
    });
  });
}

getBicicletas().then((bicicletas) => {
  crearTarjetasProductosInicio(bicicletas);
});
