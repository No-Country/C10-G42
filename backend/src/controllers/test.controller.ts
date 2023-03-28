import { Request, Response } from "express";
import { testFunction } from "../services/test.service";
import { httpErrorHandler } from "../utils/httpError.handler";

const testController = {

  test1: async (req: Request, res: Response) => {
    try {
      const testResponse = await testFunction();
      res.send(testResponse); 
    } catch (error) {
      httpErrorHandler(res, error, 500);
    }
  }
}
  
export default testController;