<template>
    <div class="container-xl">
        <form @submit.prevent="">
            <h1 class="text-center mb-4">รายละเอียดงาน</h1>
            <div class="row" v-if="taskDetail">
                <!-- ข้อมูลทั่วไป -->
                <p>ชื่องาน: {{ taskDetail.infoname }}</p>
                <p class="">รายละเอียด: {{ taskDetail.infodetails }}</p>
                <p>วันที่เริ่ม: {{ taskDetail.infostart }}</p>
                <p>วันที่จบ: {{ taskDetail.infoend }}</p>
                <p>ประเภทงาน: {{ taskDetail.infotype }}</p>
                <p>Project Manager: {{ taskDetail.manager }}</p>
                <p>ทีม: {{ taskDetail.team }}</p>

                <!-- แสดงปุ่ม addinfo -->
                <div v-if="!hasAddInfoEntries && !isAddingInfo">
                    <button @click="startAddingInfo" class="btn btn-success mb-3">addinfo</button>
                </div>

                <!-- แสดงฟอร์ม subInputBoxinfo เมื่อกดปุ่ม addinfo และไม่มีข้อมูลใน subInputBoxesinfo -->
                <div v-if="isAddingInfo && !hasAddInfoEntries">
                    <div class="card mb-3">
                        <div class="card-body mb-3">
                            <label class="form-label">รายละเอียด:</label>
                            <textarea class="form-control bg-secondary-custom" rows="3"
                                v-model="newInfoDetails.infodetails"></textarea>
                        </div>
                        <div class="card-body col-2 mb-3">
                            <label class="form-label">วันที่เริ่ม:</label>
                            <input class="form-control bg-secondary-custom" type="date"
                                v-model="newInfoDetails.infostart">
                        </div>
                        <div class="card-body col-2 mb-3">
                            <label class="form-label">วันที่จบ:</label>
                            <input class="form-control bg-secondary-custom" type="date"
                                v-model="newInfoDetails.infoend">
                        </div>
                        <div>
                            <button class="btn btn-danger mb-2" type="button" @click="cancelAddingInfo">ยกเลิก</button>
                            <button class="btn btn-success mb-2" type="button" @click="confirmNewInfo">บันทึก</button>
                        </div>
                    </div>
                </div>

                <!-- แสดงข้อมูลย่อยของ addinfo -->
                <div v-for="(info, infoIndex) in taskDetail.subInputBoxesinfo" :key="infoIndex" class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">รายละเอียด: {{ info.infodetails }}</p>
                        <p class="card-text">วันที่เริ่ม: {{ info.infostart }}</p>
                        <p class="card-text">วันที่จบ: {{ info.infoend }}</p>
                        <div><button @click="EditSub(taskDetail)" class="btn btn-danger">edit</button></div>
                    </div>
                </div>

                <!-- ข้อมูล process ต่างๆ -->
                <div v-for="(process, processIndex) in taskDetail.processes" :key="processIndex" class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">ชื่อ Process: {{ process.procesname }}</h5>
                        <p class="card-text">รายละเอียด: {{ process.procesdetails }}</p>
                        <p class="card-text">วันที่เริ่ม: {{ process.processtart }}</p>
                        <p class="card-text">วันที่จบ: {{ process.procesend }}</p>

                        <!-- แสดงปุ่ม addprocess เฉพาะการ์ดนี้ -->
                        <!-- แสดงปุ่ม addprocess เฉพาะการ์ดนี้ -->
                        <div v-if="!hasAddProcessEntries(processIndex) && !process.isAdding">
                            <button @click="startAddingProcess(processIndex)"
                                class="btn btn-success mb-4 button-right">addprocess</button>
                        </div>

                        <!-- แสดงฟอร์ม subInputBoxprocess เมื่อกดปุ่ม addprocess -->
                        <div v-if="process.isAdding && !hasAddProcessEntries(processIndex)">
                            <div class="card mb-3">
                                <div class="card-body mb-3">
                                    <label class="form-label">รายละเอียด:</label>
                                    <textarea class="form-control bg-secondary-custom" rows="3"
                                        v-model="process.newProcessDetails.procesdetails"></textarea>
                                </div>
                                <div class="card-body col-2 mb-3">
                                    <label class="form-label">วันที่เริ่ม:</label>
                                    <input class="form-control bg-secondary-custom" type="date"
                                        v-model="process.newProcessDetails.processtart">
                                </div>
                                <div class="card-body col-2 mb-3">
                                    <label class="form-label">วันที่จบ:</label>
                                    <input class="form-control bg-secondary-custom" type="date"
                                        v-model="process.newProcessDetails.procesend">
                                </div>
                                <div>
                                    <button class="btn btn-danger mb-2" type="button"
                                        @click="cancelAddingProcess(processIndex)">ยกเลิก</button>
                                    <button class="btn btn-success mb-2" type="button"
                                        @click="confirmNewProcess(processIndex)">บันทึก</button>
                                </div>
                            </div>
                        </div>

                        <!-- ข้อมูลย่อยที่เพิ่มเข้ามา -->
                        <div v-for="(subprocess, subprocessIndex) in process.subProcesses" :key="subprocessIndex"
                            class="card mb-3">
                            <div class="card-body">
                                <p class="card-text">รายละเอียดย่อย: {{ subprocess.procesdetails }}</p>
                                <p class="card-text">วันที่เริ่ม: {{ subprocess.processtart }}</p>
                                <p class="card-text">วันที่จบ: {{ subprocess.procesend }}</p>
                                <div><button @click="EditSub(taskDetail)" class="btn btn-danger">edit</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-9"></div>
                <div class="col-1">
                    <button class="btn btn-danger button-right mb-3" @click="fixinfo(taskDetail)">แก้ไข</button>
                </div>

                <div class="col-2">
                    <button class="btn btn-success but">บันทึก</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import EditSub from './EditSub.vue';

export default {
    data() {
        return {
            taskDetail: null,
            isAddingInfo: false,
            newInfoDetails: {
                infodetails: '',
                infostart: '',
                infoend: ''
            }
        };
    },
    mounted() {
        this.loadTaskDetail();
    },
    computed: {
        hasAddInfoEntries() {
            return this.taskDetail && this.taskDetail.subInputBoxesinfo && this.taskDetail.subInputBoxesinfo.length > 0;
        },
    },
    methods: {
        loadTaskDetail() {
            const allData = JSON.parse(localStorage.getItem('infoData')) || [];
            const taskId = this.$route.query.infoname; // รับค่าจาก query params
            this.taskDetail = allData.find(task => task.infoname === taskId) || null;

            // เพิ่ม property สำหรับการเพิ่ม process ใหม่ในแต่ละ process
            if (this.taskDetail && this.taskDetail.processes) {
                this.taskDetail.processes = this.taskDetail.processes.map(process => ({
                    ...process,
                    isAdding: false,
                    newProcessDetails: {
                        procesdetails: '',
                        processtart: '',
                        procesend: ''
                    },
                    subProcesses: process.subProcesses || []
                }));
            }

            // เพิ่ม property สำหรับการเพิ่ม info ใหม่
            if (this.taskDetail) {
                this.taskDetail.subInputBoxesinfo = this.taskDetail.subInputBoxesinfo || [];
            }
        },
        startAddingInfo() {
            this.isAddingInfo = true;
        },
        cancelAddingInfo() {
            this.isAddingInfo = false;
            this.newInfoDetails = {
                infodetails: '',
                infostart: '',
                infoend: ''
            };
        },
        confirmNewInfo() {
            if (this.newInfoDetails.infodetails && this.newInfoDetails.infostart && this.newInfoDetails.infoend) {
                this.taskDetail.subInputBoxesinfo.push({
                    infodetails: this.newInfoDetails.infodetails,
                    infostart: this.newInfoDetails.infostart,
                    infoend: this.newInfoDetails.infoend
                });

                // บันทึกข้อมูลใหม่ลง localStorage
                const allData = JSON.parse(localStorage.getItem('infoData')) || [];
                const taskIndex = allData.findIndex(task => task.infoname === this.taskDetail.infoname);

                if (taskIndex > -1) {
                    allData[taskIndex] = this.taskDetail;
                    localStorage.setItem('infoData', JSON.stringify(allData));
                    alert('บันทึกข้อมูลใหม่สำเร็จ');
                }

                this.cancelAddingInfo();
            } else {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
        },
        startAddingProcess(processIndex) {
            this.taskDetail.processes[processIndex].isAdding = true;
        },
        cancelAddingProcess(processIndex) {
            this.taskDetail.processes[processIndex].isAdding = false;
            this.taskDetail.processes[processIndex].newProcessDetails = {
                procesdetails: '',
                processtart: '',
                procesend: ''
            };
        },
        confirmNewProcess(processIndex) {
            const process = this.taskDetail.processes[processIndex];
            if (process.newProcessDetails.procesdetails && process.newProcessDetails.processtart && process.newProcessDetails.procesend) {
                process.subProcesses.push({
                    procesdetails: process.newProcessDetails.procesdetails,
                    processtart: process.newProcessDetails.processtart,
                    procesend: process.newProcessDetails.procesend
                });

                // บันทึกข้อมูลใหม่ลง localStorage
                const allData = JSON.parse(localStorage.getItem('infoData')) || [];
                const taskIndex = allData.findIndex(task => task.infoname === this.taskDetail.infoname);

                if (taskIndex > -1) {
                    allData[taskIndex] = this.taskDetail;
                    localStorage.setItem('infoData', JSON.stringify(allData));
                    alert('บันทึกข้อมูลใหม่สำเร็จ');
                }

                this.cancelAddingProcess(processIndex);
            } else {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
        },
        fixinfo(taskDetail) {
            this.$router.push({ name: 'AddInfo', query: { infoname: taskDetail.infoname } });
        },
        hasAddProcessEntries(processIndex) {
            const process = this.taskDetail.processes[processIndex];
            return process && process.subProcesses && process.subProcesses.length > 0;
        },
        EditSub(taskDetail) {
            this.$router.push({ name: 'EditSub', query: {infoname: taskDetail.infoname}});
        }
    }
};
</script>

<style scoped>
.card {
    margin-bottom: 10px;
}

.button-right {
    float: right;
}

.mb-2 {
    margin-bottom: 10px;
}

.mb-3 {
    margin-bottom: 15px;
}

.bg-secondary-custom {
    background-color: #e9ecef;
}

.btn-success {
    background-color: #28a745;
}

.btn-danger {
    background-color: #dc3545;
}
</style>
