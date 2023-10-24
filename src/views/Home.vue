<template>
  <v-container class="d-flex align-center justify-center">
    <v-layout>
      <v-flex xs12 sm6 md6> <!-- Adjust the column width based on your layout preferences -->
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

                <!-- Additional fields -->
                <v-text-field
                  v-model="overallProgress"
                  label="Overall % Complete"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model="actionsTaken"
                  label="Actions taken this month"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model="actionsPlanned"
                  label="Actions planned next month"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model="obstacles"
                  label="Obstacles/Roadblocks"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  v-model="helpNeeded"
                  label="Specific help needed"
                  outlined
                  required
                ></v-text-field>

                <!-- Add Button -->
                <v-btn @click="addDataToFirestore">Add Goal</v-btn>

          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6> <!-- Adjust the column width based on your layout preferences -->
        <v-card class="my-custom-card">
          <v-card-title class="headline my-custom-title">
            Goalz List
          </v-card-title>
          <v-card-text class="my-custom-card-text">
            <v-list>
              <v-list-item
                v-for="(document, index) in documents"
                :key="index"
                class="my-custom-list-item"
              >
                <v-list-item-title class="my-custom-list-title">{{ document.title }}</v-list-item-title>
                <v-list-item class="my-custom-list-subtitle">{{ document.description }}</v-list-item>
                <v-list-item>Overall % Complete: {{ document.overallProgress }}</v-list-item>
                <v-list-item>Actions taken this month: {{ document.actionsTaken }}</v-list-item>
                <v-list-item>Actions planned next month: {{ document.actionsPlanned }}</v-list-item>
                <v-list-item>Obstacles/Roadblocks: {{ document.obstacles }}</v-list-item>
                <v-list-item>Specific help needed: {{ document.helpNeeded }}</v-list-item>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
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
      documents: [], // Holds the list of documents from Firestore
      title: '',
      description: '',
      overallProgress: '', // New field for Overall % Complete
      actionsTaken: '', // New field for Actions taken this month
      actionsPlanned: '', // New field for Actions planned next month
      obstacles: '', // New field for Obstacles/Roadblocks
      helpNeeded: '', // New field for Specific help needed
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
      if (this.title && this.description && this.overallProgress && this.actionsTaken && this.actionsPlanned && this.obstacles && this.helpNeeded) {
        // Reference to the Firestore collection (change 'your-collection-name' to your collection name)
        const collectionRef = firestore.collection('Documents');

        // Data to add to Firestore
        const dataToAdd = {
          title: this.title,
          description: this.description,
          overallProgress: this.overallProgress, // Include Overall % Complete
          actionsTaken: this.actionsTaken, // Include Actions taken this month
          actionsPlanned: this.actionsPlanned, // Include Actions planned next month
          obstacles: this.obstacles, // Include Obstacles/Roadblocks
          helpNeeded: this.helpNeeded, // Include Specific help needed
          timestamp: new Date(), // You can add a timestamp for each entry
        };

        // Add the data to Firestore
        collectionRef.add(dataToAdd)
          .then((docRef) => {
            console.log('Data added to Firestore with ID:', docRef.id);

            // Clear the input fields after adding data
            this.title = '';
            this.description = '';
            this.overallProgress = '';
            this.actionsTaken = '';
            this.actionsPlanned = '';
            this.obstacles = '';
            this.helpNeeded = '';
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
.my-custom-row {
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.my-custom-col {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.my-custom-card {
  background-color: #2196F3; /* Blue color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.my-custom-title {
  font-size: 24px;
  color: #fff; /* White color for text */
}

.my-custom-card-text {
  padding: 20px;
}

.my-custom-list-item {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 0;
  background-color: #f9f9f9;
}

.my-custom-list-title,
.my-custom-list-subtitle {
  font-size: 18px;
  color: #333;
}

/* Style the form fields with blue color */
.v-text-field--outlined .v-input__control {
  background-color: #fff;
}

.v-text-field--outlined .v-label {
  color: #2196F3;
}

.v-text-field--outlined .v-input__icon--prepend, .v-text-field--outlined .v-input__icon--append {
  color: #2196F3;
}

.v-text-field--outlined .v-input__control--text-field {
  border: 2px solid #2196F3;
  border-radius: 5px;
}

.v-text-field--outlined .v-input__control--text-field::before, .v-text-field--outlined .v-input__control--text-field::after {
  border-color: #2196F3;
}

/* Style the button */
.v-btn--contained.v-btn--round {
  background-color: #2196F3;
  color: #fff;
  border-radius: 30px;
  text-transform: none;
}

.v-btn--contained.v-btn--round:hover {
  background-color: #1976D2; /* Darker shade of blue on hover */
}

<style scoped>
.my-custom-row {
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.my-custom-col {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow for depth */
  border-radius: 5px;
  transition: transform 0.3s; /* Add a transition effect for hovering */
}

.my-custom-col:hover {
  transform: scale(1.05); /* Scale up on hover for a pop effect */
}

.my-custom-card {
  background-color: #2196F3; /* Blue color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.my-custom-title {
  font-size: 24px;
  color: #fff; /* White color for text */
}

.my-custom-card-text {
  padding: 20px;
}

.my-custom-list-item {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 0;
  background-color: #f9f9f9;
}

.my-custom-list-title,
.my-custom-list-subtitle {
  font-size: 18px;
  color: #333;
}

/* Style the form fields with blue color */
.v-text-field--outlined .v-input__control {
  background-color: #fff;
}

.v-text-field--outlined .v-label {
  color: #2196F3;
}

.v-text-field--outlined .v-input__icon--prepend, .v-text-field--outlined .v-input__icon--append {
  color: #2196F3;
}

.v-text-field--outlined .v-input__control--text-field {
  border: 2px solid #2196F3;
  border-radius: 5px;
  transition: box-shadow 0.3s; /* Add a box-shadow transition */
}

.v-text-field--outlined .v-input__control--text-field::before, .v-text-field--outlined .v-input__control--text-field::after {
  border-color: #2196F3;
}

.v-text-field--outlined .v-input__control--text-field:focus {
  box-shadow: 0 0 10px rgba(33, 150, 243, 0.5); /* Highlight on focus */
}

/* Style the button */
.v-btn--contained.v-btn--round {
  background-color: #2196F3;
  color: #fff;
  border-radius: 30px;
  text-transform: none;
}

.v-btn--contained.v-btn--round:hover {
  background-color: #1976D2; /* Darker shade of blue on hover */
}

/* Increase the font size for the list titles */
.my-custom-list-title {
  font-size: 20px;
  font-weight: bold;
}

/* Adjust the font size and spacing for list subtitles */
.my-custom-list-subtitle {
  font-size: 16px;
  line-height: 1.4;
}

/* Use a dark text color for readability */
.my-custom-list-item {
  color: #333;
}

/* Add spacing between list items for better readability */
.my-custom-list-item {
  margin: 20px 0;
}
</style>



