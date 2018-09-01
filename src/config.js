module.exports = {
  discord: { // discord settings
    authToken: 'Mzg1NDU4OTIzNDY3MDQ2OTEy.Dmyh6Q.pCtXmHqnK5_tnHkuMHg7SRBc_4s',
    defaultPrefix: '%',
    devServer: '',
  },
  generator: {
    type: 'randomSelector', // randomSelector, markovChain, api, etc
    seedSource: 'json', // json, mongo, api, etc
  },
  api: { // if api is used for seed or for generating chains, populate the urls
    seedSrc: '',
    generatorSrc: '',
  },
};
