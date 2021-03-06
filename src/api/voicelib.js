// Check if this is needed
// var Promise = require('bluebird');
const Nexmo = require('nexmo');
const promisify = require('bluebird').promisify;
import fs from 'fs';

const CONV_PATH = '/tmp/conversations';

function storeConversations(conversations) {
  fs.writeFileSync(CONV_PATH, JSON.stringify(conversations), { flag: 'w' });
}

function retrieveConversations(conversations) {
  try {
  if (fs.existsSync(CONV_PATH)) {
      const conversations = JSON.parse(fs.readFileSync(CONV_PATH).toString());
    if (conversations) {
      return conversations
    }
  }
} catch (ex) {
  console.log('Failed reading from ' + CONV_PATH);
  return [];
}
  return [];
}
/**
 * Create a new VoiceProxy
 */
const VoiceProxy = function(config) {
  console.log(config);
  this.config = config;

  this.nexmo = new Nexmo(
    {
      apiKey: this.config.NEXMO_API_KEY,
      apiSecret: this.config.NEXMO_API_SECRET,
      applicationId: this.config.NEXMO_APP_ID,
      privateKey: this.config.PRIVATE_KEY,
    },
    {
      debug: this.config.NEXMO_DEBUG,
    },
  );

  // Virtual Numbers to be assigned to UserA and UserB
  this.provisionedNumbers = [].concat(this.config.PROVISIONED_NUMBERS);

  // In progress conversations
  this.conversations = retrieveConversations();
};

/**
 * Provision two virtual numbers. Would provision more in a real app.
 */
VoiceProxy.prototype.provisionVirtualNumbers = function() {
  // Buy a UK number with VOICE capabilities.
  // For this example we'll also get SMS so we can send them a text notification
  this.nexmo.number.search('GB', { features: 'VOICE,SMS' }, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      const numbers = res.numbers;

      // For demo purposes:
      // - Assume that at least two numbers will be available
      // - Rent just two virtual numbers: one for each conversation participant
      this.rentNumber(numbers[0]);
      this.rentNumber(numbers[1]);
    }
  });
};

/**
 * Rent the given numbers
 */
VoiceProxy.prototype.rentNumber = function(number) {
  this.nexmo.number.buy(number.country, number.msisdn, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      this.configureNumber(number);
    }
  });
};

/**
 * Configure the number to be associated with the Voice Proxy application.
 */
VoiceProxy.prototype.configureNumber = function(number) {
  const options = {
    voiceCallbackType: 'app',
    voiceCallbackValue: this.config.NEXMO_APP_ID,
  };
  this.nexmo.number.update(
    number.country,
    number.msisdn,
    options,
    (err, res) => {
      if (err) {
        console.error(err);
      } else {
        this.provisionedNumbers.push(number);
      }
    },
  );
};

/**
 * Ensure the existing provisioned numbers are linked to the Voice Proxy app.
 */
VoiceProxy.prototype.reconfigureNumbers = function() {
  this.provisionedNumbers.forEach(function(number) {
    this.configureNumber(number);
  }, this);
};

/**
 * Create a new tracked conversation so there is a real/virtual mapping of numbers.
 */
VoiceProxy.prototype.createConversation = function(
  userANumber,
  userBNumber,
  context,
  cb,
) {
  this.checkNumbers(userANumber, userBNumber)
    .then(res => this.saveConversation(res, context))
    .then(this.sendSMS.bind(this))
    .then(conversation => {
      cb(null, conversation);
    })
    .catch(err => {
      cb(err);
    });
};

/**
 * Ensure the given numbers are valid and which country they are associated with.
 */
VoiceProxy.prototype.checkNumbers = function(userANumber, userBNumber) {
  const niGetPromise = promisify(this.nexmo.numberInsight.get, {
    context: this.nexmo.numberInsight,
  });
  const userAGet = niGetPromise({ level: 'basic', number: userANumber });
  const userBGet = niGetPromise({ level: 'basic', number: userBNumber });

  return Promise.all([userAGet, userBGet]);
};

/**
 * Store the conversation information.
 */
VoiceProxy.prototype.saveConversation = function(results, context) {
  const userAResult = results[0];
  const userANumber = {
    msisdn: userAResult.international_format_number,
    country: userAResult.country_code,
  };

  const userBResult = results[1];
  const userBNumber = {
    msisdn: userBResult.international_format_number,
    country: userBResult.country_code,
  };

  // Create conversation object - for demo purposes:
  // - Use first indexed LVN for user A
  // - Use second indexed LVN for user B
  const conversation = {
    userA: {
      realNumber: userANumber,
      virtualNumber: this.provisionedNumbers[0],
    },
    userB: {
      realNumber: userBNumber,
      virtualNumber: this.provisionedNumbers[1],
    },
    context: context,
  };

  this.conversations.push(conversation);
  storeConversations(this.conversations);

  return conversation;
};

/**
 * Send an SMS to each conversation participant so they know each other's
 * virtual number and can call either other via the proxy.
 */
VoiceProxy.prototype.sendSMS = function(conversation) {
  // Send UserA conversation information
  // From the UserB virtual number
  // To the UserA real number
  console.log(
    'SendSMS:',
    conversation.userB.virtualNumber.msisdn,
    conversation.userA.realNumber.msisdn,
    'Call this number to talk to UserB',
  );
  console.log(
    'SendSMS:',
    conversation.userA.virtualNumber.msisdn,
    conversation.userB.realNumber.msisdn,
    'Call this number to talk to UserA',
  );

  return conversation;
};

const fromUserAToUserB = function(from, to, conversation) {
  return (
    from === conversation.userA.realNumber.msisdn &&
    to === conversation.userB.virtualNumber.msisdn
  );
};
const fromUserBToUserA = function(from, to, conversation) {
  return (
    from === conversation.userB.realNumber.msisdn &&
    to === conversation.userA.virtualNumber.msisdn
  );
};

/**
 * Work out real number to virual number mapping between users.
 */
VoiceProxy.prototype.getProxyRoute = function(from, to) {
  let proxyRoute = null;
  let conversation;
  for (let i = 0, l = this.conversations.length; i < l; ++i) {
    conversation = this.conversations[i];

    // Use to and from to determine the conversation
    const fromUserA = fromUserAToUserB(from, to, conversation);
    const fromUserB = fromUserBToUserA(from, to, conversation);

    if (fromUserA || fromUserB) {
      proxyRoute = {
        conversation,
        to: fromUserA ? conversation.userB : conversation.userA,
        from: fromUserA ? conversation.userA : conversation.userB,
      };
      break;
    }
  }

  return proxyRoute;
};

/**
 * Build the NCCO response to intruct Nexmo how to handle the inbound call.
 */
VoiceProxy.prototype.getProxyNCCO = function(from, to) {
  // Determine how the call should be routed
  const proxyRoute = this.getProxyRoute(from, to);

  if (proxyRoute === null) {
    const errorText = `${'No conversation found' + ' from: '}${from} to: ${to}`;
    throw new Error(errorText);
  }

  // Build the NCCO
  const ncco = [];

  const textAction = {
    action: 'talk',
    text: 'Connecting your call',
  };
  ncco.push(textAction);

  const recordAction = {
    'action': 'record',
    'fromat': 'wav',
  };
  ncco.push(recordAction);
  const connectAction = {
    action: 'connect',
    from: proxyRoute.from.virtualNumber.msisdn,
    endpoint: [
      {
        type: 'phone',
        number: proxyRoute.to.realNumber.msisdn,
      },
    ],
  };
  ncco.push(connectAction);

  return ncco;
};

export default VoiceProxy;
