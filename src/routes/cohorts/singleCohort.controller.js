const db = require('../../db');

const getGraphData = snapshot => {
  // required data: gender identity, minority group, coding bootcamps, employment status
  // TODO: (stretch goal) - test this beast - probably would be easier if broken up into different functions

  // step 1: build graphValues object with all answers for each category
  const graphValues = snapshot.docs.reduce(
    (acc, currentDoc) => {
      const resolvedDoc = currentDoc.data();
      // set default values for the data if the value is null from the database
      const gender = resolvedDoc.gender || [];
      const minorityGroup = resolvedDoc.minority_group || [];
      const previousBootcamp = resolvedDoc.previous_bootcamp || [];
      const employmentStatus = resolvedDoc.employment_status || '';

      return {
        ...acc,
        gender: [...acc.gender, ...gender],
        minorityGroup: [...acc.minorityGroup, ...minorityGroup],
        previousBootcamp: [...acc.previousBootcamp, ...previousBootcamp],
        employmentStatus: [...acc.employmentStatus, employmentStatus]
      };
    },
    {
      gender: [],
      minorityGroup: [],
      previousBootcamp: [],
      employmentStatus: []
    }
  );

  // step 2: count each answer in each category
  for (const key in graphValues) {
    graphValues[key] = graphValues[key].reduce((acc, value) => {
      if (!acc.hasOwnProperty(value)) {
        return { ...acc, [value]: 1 };
      }
      return { ...acc, [value]: acc[value] + 1 };
    }, {});
  }

  // step 3: change data into shape that graphing library can accept
  for (const key in graphValues) {
    graphValues[key] = Object.keys(graphValues[key]).map(value => ({
      name: value,
      count: graphValues[key][value]
    }));
  }

  // step 4: profit!
  return graphValues;
};

const singleCohortController = (req, res) => {
  const cohortId = 'cohort-' + req.params.id;
  let singleCohort = db.collection('application_data');
  let query = singleCohort
    .where('cohort', '==', cohortId)
    .get()
    .then(snapshot => {
      res.status(200).json({
        data: {
          id: cohortId,
          applicants: snapshot.docs.length,
          ...getGraphData(snapshot)
        }
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

module.exports = { singleCohortController };
