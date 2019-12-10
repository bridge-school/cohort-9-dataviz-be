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

const getAnswered = snapshot => {
  const values = snapshot.docs.reduce(
    (acc, currentDoc) => {
      const resolvedDoc = currentDoc.data();
      acc.gender = resolvedDoc.gender ? acc.gender + 1 : acc.gender;
      acc.minorityGroup = resolvedDoc.minority_group
        ? acc.minorityGroup + 1
        : acc.minorityGroup;
      acc.previousBootcamp = resolvedDoc.previous_bootcamp
        ? acc.previousBootcamp + 1
        : acc.previousBootcamp;
      acc.employmentStatus = resolvedDoc.employment_status
        ? acc.employmentStatus + 1
        : acc.employmentStatus;
      return acc;
    },
    {
      gender: 0,
      minorityGroup: 0,
      previousBootcamp: 0,
      employmentStatus: 0
    }
  );
  return values;
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
          totalApplicants: snapshot.docs.length,
          applicantsAnswered: getAnswered(snapshot),
          ...getGraphData(snapshot)
        }
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

module.exports = { singleCohortController };
