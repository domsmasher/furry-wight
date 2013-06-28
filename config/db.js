var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	DBM = {},
	dbPort,
	dbHost,
	dbName,
    db;

if(process.env.VCAP_SERVICES) {
	var env = JSON.parse(process.env.VCAP_SERVICES);
	var credentials = env['mongodb-1.8'][0]['credentials'];
	dbPort = credentials.port;
	dbHost = credentials.hostname;
	dbName = credentials.db;
} else{
    dbPort = 27017;
	dbHost = 'localhost';
	dbName = 'test';
}

mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName);

console.log(dbHost);
console.log(dbPort);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('YAY!');
});

DBM.userSchema = new Schema({
    username:  String,
    password: String,
    screen_name:   String,
    profile_img:   String
}, { collection : 'users' });

DBM.User = mongoose.model('User', DBM.userSchema);

module.exports = DBM;