import { Router } from "express";
import passport from "passport";
import { DatabaseError } from "../controllers/errors/databaseError";
import { UserNotFoundError } from "../controllers/errors/userNotFound";

const router = Router();

router.post('/', (req, res) => {
    const authenticationFunction = passport.authenticate('local', (err, user) => {
        if (err) {
            if (err instanceof UserNotFoundError) return res.status(404).send("User not found");
            return res.status(500).send()
        }

        if (user) {
            req.logIn(user, (err) => {
                if (err) return res.status(500).send();
                return res.send(user);
            })
        } else {
            return res.status(404).send("User not found");
        }
    });

    authenticationFunction(req, res);
})

export default router;