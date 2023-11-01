<template>
  <div>
    <GoalsForm v-if="addingGoal" />
    <GoalsList v-else />
  </div>
</template>

<script>
import firestore from '../firebase/firebaseConfig';
import GoalsForm from '../components/GoalsForm.vue';
import GoalsList from '../components/GoalsList.vue';

export default {
  name: 'Home',
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
    toggleView() {
      this.addingGoal = !this.addingGoal;
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
.my-custom-row,
.my-custom-list-item {
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 0;
}

.my-custom-col {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: transform 0.3s;
}

.my-custom-col:hover {
  transform: scale(1.05);
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

.v-text-field--outlined .v-label,
.v-text-field--outlined .v-input__icon--prepend,
.v-text-field--outlined .v-input__icon--append {
  color: #2196F3;
}

.v-text-field--outlined .v-input__control--text-field {
  border: 2px solid #2196F3;
  border-radius: 5px;
  transition: box-shadow 0.3s;
}

.v-text-field--outlined .v-input__control--text-field::before,
.v-text-field--outlined .v-input__control--text-field::after {
  border-color: #2196F3;
}

.v-text-field--outlined .v-input__control--text-field:focus {
  box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
}
</style>
