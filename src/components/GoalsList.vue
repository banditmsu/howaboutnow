<template>
  <v-container class="d-flex align-center justify-center">
    <!-- Separate layout for the first card -->
    <v-layout row wrap>
      <v-flex lg12>
        <v-card class="my-custom-card">
          <v-card-title class="headline">
            Tell ME YOUR GOALZ
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex lg12>
        <v-card class="my-custom-card">
          <v-card-title class="headline my-custom-title">
            Goalz List
          </v-card-title>
    <v-card-text class="my-custom-card-text">
      <v-data-table :headers="tableHeaders" :items="documents" item-key="id">
        <template v-slot:title="{ item }">
          <v-edit-dialog :return-value.sync="item.title">
            <template v-slot:input>
              <v-text-field v-model="item.title"></v-text-field>
            </template>
            {{ item.title }}
          </v-edit-dialog>
        </template>
        <template v-slot:description="{ item }">
          <v-edit-dialog :return-value.sync="item.description">
            <template v-slot:input>
              <v-text-field v-model="item.description"></v-text-field>
            </template>
            {{ item.description }}
          </v-edit-dialog>
        </template>
        <template v-slot:overallProgress="{ item }">
          <v-edit-dialog :return-value.sync="item.overallProgress">
            <template v-slot:input>
              <v-text-field v-model="item.overallProgress"></v-text-field>
            </template>
            {{ item.overallProgress }}
          </v-edit-dialog>
        </template>
        <template v-slot:actionsPlanned="{ item }">
          <v-edit-dialog :return-value.sync="item.actionsPlanned">
            <template v-slot:input>
              <v-text-field v-model="item.actionsPlanned"></v-text-field>
            </template>
            {{ item.actionsPlanned }}
          </v-edit-dialog>
        </template>
        <template v-slot:actionsTaken="{ item }">
          <v-edit-dialog :return-value.sync="item.actionsTaken">
            <template v-slot:input>
              <v-text-field v-model="item.actionsTaken"></v-text-field>
            </template>
            {{ item.actionsTaken }}
          </v-edit-dialog>
        </template>
        <template v-slot:obstacles="{ item }">
          <v-edit-dialog :return-value.sync="item.obstacles">
            <template v-slot:input>
              <v-text-field v-model="item.obstacles"></v-text-field>
            </template>
            {{ item.obstacles }}
          </v-edit-dialog>
        </template>
        <template v-slot:helpNeeded="{ item }">
          <v-edit-dialog :return-value.sync="item.helpNeeded">
            <template v-slot:input>
              <v-text-field v-model="item.helpNeeded"></v-text-field>
            </template>
            {{ item.helpNeeded }}
          </v-edit-dialog>
        </template>
      </v-data-table>
      <v-btn @click="saveChanges()">Save</v-btn>
    </v-card-text>
  </v-card>
</v-flex>
<v-btn @click="GoToGoalPage">Go to add a Goal</v-btn>
</v-layout>
<v-snackbar v-model="snackbar" :timeout="3000" color="success">
Changes saved
</v-snackbar>
</v-container>
  </template>
  <script>
  import firestore from '../firebase/firebaseConfig';
  export default {
      name: 'GoalsList',
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
      editMode: false, // Set to true when editing a document
      addingGoal: true, // Set to true when adding a document
      snackbar: false, // Initialize snackbar as hidden
      tableHeaders: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Overall Progress', value: 'overallProgress' },
        { text: 'Actions Taken', value: 'actionsTaken' },
        { text: 'Actions Planned', value: 'actionsPlanned' },
        // Add more headers as needed
      ],
    };
  },
  created() {
    // Fetch documents from Firestore collection (replace 'your-collection-name')
    this.fetchDocuments();
  },
  methods: {
    saveChanges() {
      // Iterate through the documents and save the changes
      for (const document of this.documents) {
        // You can use an update function to save the changes to your data source
        // Replace the following with your specific update logic
        this.updateDocument(document);
      }

      // Show the snackbar
      this.snackbar = true;

      // Hide the snackbar after a timeout (e.g., 3 seconds)
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);

      // Exit edit mode after saving changes
      this.editMode = false;
    },
    updateDocument(document) {
      // Implement your logic to update the document in your data source (e.g., Firestore)
      // Example: Update the document in Firestore
      firestore.collection('Documents').doc(document.id).update({
        title: document.title,
        description: document.description,
        overallProgress: document.overallProgress,
        // Update other fields
      }).then(() => {
        console.log('Document updated successfully');
      }).catch((error) => {
        console.error('Error updating document:', error);
      });
    },

    GoToGoalPage() {
      this.addingGoal = !this.addingGoal;
      this.$router.push({ name: 'GoalsForm' }); // Redirect to the Home route

      this.fetchDocuments();
    },
    async fetchDocuments() {
      try {
        const querySnapshot = await firestore.collection('Documents').get();
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.documents = documents;
      } catch (error) {
        console.error('Error fetching documents:', error);
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
    background-color: #2196F3;
    /* Blue color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .my-custom-card {
    margin-top: 20px;
    /* Add margin to the top of the card */
    margin-left: 20px;
    /* Add margin to the left of the card */
    margin-right: 20px;
    /* Add margin to the right of the card */
    margin-bottom: 20px;
    /* Add margin to the bottom of the card */
  }
  
  .my-custom-title {
    font-size: 20px;
    color: #000;
    /* White color for text */
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
    padding-right: 20px;
    height: 100px;
  }
  
  /* Style the button */
  .v-btn.v-btn--contained.v-btn--round {
    background-color: #fff;
    color: #fff;
    border-radius: 30px;
    text-transform: none;
  }
  
  .v-btn.v-btn--contained.v-btn--round:hover {
    background-color: #1976D2;
    /* Darker shade of blue on hover */
  }
  
  .my-custom-row {
    background-color: #f5f5f5;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .my-custom-col {
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Add a shadow for depth */
    border-radius: 5px;
    transition: transform 0.3s;
    /* Add a transition effect for hovering */
  }
  
  .my-custom-col:hover {
    transform: scale(1.05);
    /* Scale up on hover for a pop effect */
  }
  
  .my-custom-card {
    background-color: #2196F3;
    /* Blue color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
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
    font-size: 12px;
    color: #333;
  }
  
  /* Style the form fields with blue color */
  .v-text-field--outlined .v-input__control {
    background-color: #fff;
  }
  
  .v-text-field--outlined .v-label {
    color: #2196F3;
  }
  
  .v-text-field--outlined .v-input__icon--prepend,
  .v-text-field--outlined .v-input__icon--append {
    color: #2196F3;
  }
  
  .v-text-field--outlined .v-input__control--text-field {
    border: 2px solid #2196F3;
    border-radius: 5px;
    transition: box-shadow 0.3s;
    /* Add a box-shadow transition */
  }
  
  .v-text-field--outlined .v-input__control--text-field::before,
  .v-text-field--outlined .v-input__control--text-field::after {
    border-color: #2196F3;
  }
  
  .v-text-field--outlined .v-input__control--text-field:focus {
    box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
    /* Highlight on focus */
  }
  /* Increase the font size for the list titles */
  .my-custom-list-title {
    font-size: 14px;
    font-weight: bold;
  }
  
  /* Adjust the font size and spacing for list subtitles */
  .my-custom-list-subtitle {
    font-size: 12px;
    line-height: 1.4;
  }
  
  /* Use a dark text color for readability */
  .my-custom-list-item {
    color: #333;
  }
  
  /* Add spacing between list items for better readability */
  .my-custom-list-item {
    margin: 20px 0;
  }</style>
  