import type { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../model/Esxpense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name").notEmpty().withMessage("El nombre es requerido").run(req);
  await body("amount")
    .notEmpty()
    .withMessage("El monto es requerido")
    .isNumeric()
    .withMessage("El monto debe ser un número")
    .isFloat({ min: 0 })
    .withMessage("El monto debe ser mayor a 0")
    .run(req);

  next();
};

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("expenseId")
    .isInt()
    .custom((value) => value > 0)
    .withMessage("El id del gasto debe ser un número entero")
    .run(req);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expense = await Expense.findByPk(req.params.expenseId);
    if (!expense) {
      res.status(404).json({ message: "Gasto no encontrado" });
      return;
    }
    req.expense = expense;
    next();

  } catch (error) {
    res.status(500).json({ message: error });
  }
};
