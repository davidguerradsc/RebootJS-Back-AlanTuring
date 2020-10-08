import { Request, Response, Router } from 'express';
import { createUser } from '../controllers/usersController';

const router = Router();

// uri finale = /api/users/:userId, cf ligne "app.use('/users', usersRoutes);"
router.get('/:userId', (req : Request, res : Response) => {
  //TODO;
})

router.post('/', (req : Request, res : Response) => {
  // TODO Verification sur le body


  // Appel le controller
  createUser(firstname, lastname, email);


  // J'envoie la reponse
  res.send('Blabla');
})
export default router;