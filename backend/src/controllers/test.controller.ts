import { type Request, type Response } from 'express'

import { testFunction, testFunction2 } from '../services/test.service'
import { httpErrorHandler } from '../utils/httpErrorHandler'

const testController = {
  test1: (req: Request, res: Response): void => {
    try {
      const testResponse = testFunction()
      res.send(testResponse)
    } catch (error) {
      httpErrorHandler(res, error, 500)
    }
  },

  test2: (req: Request, res: Response): void => {
    const { nombre } = req.body
    testFunction2(nombre)
      .then(testResponse => {
        res.send(testResponse)
      })
      .catch(error => {
        httpErrorHandler(res, error, 500)
      })
  }
}

export default testController
