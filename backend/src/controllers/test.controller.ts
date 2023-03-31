import { type Request, type Response } from 'express'
import { testFunction, testFunction2 } from '../services/test.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

async function test1 (req: Request, res: Response): Promise<void> {
  try {
    const testResponse = await testFunction()
    console.log(testResponse)
    res.send(testResponse)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

const test2 = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre } = req.body
    const testResponse = await testFunction2(nombre)
    res.send(testResponse)
  } catch (error) {
    httpErrorHandler(res, error, 500)
  }
}

export {
  test1,
  test2
}
