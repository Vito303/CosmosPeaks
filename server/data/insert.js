var MongoClient = require('mongodb').MongoClient;

const env = require('../env/environment');

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${env.accountName}.documents.azure.com:${env.port}/?ssl=true`; //&replicaSet=globaldb`;

var requiredCollection = "peaks"

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

fs = require('fs');
fs.readFile('./src/server/data/seznam vrhov.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //return data;
  parser(data)
  //console.log(data);
});

var peaksList = [];

function parser(data) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM(data);
  table = dom.window.document.querySelector("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  //var peaksList = [];
  for (i = 0; i < tr.length; i++) {
    var peak = {
      id:"",
      name: "",
      url: "",
      latitude: "",
      longitude: "",
      height: ""
    };
    peak.id = i;
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      console.log(td.innerHTML.toUpperCase());
      peak.name = td.innerHTML.toUpperCase();
    }
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      console.log(td.innerHTML.toUpperCase());
      peak.url = td.innerHTML.toUpperCase();
    }
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      console.log(td.innerHTML.toUpperCase());
      peak.latitude = td.innerHTML.toUpperCase();
    }
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      console.log(td.innerHTML.toUpperCase());
      peak.longitude = td.innerHTML.toUpperCase();
    }
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      console.log(td.innerHTML.toUpperCase());
      peak.height = td.innerHTML.toUpperCase();
    }
    peaksList.push(peak);
  }
}

// open the connection the DB server
MongoClient.connect(mongoUri, {auth: {
  user: env.accountName,
  password: env.key,
  }}, function (error, client){

    console.log("Connection is opened");

    var db = client.db('peaksdb');

    if(error) throw error;

        var docs = [{ _id: 1,  value: 1,  ticker: 'IBM' },
                    { _id: 2,  value: 1,  ticker: 'AAPL' },
                    { _id: 3,  value: 1,  ticker: 'INTC' },
                    { _id: 4,  value: 1,  ticker: 'FFIV' },
                    { _id: 5,  value: 1,  ticker: 'ARRS' }];

        db.collection(requiredCollection).insertMany(peaksList, function(error, inserted) {
            if(error) {
                console.error(error);
            }
            else {
                console.log("Successfully inserted: " , inserted );
            }
            client.close();

        }); // end of insert

        //db.close();

}); // Connection to the DB
