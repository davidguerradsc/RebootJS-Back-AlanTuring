import { Request, Response, Router } from 'express';
import { createUser, getUser } from '../controllers/usersController';

const router = Router();

// uri finale = /api/users/:userId, cf ligne "app.use('/users', usersRoutes);"
router.get('/:userId', (req : Request, res : Response) => {
  const id = parseInt(req.params["userId"]);

  const user = getUser(id);

  res.send(user);
})

router.post('/', (req : Request, res : Response) => {
  const { firstname, lastname, email } = req.body;

  if(!firstname || !lastname || !email){
    return res.status(400).send("Please provide a firstname, lastname and email");
  }

  // Appelle le controller
  const newUser = createUser(firstname, lastname, email);

  res.send(newUser);
})

export default router;