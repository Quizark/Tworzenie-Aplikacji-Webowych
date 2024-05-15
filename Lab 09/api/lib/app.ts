import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from './config';
import Controller from "./interfaces/controller.interface";
import mongoose from 'mongoose';
import TokenService from "./modules/services/token.service"; // Importujemy TokenService

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();
        this.startTokenCleanup(); // Dodajemy wywołanie funkcji do usuwania wygasłych tokenów
    }
    
    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
 
    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    }

    private async connectToDatabase(): Promise<void> {
        try {
          await mongoose.connect(config.databaseUrl);
          console.log('Connection with database established');
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
        }
       
        mongoose.connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });
       
        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB disconnected');
        });
       
        process.on('SIGINT', async () => {
          await mongoose.connection.close();
          console.log('MongoDB connection closed due to app termination');
          process.exit(0);
        });
       
        process.on('SIGTERM', async () => {
          await mongoose.connection.close();
          console.log('MongoDB connection closed due to app termination');
          process.exit(0);
        });
    }
    
    private startTokenCleanup(): void {
        const tokenService = new TokenService();
        setInterval(async () => {
            try {
                await tokenService.removeExpiredTokens();
                console.log('Expired tokens removed successfully');
            } catch (error) {
                console.error('Error while removing expired tokens:', error);
            }
        }, 3600000); // Sprawdź co godzinę
    }
}

export default App;
