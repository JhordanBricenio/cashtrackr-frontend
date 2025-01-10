import type { Request, Response } from "express";
import User from "../model/User";
import { comparePassword, hashPassword } from "../utilis/auth";
import { generateToken } from "../utilis/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateTokenjwt } from "../utilis/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(409).json("El email ya está registrado");
      return;
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.token = generateToken();
      await user.save();
      await AuthEmail.sendConfirmationEmail({
        username: user.name,
        email: user.email,
        token: user.token,
      });
      res.status(201).json("Cuenta creada con éxito");
    } catch (error) {
      console.error(error);
      res.status(500).json("Error al crear la cuenta");
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body;
    const user = await User.findOne({ where: { token } });
    if (!user) {
      res.status(401).json("Token no válido");
      return;
    }
    user.confirmed = true;
    user.token = null;
    await user.save();
    res.json("Cuenta confirmada con éxito");
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json("Email o contraseña incorrectos");
      return;
    }
    if (!user.confirmed) {
      res.status(403).json("Cuenta no confirmada");
      return;
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json("Email o contraseña incorrectos");
      return;
    }
    const token = generateTokenjwt(user.id);
    res.json(token);
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json("Usuario no encontrado");
      return;
    }

    user.token = generateToken();
    await user.save();
    await AuthEmail.sendPasswordResetEmail({
      username: user.name,
      email: user.email,
      token: user.token,
    });

    res.json("Email enviado");
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    const tokenExists = await User.findOne({ where: { token } });
    if (!tokenExists) {
      const error = new Error("Token no válido");
      res.status(404).json({ error: error.message });
      return;
    }

    console.log("tooken valido");
  };

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token } });
    if (!user) {
      res.status(404).json("Token no válido");
      return;
    }
    //Actualizar la contraseña
    user.password = await hashPassword(password);
    user.token = null;
    await user.save();
    res.json("Contraseña actualizada con éxito");
  };

  static getUser = async (req: Request, res: Response) => {
    res.json(req.user);
  };

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;
    const { id } = req.user;
    const user = await User.findByPk(id);
    const isPasswordCorrect = await comparePassword(
      current_password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json("Contraseña actual incorrecta");
      return;
    }
    user.password = await hashPassword(password);
    await user.save();
    res.json("Contraseña actualizada con éxito");
  };

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.user;
    const user = await User.findByPk(id);
    const isPasswordCorrect = await comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json("Contraseña actual incorrecta");
      return;
    }
    res.json("Password correcta");
  };
}
