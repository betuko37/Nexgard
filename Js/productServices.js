async function getBicicletas(){
  const res = await fetch("http://localhost:4000/productos");
  const resJson = await res.json();
  console.log("Productos obtenidos:", resJson); // Agregar este console.log
  return resJson;
}
