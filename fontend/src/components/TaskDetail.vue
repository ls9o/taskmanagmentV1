<template>
  <div class="container-xl">
    <form @submit.prevent="">
      <h1 class="text-center mb-4">รายละเอียดงาน</h1>
      <div class="row" v-if="taskDetail">
        <!-- ข้อมูลทั่วไป -->
        <div>
          <div class="row">
            <p class="col-8">ชื่องาน: {{ taskDetail.infoname }}</p>
            <p class="col-2">ความคืบหน้าจริง: {{ status }} </p>
            <p class="col-2">ความคืบหน้า: {{ progressPercentage }} %</p>
          </div>
          <p>รายละเอียด: {{ taskDetail.infodetails }}</p>
          <div class="row">
            <p class="col-2">วันที่เริ่ม: {{ taskDetail.infostart }}</p>
            <p class="col-2">วันที่จบ: {{ taskDetail.infoend }}</p>
          </div>
          <p>จำนวนวันทั้งหมด: {{ taskDetail.dayDiff }}</p>
          <p>ประเภทงาน: {{ taskDetail.infotype }}</p>
          <p>Project Manager: {{ taskDetail.manager }}</p>
          <p>ทีม: {{ taskDetail.team }}</p>
        </div>

        <!-- แสดงปุ่ม addinfo -->
        <div v-if="!hasAddInfoEntries && !isAddingInfo">
          <button @click="startAddingInfo" class="btn btn-secondary mb-3">ยืนยันแผน</button>
        </div>

        <!-- แสดงฟอร์ม subInputBoxinfo เมื่อกดปุ่ม addinfo และไม่มีข้อมูลใน subInputBoxesinfo -->
        <div v-if="isAddingInfo && !hasAddInfoEntries">
          <div class="card mb-3">
            <div class="card-body mb-2">
              <label class="form-label">รายละเอียด:</label>
              <textarea class="form-control bg-secondary-custom" rows="2"
                v-model="newInfoDetails.infodetails"></textarea>
            </div>
            <div class="row">
              <div class="card-body col-2 mb-3 ms-2">
                <label class="form-label">วันที่เริ่ม:</label>
                <input class="form-control bg-secondary-custom" type="date" v-model="newInfoDetails.infostart">
              </div>
              <div class="card-body col-2 mb-3">
                <label class="form-label">วันที่จบ:</label>
                <input class="form-control bg-secondary-custom" type="date" v-model="newInfoDetails.infoend">
              </div>
              <div class="col-6"></div>
            </div>

            <div class="d-flex justify-content-end pe-3">
              <button class="btn btn-success mb-2 me-2" type="button" @click="confirmNewInfo">บันทึก</button>
              <button class="btn btn-danger mb-2" type="button" @click="cancelAddingInfo">ยกเลิก</button>
            </div>
          </div>
        </div>

        <!-- แสดงข้อมูลย่อยของ addinfo -->
        <div v-for="(info, infoIndex) in taskDetail.subInputBoxesinfo" :key="infoIndex" class="card mb-3">
          <div class="card-body">
            <p class="card-text">รายละเอียด: {{ info.infodetails }}</p>
            <p class="card-text">วันที่เริ่ม: {{ info.infostart }}</p>
            <p class="card-text">วันที่จบ: {{ info.infoend }}</p>
            <div><button @click="editSub(taskDetail, info)" class="btn btn-primary">แก้ไข</button></div>
          </div>
        </div>

        <!-- ข้อมูล process ต่างๆ -->
        <div v-for="(process, processIndex) in taskDetail.processes" :key="processIndex" class="card mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h5 class="card-title">ชื่อ Process: {{ process.procesname }}</h5>
                <p class="card-text">รายละเอียด: {{ process.procesdetails }}</p>
                <p class="card-text">จำนวนวันทำงาน: {{ process.processtart }} <label>วัน</label></p>
                <p class="card-text">วันกำหนดส่ง: {{ process.procesend }}</p>
              </div>
              <!-- ข้อมูลย่อยที่เพิ่มเข้ามา -->
              <div class="col-6">
                <div v-for="(subprocess, subprocessIndex) in process.subProcesses" :key="subprocessIndex"
                  class="card mb-3">
                  <div class="card-body">
                    <p class="card-text">รายละเอียดย่อย: {{ subprocess.procesdetails }}</p>
                    <p class="card-text">จำนวนวันทำงาน: {{ subprocess.processtart }} <label>วัน</label></p>
                    <p class="card-text">กำหนดการส่ง: {{ subprocess.procesend }}</p>
                    <div><button @click="editSub(taskDetail, subprocess)" class="btn btn-primary">แก้ไข</button></div>
                  </div>
                </div>
              </div>
            </div>
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

                <div class="row">
                  <div class="card-body col-2 mb-3 ms-2">
                    <label class="form-label">จำนวนวันทำงาน:</label>
                    <input class="form-control bg-secondary-custom" type="number"
                      v-model="process.newProcessDetails.processtart">
                  </div>
                  <div class="card-body col-2 mb-3">
                    <label class="form-label">กำหนดการส่ง:</label>
                    <input class="form-control bg-secondary-custom" type="date"
                      v-model="process.newProcessDetails.procesend">
                  </div>
                  <div class="col-6"></div>
                </div>
                <div class="d-flex justify-content-end pe-3">
                  <button class="btn btn-success mb-2 me-2" type="button"
                    @click="confirmNewProcess(processIndex)">บันทึก</button>
                  <button class="btn btn-danger mb-2 " type="button"
                    @click="cancelAddingProcess(processIndex)">ยกเลิก</button>
                </div>

              </div>
            </div>


          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-10"></div>
        <div class="col-2">
          <button class="btn btn-primary button-right mb-3 " @click="fixinfo(taskDetail)">แก้ไข</button>
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
      processes: JSON.parse(localStorage.getItem('processes')) || [], // ดึงค่า processes จาก Local Storage
      dayDiff: JSON.parse(localStorage.getItem('dayDiff')) || 0,      // ดึงค่า dayDiff จาก Local Storage
      Percentage: 0,
      date: new Date(),
      newInfoDetails: {   // ข้อมูลที่จะถูกเพิ่มใน Info ใหม่
        infodetails: '', // รายละเอียดใหม่ของ Info
        infostart: '',   // วันที่เริ่มของ Info ใหม่
        infoend: ''      // วันที่สิ้นสุดของ Info ใหม่
      }
    };
  },
  mounted() {
    this.loadTaskDetail(); // เรียกใช้ฟังก์ชันเพื่อโหลดรายละเอียดของ task เมื่อคอมโพเนนต์ถูก mount
    this.progressPercentage;
    this.updateStatusInLocalStorage();
  },
  computed: {
    // เป็น property ที่คำนวณว่าจะคืนค่า true หรือ false
    hasAddInfoEntries() {
      return this.taskDetail && this.taskDetail.subInputBoxesinfo && this.taskDetail.subInputBoxesinfo.length > 0;
    },
    progressPercentage() {
      if (!this.taskDetail || !this.taskDetail.dayDiff || this.taskDetail.dayDiff <= 0) {
        return 0;
      }

      let totalCompletedDays = 0;
      let totalDays = this.taskDetail.dayDiff;

      this.taskDetail.processes.forEach(process => {
        if (process.subProcesses.length > 0) {
          totalCompletedDays += process.processtart;
        }
      });

      const progressPercentage = ((totalCompletedDays / totalDays) * 100).toFixed(2);

      // Update progressPercentage in infoData and save to Local Storage
      let allData = JSON.parse(localStorage.getItem('infoData')) || [];

      // Find the task that needs to be updated
      let taskIndex = allData.findIndex(item => item.infoname === this.taskDetail.infoname);

      if (taskIndex !== -1) {
        // Update the progressPercentage for the task
        allData[taskIndex].progressPercentage = progressPercentage;
      }

      // Save the updated infoData back to Local Storage
      localStorage.setItem('infoData', JSON.stringify(allData));

      return progressPercentage;
    },
    trueprogressPercentage() {
      if (!this.taskDetail || !this.taskDetail.infostart || !this.taskDetail.infoend || !this.taskDetail.dayDiff || this.taskDetail.dayDiff <= 0) {
        return 0;
      }

      const startDate = new Date(this.taskDetail.infostart);
      const endDate = new Date(this.taskDetail.infoend);
      const currentDate = this.date;

      // ถ้าวันที่เริ่มต้นยังไม่ถึงหรือวันที่สิ้นสุดเกินแล้ว ให้ progress เป็น 0% หรือ 100%
      if (currentDate < startDate) {
        return 0;
      } else if (currentDate > endDate) {
        return 100;
      }

      // คำนวณจำนวนวันที่ผ่านไปแล้ว
      const elapsedDays = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));

      // คำนวณ progress จากวันที่ผ่านไปเมื่อเทียบกับ dayDiff
      const progressPercentage = Math.min((elapsedDays / this.taskDetail.dayDiff) * 100, 100).toFixed(2);

      // อัปเดต progressPercentage ใน localStorage
      let allData = JSON.parse(localStorage.getItem('infoData')) || [];
      let taskIndex = allData.findIndex(item => item.infoname === this.taskDetail.infoname);

      if (taskIndex !== -1) {
        allData[taskIndex].trueprogressPercentage = progressPercentage;
        localStorage.setItem('infoData', JSON.stringify(allData));
      }

      return progressPercentage;
    },
    status() {
      const today = this.date;
      const startDate = new Date(this.taskDetail.infostart);
      const endDate = new Date(this.taskDetail.infoend);

      if (today < startDate) {
        return "In Coming";
      } else if (today > endDate) {
        return "Done";
      } else {
        return `${this.trueprogressPercentage}%`;
      }
    },
    formattedDate() {
      return this.date.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
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
          // ย้ายการกำหนดค่า newProcessDetails ออกจากที่นี่
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
      this.taskDetail.processes[processIndex].isAdding = true;
      this.taskDetail.processes[processIndex].newProcessDetails = {
        procesdetails: '',
        processtart: '',
        procesend: ''
      };
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

      // ตรวจสอบว่าค่าใหม่ไม่เป็นค่าว่างก่อนที่จะบันทึก
      if (newProcessDetails.procesdetails.trim() !== '' && newProcessDetails.processtart !== '' && newProcessDetails.procesend !== '') {
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
    updateStatusInLocalStorage() {
      const today = new Date(); // วันที่ปัจจุบัน
      const startDate = new Date(this.taskDetail.infostart);
      const endDate = new Date(this.taskDetail.infoend);

      let statusprogress;
      if (today < startDate) {
        statusprogress = "in coming";
      } else if (today > endDate) {
        statusprogress = "done";
      } else {
        statusprogress = `${this.trueprogressPercentage}%`;
      }

      // อัปเดต statusprogress ใน localStorage
      let allData = JSON.parse(localStorage.getItem('infoData')) || [];
      let taskIndex = allData.findIndex(item => item.infoname === this.taskDetail.infoname);

      if (taskIndex !== -1) {
        allData[taskIndex].statusprogress = statusprogress;
        localStorage.setItem('infoData', JSON.stringify(allData));
      }
    },
  }
};
</script>

<style scoped>
@import './Sass/Taskdetail.scss';
</style>
