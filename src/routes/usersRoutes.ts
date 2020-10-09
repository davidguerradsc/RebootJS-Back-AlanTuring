import { Request, Response, Router } from 'express';
import { createUser, getUser } from '../controllers/usersController';
import { existingUsers } from '../models/usersModel';

const router = Router();

// uri finale = /api/users/:userId, cf ligne "app.use('/users', usersRoutes);"
router.get('/:userId', (req: Request, res: Response) => {
    // Je récupere l'ID de l'utilisateur
    const id = parseInt(req.params["userId"]);
    // J'utilise la methode "getUser (cf : usersController)" avec l'id récuperer au dessus afin de réupérer l'utilisateur correspondant
    const user = getUser(id);
    // Je retourne l'utilisateur trouvé.
    res.send(user);
})

router.post('/addUser', (req: Request, res: Response) => {
    // Je récupere les variables qui se trouve dans le req.body
    const { firstname, lastname, email } = req.body;
    // Si les variables n'existent pas dans le req.body, j'envoi un status 400 avec le message
    if (!firstname || !lastname || !email) {
        return res.status(400).send("Please provide a firstname, lastname and email");
    }
    // J'appel la methode "createUser" du controller.
    const newUser = createUser(firstname, lastname, email);

    // J'envoie la reponse avec le nouvel utilisateur
    res.send(newUser);
})

router.delete('/:userId/delete', (req: Request, res: Response) => {
    // Je récupere l'ID de l'utilisateur
    const id = parseInt(req.params["userId"]);
    // J'utilise la methode "getUser (cf : usersController)" avec l'id récuperer au dessus afin de réupérer l'utilisateur correspondant
    const user = getUser(id);

    if(!user){
         return res.send("L'utilisateur recherché n'existe pas !");
    } else {
        res.send("Success ! L'utilisateur à bien été supprimé !");
    }
    // Je retourne l'utilisateur trouvé.
    res.send(user);
})

router.patch('/:userId', (req: Request, res: Response) => {
    // Je récupere l'ID de l'utilisateur
    const id = parseInt(req.params["userId"]);
   
    // J'utilise la methode "getUser (cf : usersController)" avec l'id récuperer au dessus afin de réupérer l'utilisateur correspondant
    const user = getUser(id);
    //const user = existingUsers;
    if (!user){
        return res.status(404).send('error')
    }
    // Je récupere les variables qui se trouve dans le req.body
    const { firstname, lastname, email } = req.body;
    const updatedUser = {...user,
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        email: email || user.email}
    res.send(updatedUser);
})



export default router;