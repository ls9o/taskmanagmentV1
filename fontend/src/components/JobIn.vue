<template>
    <div class="container-fluid">
        <div class="row vh-100">
            <div class="col-12 border-bottom section-half">
                <h1>My Project</h1>
                <div v-if="datainfo.length > 0">
                    <div class="card" v-for="(item, index) in datainfo" :key="index">
                        <div class="card-body">
                            <span>num{{ item.index }}</span>
                            <span>name : {{ item.name }}</span>
                            <span>detail : {{ item.detail }}</span>
                            <span>DayStart : {{ item.datestart }}</span>
                            <span>DayEnd : {{ item.dateend }}</span>
                            <button type="button" class="btn button-right"><i
                                    class="fa-solid fa-square-pen"></i></button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1>no Result</h1>
                </div>
            </div>
            <div class="col-12 border-top section-half">
                <h1>In Team</h1>
                <div v-if="datainteam.length > 0">
                    <div class="card" v-for="(item, index) in datainfo" :key="index">
                        <div class="card-body">
                            <span>name : {{ item.name }}</span>
                            <span>detail : {{ item.detail }}</span>
                            <span>DayStart : {{ item.datestart }}</span>
                            <span>DayEnd : {{ item.dateend }}</span>
                            <button type="button" class="btn button-right"><i class="fa-solid fa-square-pen"></i></button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1>no Result</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            inputData: '',
            savedData: '',
            datainfo: [

            ],
            datainteam: [

            ]
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