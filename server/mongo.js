const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/environment');

// eslint-disable-next-line max-len
//const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/?ssl=true`; //&replicaSet=globaldb`;
const mongoUri = `mongodb://${env.accountName}.documents.azure.com:${env.port}/${env.databaseName}/?ssl=true`; //&replicaSet=globaldb`;

function connect() {
 mongoose.set('debug', true);
 var dbAuth = {
  useMongoClient: false,
	user:  env.accountName,
  pass: env.key,
}
 return mongoose.connect(mongoUri, dbAuth)
  .catch(err => console.error(err));
}

module.exports = {
  connect,
  mongoose
};
