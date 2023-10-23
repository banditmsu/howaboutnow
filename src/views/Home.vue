<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Welcome to Your Vue Firebase App
          </v-card-title>
          <v-card-text>
            <p>
              This is the home page of your app.
            </p>
            <p>
              You can add more content or features here as needed.
            </p>

            <!-- Textarea for Data Entry -->
            <v-textarea
              v-model="newData"
              label="New Data"
              outlined
              rows="3"
            ></v-textarea>

            <!-- Add Button -->
            <v-btn @click="addDataToFirestore" color="primary">Add Data to Firestore</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firestore from '../firebase/firebaseConfig'; // Import the Firestore instance

export default {
  data() {
    return {
      newData: '', // Holds the data to add to Firestore
    };
  },
  methods: {
    addDataToFirestore() {
      // Check if newData is not empty before proceeding
      if (this.newData) {
        // Reference to the Firestore collection (change 'your-collection-name' to your collection name)
        const collectionRef = firestore.collection('Documents');

        // Data to add to Firestore
        const dataToAdd = {
          text: this.newData,
          timestamp: new Date(), // You can add a timestamp for each entry
        };

        // Add the data to Firestore
        collectionRef.add(dataToAdd)
          .then((docRef) => {
            console.log('Data added to Firestore with ID:', docRef.id);

            // Clear the textarea after adding data
            this.newData = '';
          })
          .catch((error) => {
            console.error('Error adding data to Firestore:', error);
          });
      }
    },
  },
};
</script>
