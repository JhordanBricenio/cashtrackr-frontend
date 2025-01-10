import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../model/Budget";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("budgetId")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const budget = await Budget.findByPk(req.params.budgetId);
    if (!budget) {
      res.status(404).json({ message: "Presupuesto no encontrado" });
      return;
    }
    req.budget = budget;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const validateBudgetBody = async (
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

export function hasAccess(req: Request, res: Response, next: NextFunction) {
  if (req.budget.userId !== req.user.id) {
    res.status(403).json({ message: "No tienes acceso a este presupuesto" });
    return;
  }
  next();
}
