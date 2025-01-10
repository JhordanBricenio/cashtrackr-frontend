import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controller/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(limiter);

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("email").isEmail().withMessage("El email es inválido"),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isLength({ min: 6 })
    .withMessage("El token debe tener al menos 6 caracteres"),
  handleInputErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("email").isEmail().withMessage("El email es inválido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  handleInputErrors,
  AuthController.login
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("El email es inválido"),
  handleInputErrors,
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isLength({ min: 6 })
    .withMessage("El token debe tener al menos 6 caracteres"),
  handleInputErrors,
  AuthController.validateToken
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("El token es requerido"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrors,
  AuthController.resetPasswordWithToken
);

router.get("/user", authenticate, AuthController.getUser);

router.post("/update-password",
  authenticate,
  body("current_password").notEmpty().withMessage("La contraseña actual es requerida"),
  body("password").isLength({ min: 8 }).withMessage("La nueva contraseña debe tener al menos 8 caracteres"),
  handleInputErrors,
  AuthController.updateCurrentUserPassword
);

router.post("/check-password",
  authenticate,
  body("password").notEmpty().withMessage("La contraseña actual es requerida"),
  handleInputErrors,
  AuthController.checkPassword
)


export default router;
