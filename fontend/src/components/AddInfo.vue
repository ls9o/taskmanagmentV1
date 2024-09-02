<template>
  <div class="container-xl">
    <h1 class="text-center mb-4">Create Tasks</h1>
    <form @submit.prevent="confirminfo" class="row">
      <div class="col-12">
        <div class="mb-3">
          <label class="form-label">ชื่องาน:</label>
          <input class="form-control bg-secondary-custom shadow-sm p-3 mb-5 bg-body-tertiary rounded" type="text" v-model="Datainfo.infoname">
        </div>
        <div class="mb-3">
          <label class="form-label">รายละเอียด:</label>
          <textarea class="form-control bg-secondary-custom shadow-sm p-3 mb-5 bg-body-tertiary rounded" rows="1" v-model="Datainfo.infodetails"></textarea>
        </div>
        <div class="row">
          <div class="col-md-2 mb-3">
            <label class="form-label">วันที่เริ่ม:</label>
            <input class="form-control bg-secondary-custom" type="date" v-model="Datainfo.infostart">
          </div>

          <div class="col-2 mb-3">
            <label class="form-label">วันที่จบ:</label>
            <input class="form-control bg-secondary-custom" type="date" v-model="Datainfo.infoend">
          </div>
        </div>
        <div class="col-2 mb-3">
            <label class="form-label">จำนวนวัน:</label>
            <input class="form-control bg-secondary-custom" type="text" :value="daysBetween" readonly>
          </div>
        <div class="row">
          <div class="col-md-8 mb-3">
            <label class="form-label">ประเภทงาน:</label><br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="internal" value="ภายใน" v-model="Datainfo.infotype">
              <label class="form-check-label athiti-medium" for="internal ">ภายใน</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="procurement" value="จัดซื้อจัดจ้าง" v-model="Datainfo.infotype">
              <label class="form-check-label athiti-medium" for="procurement">จัดซื้อจัดจ้าง</label>
            </div>
          </div>
          <div class="col-md-2 mb-4">
            <label class="form-label">Project Manager:</label>
            <select class="form-control bg-secondary-custom" v-model="Datainfo.manager">
              <option v-for="manager in managers" :key="manager" :value="manager">{{ manager }}</option>
            </select>
          </div>
          <div class="col-md-2 mb-5">
            <label class="form-label">invite team:</label>
            <select class="form-control bg-secondary-custom" v-model="Datainfo.team">
              <option v-for="team in teams" :key="team" :value="team">{{ team }}</option>
            </select>
          </div>
        </div>
        <div v-for="(subInputBox, index) in subInputBoxes" :key="index" class="card mb-3">
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label ">ชื่อ process:</label>
              <input class="form-control bg-secondary-custom" type="text" v-model="subInputBox.procesname">
            </div>
            <div class="mb-3">
              <label class="form-label">รายละเอียด:</label>
              <textarea class="form-control bg-secondary-custom" rows="1" v-model="subInputBox.procesdetails"></textarea>
            </div>
            <div class="row">
            <div class="col-2 mb-3">
              <label class="form-label">จำนวนวันทำงาน:</label>
              <input class="form-control bg-secondary-custom" type="number" v-model="subInputBox.processtart">
            </div>
            <div class="col-2 mb-3">
              <label class="form-label">กำหนดการส่ง:</label>
              <input class="form-control bg-secondary-custom" type="date" v-model="subInputBox.procesend">
            </div>
          </div>
            <button class="btn btn-danger me-2" type="button" @click="delProcess(index)">ลบ</button>
          </div>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-secondary" @click="addProcess">add process</button>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-success button-right mb-3">ยืนยัน</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
data() {
    return {
      Datainfo: {
        infoname: '',
        infodetails: '',
        infostart: '',
        infoend: '',
        infotype: '',
        manager: '',
        team: '',
        processes: [],
        
      },
      subInputBoxes: [],
      managers: ['Manager1', 'Manager2', 'Manager3'],
      teams: ['Team1', 'Team2', 'Team3']
    };
  },
  created() {
    this.loadTaskData();
  },
  computed: {
  daysBetween() {
    const startDate = new Date(this.Datainfo.infostart);
    const endDate = new Date(this.Datainfo.infoend);

    if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
      const timeDiff = endDate - startDate;
      const validDayDiff = timeDiff / (1000 * 60 * 60 * 24);

      // โหลดข้อมูลจาก Local Storage
      let allData = JSON.parse(localStorage.getItem('infoData')) || [];

      // หาตำแหน่งของ task ที่ต้องการอัปเดต
      let taskIndex = allData.findIndex(item => item.infoname === this.Datainfo.infoname);

      // ถ้าพบข้อมูลที่ต้องการอัปเดต
      if (taskIndex !== -1) {
        // อัปเดตค่า validDayDiff
        allData[taskIndex].dayDiff = validDayDiff >= 0 ? validDayDiff : 0;
      }

      // เก็บข้อมูลกลับลงใน Local Storage
      localStorage.setItem('infoData', JSON.stringify(allData));

      return validDayDiff >= 0 ? validDayDiff : 0;
    }

    return 0; // หากข้อมูลยังไม่ครบ ให้คืนค่า 0
  }
},
  methods: {
    // loadTaskData ไว้ดึงข้อมูลจาก card ที่เราต้องการแก้ไข
    loadTaskData() {
      const allData = JSON.parse(localStorage.getItem('infoData')) || [];
      const taskId = this.$route.query.infoname;
      const taskData = allData.find(task => task.infoname === taskId);

      if (taskData) {
        this.Datainfo = taskData;
        this.subInputBoxes = taskData.processes;
      }
    },
    // confirminfo เมื่อกดปุ่มยืนยันจะบันทึกข้อมูลทั้งหมดที่กรอกพร้อมกับprocessย่อย
    confirminfo() {
  this.Datainfo.processes = this.subInputBoxes; //นำค่า SubInputBoxes มาเมื่อแก้ไขข้อมูลจาก component มาแทนค่า Processes

  // อัปเดตค่า dayDiff ใน Datainfo
  this.Datainfo.dayDiff = this.daysBetween; 

  let allData = JSON.parse(localStorage.getItem('infoData')) || []; 
  const newEntry = { ...this.Datainfo }; // Clone Datainfo to avoid reference issues

  // Check if there is already an entry with the same `infoname`
  const existingIndex = allData.findIndex(entry => entry.infoname === newEntry.infoname);

  if (existingIndex > -1) {
    // If found, update the existing entry
    allData[existingIndex] = newEntry;
  } else {
    // If not found, add a new entry
    allData.push(newEntry);
  }

  localStorage.setItem('infoData', JSON.stringify(allData));  // นำข้อมูลที่ update แล้วกลับไปเก็บใน localStorage ภายใต้ Key infoData
  alert('บันทึกข้อมูลสำเร็จ');
  this.$router.push({ name: 'TaskDetail', query: { infoname: this.Datainfo.infoname } });
},

    // เมื่อกดปุ่ม addprocess เพิ่มข้อมูลสำหรับกรอก proces ย่อย
    addProcess() {
      this.subInputBoxes.push({
        procesname: '',
        procesdetails: '',
        processtart: '',
        procesend: ''
      });
    },
    // ลบข้อมูลย่อย
    delProcess(index) {
      this.subInputBoxes.splice(index, 1);
    }
  }
};
</script>
