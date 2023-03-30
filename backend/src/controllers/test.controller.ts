import { Request, Response } from "express";
import { testFunction } from "../services/test.service";
import { httpErrorHandler } from "../utils/httpErrorHandler";

const testController = {

  test1: async (req: Request, res: Response) => {
    try {
      const firstname = req.user?.firstname;
      res.send(firstname); 
    } catch (error) {
      httpErrorHandler(res, error, 500);
    }
  }
}
  
export default testController;