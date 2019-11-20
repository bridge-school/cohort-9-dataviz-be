const db = require('../../db');

// (stretch todo): write a test for this helper function so that if it
// gets refactored then we know it still works
const getCohorts = snapshot => {
  const cohorts = snapshot.docs.reduce((acc, currentDoc) => {
    const resolvedDoc = currentDoc.data();
    if (!acc[resolvedDoc.cohort]) {
      return { ...acc, [resolvedDoc.cohort]: 1 };
    } else {
      return { ...acc, [resolvedDoc.cohort]: acc[resolvedDoc.cohort] + 1 };
    }
  }, {});

  return cohorts;
};

const cohortsController = (req, res) => {
  db.collection('application_data')
    .get()
    .then(snapshot => {
      res.json({
        data: getCohorts(snapshot)
      });
    })
    .catch(error => {
      res.json({ error });
    });
};

module.exports = {
  cohortsController
};
