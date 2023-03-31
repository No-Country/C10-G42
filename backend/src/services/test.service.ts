export const testFunction = async () => {
  setTimeout(() => {
  }, 500);

  const obj = {
    "1": "uno",
    "2": "dos",
    "3": "tres"
  }
  
  return obj;
}

export const testFunction2 = async (nombre: string) => { 
  const frutas = ["manzana", "naranja"]
  setInterval(() => {}, 3000);
  frutas.push(nombre)
  return frutas
}