<template>
  <v-container class="align-center justify-center">
    <v-layout>
      <v-flex lg12>
        <v-row class="my-custom-row d-flex align-center justify-center">
          <v-col cols="12" lg="10">
            <v-card>
              <v-card-title class="headline">
                Tell ME YOUR GOALZ
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
                <v-btn @click="addDataToFirestore" color="secondary">Add a Goal</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="my-custom-row d-flex align-center justify-center">
          <v-col cols="12" lg="10" class="my-custom-col">
            <v-card class="my-custom-card">
              <v-card-title class="headline my-custom-title">
                Goalz List
              </v-card-title>
              <v-card-text class="my-custom-card-text">
                <!-- Display a list of documents -->
                <v-list dense>
                  <v-list-item
                    v-for="(document, index) in documents"
                    :key="index"
                    class="my-custom-list-item"
                  >
                    <v-list-item-title class="my-custom-list-title">{{ document.title }}</v-list-item-title>
                    <v-list-item-subtitle class="my-custom-list-subtitle">{{ document.description }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
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
<style scoped>
/* Apply styles to the v-row */
.my-custom-row {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Apply styles to the v-col */
.my-custom-col {
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Apply styles to the v-card */
.my-custom-card {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

/* Apply styles to the v-card-title */
.my-custom-title {
  font-size: 24px;
  color: #333;
}

/* Apply styles to the v-card-text */
.my-custom-card-text {
  padding: 20px;
}

/* Apply styles to the v-list-item */
.my-custom-list-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #f9f9f9;
}

/* Apply styles to the v-list-item-title and v-list-item-subtitle */
.my-custom-list-title,
.my-custom-list-subtitle {
  font-size: 18px;
  color: #333;
}
.center-container {
  align-items: center;
}
</style>
