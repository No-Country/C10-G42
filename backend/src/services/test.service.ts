export const testFunction = (): object => {
  setTimeout(() => {
    console.log('ok')
  }, 500)

  const obj = {
    1: 'uno',
    2: 'dos',
    3: 'tres'
  }

  return obj
}

export const testFunction2 = async (nombre: string): Promise<string[]> => {
  const frutas = ['manzana', 'naranja']
  setInterval(() => {
    console.log('ok')
  }, 3000)
  frutas.push(nombre)
  return frutas
}
