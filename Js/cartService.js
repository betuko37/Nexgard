const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function agregarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("bicicletas"));
  let cantidadProductoFinal;

  if (!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("bicicletas", JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  } else {
    const indiceProducto = memoria.findIndex(
      (bicicleta) => bicicleta.id === producto.id
    );
    let nuevaMemoria = [...memoria]; // Copiar la memoria actual
    if (indiceProducto === -1) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("bicicletas", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
  }
  return cantidadProductoFinal;
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("bicicletas")) || []; // Si memoria es null, asigna un array vacío
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(
    (bicicleta) => bicicleta.id === producto.id
  );
  let nuevaMemoria = memoria;
  if (indiceProducto !== -1) {
    nuevaMemoria[indiceProducto].cantidad--;
    cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    if (cantidadProductoFinal === 0) {
      nuevaMemoria.splice(indiceProducto, 1);
    }
    localStorage.setItem("bicicletas", JSON.stringify(nuevaMemoria));
  }
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("bicicletas")) || [];
  if (memoria.length > 0) {
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    itemsAdded = memoria;
  } else {
    itemsAdded = [];
  }
  cuentaCarritoElement.innerText = cuenta;
  return cuenta;
}

/** Reinicia el carrito */
function reiniciarCarrito() {
  localStorage.removeItem("bicicletas");
  actualizarNumeroCarrito();
}

actualizarNumeroCarrito();
