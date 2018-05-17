const Peak = require('./peak.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getPeaks(req, res) {
  const docquery = Peak.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(peaks => {
      res.status(200).json(peaks);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postPeak(req, res) {
  const originalPeak = { id: 1, name: "a", url: "b", latitude: "c", longitude: "d", height: "e" };
  const peak = new Peak(originalPeak);
  peak.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(peak);
    console.log('Peak created successfully!');
  });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, peak) {
  if (!peak) {
    res.status(404).send('Peak not found.');
    return;
  }
  return peak;
}

module.exports = {
  getPeaks,
  postPeak
};
