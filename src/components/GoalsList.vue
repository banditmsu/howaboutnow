<template>
  <v-container class="d-flex align-center justify-center">
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
            <v-data-table :headers="tableHeaders" :items="documents">
              <!-- Condensed all templates using the same pattern -->
              <template v-for="header in tableHeaders" v-slot:[header.value]="{ item }" :key="item.id" >
    <v-edit-dialog  >
        <template v-slot:input>
            <v-text-field v-model="item[header.value]"></v-text-field>
        </template>
        {{ item[header.value] }}
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

<script lang="ts">
import firestore from '../firebase/firebaseConfig';

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
            this.documents.forEach(document => {
                this.updateDocument(document);
            });
            this.snackbar = true;
            setTimeout(() => {
                this.snackbar = false;
            }, 3000);
            this.editMode = false;
        },
        updateDocument(document) {
            firestore.collection('Documents').doc(document.id).update({
                title: document.title,
                description: document.description,
                overallProgress: document.overallProgress,
                actionsPlanned: document.actionsPlanned,
                actionsTaken: document.actionsTaken,
                obstacles: document.obstacles,
                helpNeeded: document.helpNeeded,
            }).then(() => {
                console.log('Document updated successfully');
            }).catch((error) => {
                console.error('Error updating document:', error);
            });
        },
        goToGoalPage() {
            this.addingGoal = !this.addingGoal;
            this.$router.push({ name: 'GoalsForm' });
            this.fetchDocuments();
        },
        async fetchDocuments() {
            try {
                const querySnapshot = await firestore.collection('Documents').get();
                this.documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        }
    },
    mounted() {
        this.fetchDocuments();
    }
}
</script>

<style scoped>
.my-custom-card, .my-custom-row, .my-custom-list-item {
    background-color: #f5f5f5;
    padding: 20px;
    margin: 20px;
}

.my-custom-title, .my-custom-card-text {
    margin-bottom: 20px;
}

.my-custom-list-item .v-text-field, .my-custom-col .v-text-field {
    margin-bottom: 0;
}

.my-custom-card {
    background-color: #2196F3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
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

.v-text-field--outlined .v-label, 
.v-text-field--outlined .v-input__icon--prepend, 
.v-text-field--outlined .v-input__icon--append {
    color: #2196F3;
}

.v-data-table {
    background-color: #fff;
}
</style>
