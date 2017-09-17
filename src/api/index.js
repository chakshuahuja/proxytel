import express from 'express';
import config from '../config';
import VoiceLib from './voicelib';
import { User, UserLogin, UserApp, Connection } from '../data/models';

const router = express.Router();
const voicelib = new VoiceLib(config.nexemo);
router.get('/connections', (req, res) => {
  const connection = {
    userPhone: '16507984482',
    agentPhone: '16509960456',
    userVirtualPhone: 'blank',
    agenVirtualPhone: 'blank',
    context: 'c123456',
    recordings: [

    ]
  }
  res.json({
    connections: [connection],
  });
});

router.get('/newapp', async (req, res) => {
  const user = req.user;
  console.log('user', user);

  if (!user) {
    res.send(403, 'No user');
  }
  const uapp =  UserApp.build({
    name: 'Yolo',
    'user': []
  });
  uapp.setUser(req.user);
  await User.addUserApps([uapp]);
  console.log('uapp', uapp);
  res.send('OK');
});
router.get('/apps', async (req, res) => {
  console.log('user', req.user);
  const u = await User.find({

    where: {'id': req.user.id},
    // include: [{
    //   model: UserApp,
    //   as: 'apps',
    // }]
  });

  console.log('u', u);
  res.send('Ok');
})

router.get('/proxy-call', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  const ncco = voicelib.getProxyNCCO(from, to);
  res.json(ncco);
});

router.post('/event', (req, res) => {
  console.log('event', req.body);

  res.sendStatus(204);
});

router.get('/conversation/start/:userANumber/:userBNumber', (req, res) => {
  const userANumber = req.params.userANumber;
  const userBNumber = req.params.userBNumber;

  voicelib.createConversation(userANumber, userBNumber, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// // Useful functions for testing out the functionality and querying bookings
// router.get('/', function(req, res) {
//   res.send('Hello Voice Proxy!');
// });

router.get('/numbers/provision', (req, res) => {
  voicelib.provisionVirtualNumbers();

  res.send('OK');
});

router.get('/numbers/reconfigure', (req, res) => {
  voicelib.reconfigureNumbers();

  res.send('OK');
});

router.get('/numbers', (req, res) => {
  res.json(voicelib.provisionedNumbers);
});

router.get('/conversations', (req, res) => {
  res.json(voicelib.conversations);
});

export default router;
