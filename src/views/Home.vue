<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Welcome to Your Vue Firebase App
          </v-card-title>
          <v-card-text>
              <!-- Title input field -->
              <v-text-field
                v-model="title"
                label="Title"
                outlined
                required
              ></v-text-field>

              <!-- Description input field -->
              <v-text-field
                v-model="description"
                label="Description"
                outlined
                required
              ></v-text-field>

            <!-- Add Button -->
            <v-btn @click="addDataToFirestore" color="primary">Add Data to Firestore</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            Document List
          </v-card-title>
          <v-card-text>
            <!-- Display a list of documents -->
            <v-list dense>
              <v-list-item
                v-for="(document, index) in documents"
                :key="index"
              >
                <v-list-item-title>{{ document.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ document.description }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
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
      documents: [], // Holds the list of documents from Firestore,
      title: '',
      description: '',
    };
  },
  created() {
    // Fetch documents from Firestore collection (replace 'your-collection-name')
    firestore.collection('Documents').get()
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.documents = documents;
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      });
  },
  methods: {
    addDataToFirestore() {
      // Check if newData is not empty before proceeding
      if (this.title && this.description) {
        // Reference to the Firestore collection (change 'your-collection-name' to your collection name)
        const collectionRef = firestore.collection('Documents');

        // Data to add to Firestore
        const dataToAdd = {
          title: this.title,
          description: this.description,
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
