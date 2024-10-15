import { Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: "Internal server error" });
};
