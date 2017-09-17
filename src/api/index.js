import express from 'express';
import config from '../config';
import VoiceLib from './voicelib';

const router = express.Router();
const voicelib = new VoiceLib(config.nexemo);
router.get('/connections', (req, res) => {
  res.json({
    status: 'OK',
  });
});

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
