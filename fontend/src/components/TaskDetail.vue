<template>
  <div class="container-xl">
    <form @submit.prevent="">
      <h1 class="text-center mb-4">รายละเอียดงาน</h1>
      <p>ความคืบหน้า: {{ progressPercentage }}%</p>
      <div class="row" v-if="taskDetail">
        <!-- ข้อมูลทั่วไป -->
        <div>
          <p>ชื่องาน: {{ taskDetail.infoname }}</p>
          <p>รายละเอียด: {{ taskDetail.infodetails }}</p>
          <p>วันที่เริ่ม: {{ taskDetail.infostart }}</p>
          <p>วันที่จบ: {{ taskDetail.infoend }}</p>
          <p>ประเภทงาน: {{ taskDetail.infotype }}</p>
          <p>Project Manager: {{ taskDetail.manager }}</p>
          <p>ทีม: {{ taskDetail.team }}</p>
        </div>

        <!-- แสดงปุ่ม addinfo -->
        <div v-if="!hasAddInfoEntries && !isAddingInfo">
          <button @click="startAddingInfo" class="btn btn-secondary mb-3">addinfo</button>
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
              <input class="form-control bg-secondary-custom" type="date" v-model="newInfoDetails.infostart">
            </div>
            <div class="card-body col-2 mb-3">
              <label class="form-label">วันที่จบ:</label>
              <input class="form-control bg-secondary-custom" type="date" v-model="newInfoDetails.infoend">
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
            <div><button @click="editSub(taskDetail, info)" class="btn btn-primary">edit Info</button></div>
          </div>
        </div>

        <!-- ข้อมูล process ต่างๆ -->
        <div v-for="(process, processIndex) in taskDetail.processes" :key="processIndex" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">ชื่อ Process: {{ process.procesname }}</h5>
            <p class="card-text">รายละเอียด: {{ process.procesdetails }}</p>
            <p class="card-text">จำนวนวันทำงาน: {{ process.processtart }} <label>วัน</label></p>
            <p class="card-text">วันที่จบ: {{ process.procesend }}</p>

            <!-- แสดงปุ่ม addprocess เฉพาะการ์ดนี้ -->
            <div v-if="!hasAddProcessEntries(processIndex) && !process.isAdding">
              <button @click="startAddingProcess(processIndex)"
                class="btn btn-secondary mb-4 button-right">addprocess</button>
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
                  <label class="form-label">จำนวนวันทำงาน:</label>
                  <input class="form-control bg-secondary-custom" type="number"
                    v-model="process.newProcessDetails.processtart">
                </div>
                <div class="card-body col-2 mb-3">
                  <label class="form-label">กำหนดการส่ง:</label>
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
            <div v-for="(subprocess, subprocessIndex) in process.subProcesses" :key="subprocessIndex" class="card mb-3">
              <div class="card-body">
                <p class="card-text">รายละเอียดย่อย: {{ subprocess.procesdetails }}</p>
                <p class="card-text">จำนวนวันทำงาน: {{ subprocess.processtart }} <label>วัน</label></p>
                <p class="card-text">กำหนดการส่ง: {{ subprocess.procesend }}</p>
                <div><button @click="editSub(taskDetail, subprocess)" class="btn btn-primary">edit
                    Process</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-9"></div>
        <div class="col-1">
          <button class="btn btn-primary button-right mb-3" @click="fixinfo(taskDetail)">แก้ไข</button>
        </div>

        <div class="col-2">
          <button class="btn btn-success but">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskDetail: null,   // เก็บข้อมูลรายละเอียดของ task
      isAddingInfo: false, // ตรวจสอบว่ากำลังเพิ่มข้อมูล Info อยู่หรือไม่
      newInfoDetails: {   // ข้อมูลที่จะถูกเพิ่มใน Info ใหม่
        infodetails: '', // รายละเอียดใหม่ของ Info
        infostart: '',   // วันที่เริ่มของ Info ใหม่
        infoend: ''      // วันที่สิ้นสุดของ Info ใหม่
      }
    };
  },
  mounted() {
    this.loadTaskDetail(); // เรียกใช้ฟังก์ชันเพื่อโหลดรายละเอียดของ task เมื่อคอมโพเนนต์ถูก mount
  },
  computed: {
    // เป็น property ที่คำนวณว่าจะคืนค่า true หรือ false
    hasAddInfoEntries() {
      return this.taskDetail && this.taskDetail.subInputBoxesinfo && this.taskDetail.subInputBoxesinfo.length > 0;
    },
    progressPercentage() {
        if (!this.taskDetail || !this.taskDetail.processes) return 0;

        const totalProcesses = this.taskDetail.processes.length;
        let totalProgress = 0;

        // วนลูปเพื่อคำนวณเปอร์เซ็นต์ความคืบหน้าของ subprocess ในแต่ละ process
        this.taskDetail.processes.forEach((process) => {
            const totalSubProcesses = process.subProcesses.length;
            const completedSubProcesses = process.subProcesses.length; // สมมติว่าทั้งหมดสมบูรณ์

            if (totalSubProcesses > 0) {
                totalProgress += (completedSubProcesses / totalSubProcesses) * (1 / totalProcesses) * 100;
            }
        });

        const progressPercentage = totalProgress.toFixed(2); // เปอร์เซ็นต์ความคืบหน้าโดยรวม

        // บันทึกลงใน infoData
        let allData = JSON.parse(localStorage.getItem('infoData')) || [];

        // ค้นหา task ที่ต้องการอัปเดต
        let taskIndex = allData.findIndex(item => item.infoname === this.taskDetail.infoname);

        if (taskIndex !== -1) {
            // อัปเดต progressPercentage
            allData[taskIndex].progressPercentage = progressPercentage;
        }

        // เก็บข้อมูลกลับลงใน Local Storage
        localStorage.setItem('infoData', JSON.stringify(allData));

        return progressPercentage;
    }
  },
  methods: {

    loadTaskDetail() {
      const allData = JSON.parse(localStorage.getItem('infoData')) || []; // ดึงข้อมูลทั้งหมดจาก Local Storage
      const taskId = this.$route.query.infoname; // ดึงชื่อ info จาก query ใน route
      this.taskDetail = allData.find(task => task.infoname === taskId) || null; // ค้นหางานตามชื่องาน (infoname) ในข้อมูลทั้งหมด

      // เพิ่ม property สำหรับการเพิ่ม process ใหม่ในแต่ละ process
      if (this.taskDetail && this.taskDetail.processes) {
        this.taskDetail.processes = this.taskDetail.processes.map(process => ({
          ...process,
          isAdding: false, // ตรวจสอบว่า process กำลังเพิ่มอยู่หรือไม่
          newProcessDetails: {
            procesdetails: '',  // รายละเอียดของ process ใหม่
            processtart: '',    // จำนวนวันทำงานใหม่
            procesend: ''       // วันที่สิ้นสุดใหม่
          },
          subProcesses: process.subProcesses || []    // เก็บข้อมูล subProcesses ถ้ามี
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
      this.isAddingInfo = false;  // ยกเลิกการเพิ่ม info
      this.newInfoDetails = { // เคลียร์ข้อมูลในฟอร์ม
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
      this.taskDetail.processes[processIndex].isAdding = true;    // เริ่มต้นการเพิ่ม process ใหม่ใน index ที่ระบุ
    },
    cancelAddingProcess(processIndex) {
      this.taskDetail.processes[processIndex].isAdding = false;   // ยกเลิกการเพิ่ม process ใหม่
      this.taskDetail.processes[processIndex].newProcessDetails = {
        procesdetails: '',
        processtart: '',
        procesend: ''
      };
    },
    confirmNewProcess(processIndex) {
      const newProcessDetails = this.taskDetail.processes[processIndex].newProcessDetails;
      if (newProcessDetails.procesdetails && newProcessDetails.processtart && newProcessDetails.procesend) {
        this.taskDetail.processes[processIndex].subProcesses.push({
          procesdetails: newProcessDetails.procesdetails,
          processtart: newProcessDetails.processtart,
          procesend: newProcessDetails.procesend
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
    editSub(taskDetail, subItem) {
      const editType = subItem.infodetails ? 'info' : 'process';
      this.$router.push({
        name: 'EditSub',
        query: {
          infoname: taskDetail.infoname,
          editType: editType,
          editDetail: subItem.infodetails || subItem.procesdetails
        },
        params: {
          isDate: editType === 'info'  // ตั้งค่า isDate เป็น true หรือ false ตามประเภท
        }
      });
    },
    hasAddProcessEntries(processIndex) {
      return this.taskDetail.processes[processIndex].subProcesses.length > 0;
    },
    fixinfo(taskDetail) {
      this.$router.push({ name: 'AddInfo', query: { infoname: taskDetail.infoname } });
    },

  }
};
</script>

<style scoped>
@import './Sass/Taskdetail.scss';
</style>