const firestore = require('./firestore-config');

// Example: Create a new document in a Firestore collection
const collectionRef = firestore.collection('your-collection-name');
const dataToSave = {
  field1: 'value1',
  field2: 'value2',
};

collectionRef.add(dataToSave)
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
  });