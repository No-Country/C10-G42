import { Request, Response } from "express";

const shiftController = {
  test: (req: Request, res: Response) => {
    res.send("Ok: Test Shift Controller");
  }
}


export default shiftController;