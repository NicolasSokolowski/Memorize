import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { handleErrors } from "./app/middlewares/index.middleware.js";
import router from "./app/routers/index.router.js";
import debugLogger from "./app/utils/debugLogger.util.js";

// Mise en place du serveur express
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Mise en place des options pour les cors
const corsOptions = {
  credentials: true, 
  origin: process.env.URL || "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
};

// Mise en place de debug
const logger = debugLogger("index.js");

// Utilisation de cors avec les options definies
app.use(cors(corsOptions));

// Lecture et traitement des donnees entrantes au format JSON
app.use(json());

// Middleware pour la lecture et le traitement des donnees dans le req.body de la requete
app.use(express.urlencoded({ extended: true }));

// Mise en place du routeur
app.use(router);

// Mise en place du gestionnaire d'erreurs
app.use(handleErrors);

// Lancement du serveur
const server = app.listen({ port: PORT, host: HOST }, () => {
  logger(
    `The back-end server was successfully started on host ${HOST} on port ${PORT}.`
  );
});

// Si le serveur ne se lance pas, retourne un message et l'erreur rencontree
server.on("error", (error) => {
  logger(
    `The back-end server could not be started on port:${PORT}. The following error was returned. ${error.message}`
  );
});
