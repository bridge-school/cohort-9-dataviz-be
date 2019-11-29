const db = require('../../db');

const singleCohortController = (req, res) => {
  const id = req.params.id;
  let singleCohort = db.collection('application_data');
  let query = singleCohort
    .where('cohort', '==', id)
    .get()
    .then(snapshot => {
      res.json({
        data: snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        })
      });
    })
    .catch(error => {
      res.json({ error });
    });
};

module.exports = { singleCohortController };
