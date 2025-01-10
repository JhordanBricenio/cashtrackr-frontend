import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controller/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import {
  hasAccess,
  validateBudget,
  validateBudgetBody,
  validateBudgetExists,
} from "../middleware/budget";
import { ExpensesController } from "../controller/ExpenseController";
import { validateExpenseBody, validateExpenseExists, validateExpenseId } from "../middleware/expense";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(authenticate);

router.param("budgetId", validateBudget);
router.param("budgetId", validateBudgetExists);
router.param("budgetId", hasAccess);

router.param("expenseId", validateExpenseId);
router.param("expenseId", validateExpenseExists);


router.get("/", BudgetController.getAll);
router.post("/", validateBudgetBody, handleInputErrors, BudgetController.create);
router.get("/:budgetId", BudgetController.getById);
router.put("/:budgetId", validateBudgetBody, handleInputErrors, BudgetController.updateById);
router.delete("/:budgetId", BudgetController.deleteById);

router.post("/:budgetId/expenses", validateExpenseBody, handleInputErrors, ExpensesController.create);
router.get("/:budgetId/expenses/:expenseId", ExpensesController.getById);
router.put("/:budgetId/expenses/:expenseId", validateExpenseBody, handleInputErrors, ExpensesController.updateById);
router.delete("/:budgetId/expenses/:expenseId", ExpensesController.deleteById);

export default router;
