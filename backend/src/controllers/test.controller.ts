import { Request, Response } from "express";
import { testFunction, testFunction2 } from "../services/test.service";
import { httpErrorHandler } from "../utils/httpErrorHandler";

const testController = {

  test1: async (req: Request, res: Response) => {
    try {
      const testResponse = await testFunction();
      res.send(testResponse); 
    } catch (error) {
      httpErrorHandler(res, error, 500);
    }
  },

  test2: async(req: Request, res: Response) => {
    try {
      const { nombre } = req.body
      const testResponse = await testFunction2(nombre)
      console.log(testResponse)
      res.send(testResponse)
    } catch (error) {
      httpErrorHandler(res, error, 500);
    }
  }

}
  
export default testController;