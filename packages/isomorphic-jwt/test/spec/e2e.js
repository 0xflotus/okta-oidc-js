const tokens = require('../tokens');
const env = require('../env');
const jwt = env.jwt;
const util = require('../util');

describe('using jwt operations end-to-end', () => {
  describe('RSA algos', () => {
    ['RS256', 'RS384', 'RS512'].map(algo => {
      env.supports({
        [algo]: ['generateKey', 'sign', 'verify']}
      )
      .it(`should allow generating, signing and verifying using ${algo}`, () => {
        return jwt.generateKey({
          alg: algo
        })
        .then(res => {
          return jwt.sign(tokens.standardClaimsSet, res.privateKey)
          .then(signedJwt => jwt.verify(signedJwt, res.publicKey));
        })
        .then(res => expect(res).toEqual(tokens.standardClaimsSet));
      });
    });
  });

  describe('HSA algos', () => {
    ['HS256', 'HS384', 'HS512'].map(algo => {
      env.supports({
        [algo]: ['generateKey', 'sign', 'verify']}
      )
      .it(`should allow generating, signing and verifying using ${algo}`, () => {
        return jwt.generateKey({
          alg: algo
        })
        .then(res => {
          return jwt.sign(tokens.standardClaimsSet, res.sharedKey)
          .then(signedJwt => jwt.verify(signedJwt, res.sharedKey));
        })
        .then(res => expect(res).toEqual(tokens.standardClaimsSet));
      });
    });
  });
  
  describe('Elliptic curve algos', () => {
    ['ES256', 'ES384', 'ES512'].map(algo => {
      env.supports({
        [algo]: ['generateKey', 'sign', 'verify']}
      )
      .it(`should allow generating, signing and verifying using ${algo}`, () => {
        return jwt.generateKey({
          alg: algo
        })
        .then(res => {
          return jwt.sign(tokens.standardClaimsSet, res.privateKey, { alg: algo })
          .then(signedJwt => jwt.verify(signedJwt, res.publicKey));
        })
        .then(res => expect(res).toEqual(tokens.standardClaimsSet));
      });
    });
  });
});
