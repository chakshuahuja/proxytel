const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

const speech_to_text = new SpeechToTextV1({
  username: '3ba5be6a-4d35-41d0-ae22-0d99b697df63',
  password: 'RZPH8uWZiSBd',
});

const params = {
  model: 'en-US_BroadbandModel',
  content_type: 'audio/wav',
  interim_results: true,
  max_alternatives: 3,
  word_confidence: false,
  timestamps: false,
  keywords: ['colorado', 'tornado', 'tornadoes'],
  keywords_threshold: 0.5,
};


function speechToText(wav, txt) {
  // Create the stream.
  const recognizeStream = speech_to_text.createRecognizeStream(params);

  // Pipe in the audio.
  fs
    .createReadStream('/Users/siddhant/Desktop/angry_sample_audio.wav')
    .pipe(recognizeStream);

  // Pipe out the transcription to a file.
  recognizeStream.pipe(fs.createWriteStream(txt));

  // Get strings instead of buffers from 'data' events.
  recognizeStream.setEncoding('utf8');

  // // Listen for events.
  // recognizeStream.on('results', function(event) { onEvent('Results:', event); });
  recognizeStream.on('data', event => {
    onEvent('Data:', event);
  });
  // recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  // recognizeStream.on('close', function(event) { onEvent('Close:', event); });
  // recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

  // Displays events on the console.
  function onEvent(name, event) {
    // if(name == "Data:")
    console.log(JSON.stringify(event, null, 2));
  }

}


export default speechToText;
