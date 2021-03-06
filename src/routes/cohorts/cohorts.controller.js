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

  return Object.keys(cohorts)
    .map(key => ({
      id: key,
      applicants: cohorts[key]
    }))
    .sort((a, b) =>
      parseInt(a.id.slice(7)) > parseInt(b.id.slice(7)) ? -1 : 1
    ); //returns sorted array in "desc" order
};

const cohortsController = (req, res) => {
  db.collection('application_data')
    .get()
    .then(snapshot => {
      res.status(200).json({
        data: getCohorts(snapshot)
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

module.exports = {
  cohortsController
};
