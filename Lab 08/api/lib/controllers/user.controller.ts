// user.controller.ts

import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { admin } from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.post(`${this.path}/reset-password`, this.resetPassword); // Nowy endpoint do resetowania hasła
        this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);
        this.router.get(`${this.path}/users`, auth, admin, this.getAllUsers); // Nowy endpoint do pobierania wszystkich użytkowników (dla administratora)
    }

   private authenticate = async (request: Request, response: Response, next: NextFunction) => {
       // Implementacja metody authenticate bez zmian
   };

   private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
       // Implementacja metody createNewOrUpdate bez zmian
   };

   private resetPassword = async (request: Request, response: Response, next: NextFunction) => {
       const { email } = request.body;
       try {
           const user = await this.userService.getByEmail(email);
           if (!user) {
               return response.status(404).json({ error: 'User not found' });
           }
           const newPassword = this.generateRandomPassword(); // Generowanie nowego hasła
           const hashedPassword = await this.passwordService.hashPassword(newPassword);
           await this.passwordService.createOrUpdate({
               userId: user._id,
               password: hashedPassword
           });
           // Wysłanie nowego hasła na adres e-mail użytkownika - implementacja pominięta
           response.status(200).json({ message: 'Password reset successful' });
       } catch (error) {
           console.error(`Error resetting password: ${error.message}`);
           response.status(500).json({ error: 'Internal server error' });
       }
   };

   private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
       // Implementacja metody removeHashSession bez zmian
   };

   private getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
       try {
           const users = await this.userService.getAllUsers();
           response.status(200).json(users);
       } catch (error) {
           console.error(`Error fetching users: ${error.message}`);
           response.status(500).json({ error: 'Internal server error' });
       }
   };

   private generateRandomPassword(): string {
       // Implementacja generowania losowego hasła - przykładowa implementacja
       const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       let password = '';
       for (let i = 0; i < 8; i++) {
           password += characters.charAt(Math.floor(Math.random() * characters.length));
       }
       return password;
   }
}

export default UserController;