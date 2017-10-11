const env = require('./env');
env.name = 'browser-extended';
env.jwt = require('../src/browser-extended');
env.supportedAlgorithms = new Set([
  'RS256', 
  'RS384',
  'RS512',
  'HS256',
  'HS384',
  'HS512',
  // 'ES256', // Edge doesn't support elliptic curve
  // 'ES384',
  // 'ES512'
]);

const specContext = require.context('./spec', true, /.*/);
specContext.keys().forEach(specContext);
