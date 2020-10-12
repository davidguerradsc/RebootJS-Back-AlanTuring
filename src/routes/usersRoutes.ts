import { request, Request, Response, Router } from 'express';
import { resolveTypeReferenceDirective } from 'typescript';
import { UserNotFoundError } from '../controllers/errors/userNotFound';
import { createUser, getUser, updateUser, getUsers } from '../controllers/usersController';
import { authenticationRequired } from '../middlewares/authenticationRequired';

const router = Router()

// uri finale = /api/users/:userId, cf ligne "app.use('/users', usersRoutes);"
router.get('/:userId', authenticationRequired, (req, res) => {} ,(req : Request, res : Response) => {
  const id = req.params.userId;

  getUser(
    id,
    (user) => {
      if (!user) { return res.status(404).send('User Not Found'); }

      return res.send(user);
    },
  );
});

router.post('/', (req : Request, res : Response) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send('Please provide a firstname, lastname and email');
  }

  // Appelle le controller
  const newUser = createUser(firstname, lastname, email, password);

  res.send(newUser);
});


router.get('/', (req: Request, res: Response) => {
    getUsers((users) => {
        if(!users) { return res.status(404).send('Users not found')}
        return res.send(users);
    });
});


router.patch('/:userId', authenticationRequired, (req: Request, res: Response) => {
  const id = req.params.userId;
  const { firstname, lastname, email } = req.body;

  try {
    updateUser(id, firstname, lastname, email);
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      res.status(404).send('User not found');
    } else {
      throw err
    }
  }
})

export default router;
