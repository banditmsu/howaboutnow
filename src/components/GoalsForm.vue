<template>
    <div> <!-- This is the single root element -->
      <v-flex lg12>
        <v-card class="my-custom-card">
          <v-card-title class="headline">
            Tell ME YOUR GOALZ
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addGoal">
              <!-- Form fields for adding a new goal -->
              <v-text-field v-model="title" label="Title" outlined required></v-text-field>
              <v-text-field v-model="description" label="Description" outlined required></v-text-field>
              <v-text-field v-model="overallProgress" label="Overall % Complete" outlined required></v-text-field>
              <v-text-field v-model="actionsTaken" label="Actions taken this month" outlined required></v-text-field>
              <v-text-field v-model="actionsPlanned" label="Actions planned next month" outlined required></v-text-field>
              <v-text-field v-model="obstacles" label="Obstacles/Roadblocks" outlined required></v-text-field>
              <v-text-field v-model="helpNeeded" label="Specific help needed" outlined required></v-text-field>
              <v-btn type="submit" color="primary">Add Goal</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
          <!-- Toggle View Button -->
    <v-layout row wrap>
      <v-flex lg12>
        <v-btn @click="goToGoalList">GO to Goal List</v-btn>
      </v-flex>
    </v-layout>
    </div>
  </template>
  

<script>
import firestore from '../firebase/firebaseConfig';
export default {
    name: 'GoalsForm',
    data() {
        return {
            newData: '',
            documents: [],
            title: '',
            description: '',
            overallProgress: '',
            actionsTaken: '',
            actionsPlanned: '',
            obstacles: '',
            helpNeeded: '',
            editMode: false,
            addingGoal: true,
            snackbar: false,
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
        addGoal() {
            // Check if newData is not empty before proceeding
            if (this.title && this.description && this.overallProgress && this.actionsTaken && this.actionsPlanned && this.obstacles && this.helpNeeded) {
                // Reference to the Firestore collection (change 'your-collection-name' to your collection name)
                const collectionRef = firestore.collection('Documents');
                // Data to add to Firestore
                const dataToAdd = {
                    title: this.title,
                    description: this.description,
                    overallProgress: this.overallProgress,
                    actionsTaken: this.actionsTaken,
                    actionsPlanned: this.actionsPlanned,
                    obstacles: this.obstacles,
                    helpNeeded: this.helpNeeded,
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
                    this.$router.push({ name: 'goals-list' }); // Redirect to the Home route

                    // After adding data, refresh the document list
                    this.fetchDocuments();
                })
                    .catch((error) => {
                    console.error('Error adding data to Firestore:', error);
                });
            }
        },
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
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        goToGoalList() {
          this.$router.push({ name: 'GoalsList' }); // Redirect to the Goals List route

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
            }
            catch (error) {
                console.error('Error fetching documents:', error);
            }
        },
        // Add methods to update individual fields as needed
      },
};
</script>

<style scoped>
.my-custom-card {
  margin: 20px;
}

.my-custom-row, .my-custom-list-item {
  background-color: #f5f5f5;
  padding: 20px;
}

.my-custom-list-item {
  margin-bottom: 20px;
}

.my-custom-list-item:last-child {
  margin-bottom: 0;
}

.my-custom-list-item .v-text-field {
  margin-bottom: 0;
}

.my-custom-list-item .v-text-field:last-child {
  margin-bottom: 0;
}

.my-custom-col {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: transform 0.3s;
}
</style>
