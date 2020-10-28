import { Router } from 'express';
import { DatabaseError } from '../controllers/errors/databaseError';
import { authenticationRequired } from '../middlewares/authenticationRequired';
import { Message } from '../models/messagesModel';
import { IUser } from '../models/usersModel';
import { io } from '../socket';

const router = Router();

router.get('/', authenticationRequired, async (req, res) => {
  const connectedUser = req.user as IUser

  try {
    const messages = await Message.find({
      $or: [
        { emitter: connectedUser._id },
        { targets: connectedUser._id }
      ]
    });

    return res.send(messages);
  } catch (err) {
    throw new DatabaseError(err);
  }
});

router.post('/', authenticationRequired, async (req, res) => {
  const connectedUser = req.user as IUser

  const { content, conversationId, targets } = req.body
  if (!content || !conversationId || !targets || targets.length === 0) {
    return res
      .status(400)
      .send(`Please ensure that your request contains : content, conversationId and targets.
       Also check that targets is not an empty array`);
  }

  const message = new Message({
    emitter: connectedUser._id,
    content: content,
    conversationId: conversationId,
    targets: targets,
    createdAt: new Date()
  })

  try {
    const createdMessage = await message.save()

    /* IO emition
    pour chaque target {
      - récuperer l'id de la socket stocké dans le user
      - si elle existe c'est que le lien entre le back et le front existe donc
      je peux emettre un evenement avec io.to(socketID).emit('new-message', data)
      - sinon pas la peine d'envoyer un event
    }*/

    return res.send(createdMessage);
  } catch (err) {
    throw new DatabaseError(err);
  }
})

export default router;
