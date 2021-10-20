import { Router } from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateMessageController from "./controllers/CreateMessageController";
import GetLastMessagesController from "./controllers/GetLastMessagesController";
import GetUserProfileController from "./controllers/GetUserProfileController";
import ensureAuthenticate from "./middleware/ensureAthenticate";

const router = Router();

router.post('/Authenticate', new AuthenticateUserController().handler);

router.post('/messages', ensureAuthenticate, new CreateMessageController().handler)

router.get('/messages', new GetLastMessagesController().handler)

router.get('/profile', ensureAuthenticate, new GetUserProfileController().handler)

export default router;