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
<v-btn @click="goToGoalPage">Go to add a Goal</v-btn>
</v-layout>
<v-snackbar v-model="snackbar" :timeout="3000" color="success">
Changes saved
</v-snackbar>
</v-container>
  </template>
  <script>
  import firestore from '../firebase/firebaseConfig';
  import { ref } from 'vue'; // Import ref from Vue 3
  export default {
      name: 'GoalsList',
      data() {
    return {
      documents: [],
      addingGoal: true,
      tableHeaders: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Overall Progress', value: 'overallProgress' },
        { text: 'Actions Taken', value: 'actionsTaken' },
        { text: 'Actions Planned', value: 'actionsPlanned' },
      ],
    };
  },

methods: {
     saveChanges() {
    // Iterate through the documents and save the changes
    for (const document of this.documents) {
        // You can use an update function to save the changes to your data source
        // Replace the following with your specific update logic
        updateDocument(document);
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
        actionsPlanned: document.actionsPlanned,
        actionsTaken: document.actionsTaken,
        obstacles: document.obstacles,
        helpNeeded: document.helpNeeded,
        // Update other fields
      }).then(() => {
        console.log('Document updated successfully');
      }).catch((error) => {
        console.error('Error updating document:', error);
      });
    },
     goToGoalPage() {
           this.addingGoal = !this.addingGoal;
      this.$router.push({ name: 'GoalsForm' }); // Redirect to the Home route

      this.fetchDocuments();
    },

     async fetchDocuments () {
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
    }
  },
    // Lifecycle hook
     mounted() {
      this.fetchDocuments();
    }
}
  </script>
  
  <style scoped>
  .my-custom-row, .my-custom-list-item {
    background-color: #f5f5f5;
    padding: 20px;
  }

  .my-custom-card {
    margin: 20px;
  }

  .my-custom-title {
    margin-bottom: 20px;
  }

  .my-custom-card-text {
    margin-bottom: 20px;
  }

  .my-custom-list-item:last-child {
    margin-bottom: 20px;
  }

  .my-custom-list-item .v-text-field {
    margin-bottom: 0;
  }

  .my-custom-list-item .v-text-field:last-child {
    margin-bottom: 0;
  }

  .my-custom-col {
    margin-bottom: 20px;
  }

  .my-custom-col:last-child {
    margin-bottom: 0;
  }

  .my-custom-col .v-text-field {
    margin-bottom: 0;
  }

  .my-custom-col .v-text-field:last-child {
    margin-bottom: 0;
  }

  .my-custom-card {
    background-color: #2196F3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 20px;
  }

  .my-custom-card-text {
    padding: 20px;
  }

  .my-custom-list-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    padding-right: 20px;
    height: 100px;
  }

  .my-custom-list-subtitle {
    font-size: 12px;
    color: #333;
    line-height: 1.4;
  }

  .v-btn.v-btn--contained.v-btn--round {
    background-color: #fff;
    border-radius: 30px;
    text-transform: none;
  }

  .v-btn.v-btn--contained.v-btn--round:hover {
    background-color: #1976D2;
  }

  .v-text-field--outlined .v-input__control {
    background-color: #fff;
  }

  .v-text-field--outlined .v-label, .v-text-field--outlined .v-input__icon--prepend, .v-text-field--outlined .v-input__icon--append {
    color: #2196F3;
  }

.v-data-table {
  background-color: #fff;

  
}
</style>
  