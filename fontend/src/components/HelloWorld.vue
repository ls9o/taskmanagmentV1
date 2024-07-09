<template>
  <div class="container">
  <div class="card">
    <div class="card-body">Basic card</div>
    <button type="button" class="btn btn-info">Info</button>
  </div>

</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputData: '',
      savedData: ''
    };
  },
  methods: {
    async saveData() {
      try {
        await axios.post('http://localhost:8000/api/save', { data: this.inputData });
        this.loadData();
      } catch (error) {
        console.error('Error saving data', error);
      }
    },
    async loadData() {
      try {
        const response = await axios.get('http://localhost:8000/api/load');
        console.log('Response data:', response.data);  // ตรวจสอบ response
        this.savedData = response.data.data || 'No data saved';
        console.log('Saved data:', this.savedData);  // ตรวจสอบ savedData
      } catch (error) {
        console.error('Error loading data', error);
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
@import './Sass/Homepage.scss';
</style>