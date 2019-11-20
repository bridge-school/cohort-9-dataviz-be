const db = require("../../db");

const getCohorts = snapshot => {
    const cohorts = snapshot.docs.reduce((acc, currentDoc) => {
        const resolvedDoc = currentDoc.data();
        if (!acc[resolvedDoc.cohort]) {
            return { [resolvedDoc.cohort]: 1, ...acc };
        } else {
            return { [resolvedDoc.cohort]: acc[resolvedDoc.cohort]++, ...acc };
        }
    }, {});

    console.log(cohorts);

    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
};

const cohortsController = (req, res) => {
    db.collection("application_data")
        .get()
        .then(snapshot => {
            res.json({
                data: getCohorts(snapshot)
                })
        })
        .catch(error => {
            res.json({ error });
        });

};

  module.exports = {
    cohortsController
  }
  