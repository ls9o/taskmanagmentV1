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
          <textarea class="form-control bg-secondary-custom shadow-sm p-3 mb-5 bg-body-tertiary rounded" rows="3" v-model="Datainfo.infodetails"></textarea>
        </div>
        <div class="row">
          <div class="col-md-2 mb-3">
            <label class="form-label">วันที่เริ่ม:</label>
            <input class="form-control bg-secondary-custom" type="date" v-model="Datainfo.infostart">
          </div>
        </div>
        <div class="row">
          <div class="col-2 mb-3">
            <label class="form-label">วันที่จบ:</label>
            <input class="form-control bg-secondary-custom" type="date" v-model="Datainfo.infoend">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">ประเภทงาน:</label><br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="internal" value="ภายใน" v-model="Datainfo.infotype">
              <label class="form-check-label" for="internal">ภายใน</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="procurement" value="จัดซื้อจัดจ้าง" v-model="Datainfo.infotype">
              <label class="form-check-label" for="procurement">จัดซื้อจัดจ้าง</label>
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
              <label class="form-label">ชื่อ process:</label>
              <input class="form-control bg-secondary-custom" type="text" v-model="subInputBox.procesname">
            </div>
            <div class="mb-3">
              <label class="form-label">รายละเอียด:</label>
              <textarea class="form-control bg-secondary-custom" rows="3" v-model="subInputBox.procesdetails"></textarea>
            </div>
            <div class="col-2 mb-3">
              <label class="form-label">วันที่เริ่ม:</label>
              <input class="form-control bg-secondary-custom" type="date" v-model="subInputBox.processtart">
            </div>
            <div class="col-2 mb-3">
              <label class="form-label">วันที่จบ:</label>
              <input class="form-control bg-secondary-custom" type="date" v-model="subInputBox.procesend">
            </div>
            <button class="btn btn-danger me-2" type="button" @click="delProcess(index)">ลบ</button>
          </div>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="addProcess">เพิ่ม process</button>
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
        processes: []
      },
      subInputBoxes: [],
      managers: ['Manager1', 'Manager2', 'Manager3'],
      teams: ['Team1', 'Team2', 'Team3']
    };
  },
  created() {
    this.loadTaskData();
  },
  methods: {
    loadTaskData() {
      const allData = JSON.parse(localStorage.getItem('infoData')) || [];
      const taskId = this.$route.query.infoname;
      const taskData = allData.find(task => task.infoname === taskId);

      if (taskData) {
        this.Datainfo = taskData;
        this.subInputBoxes = taskData.processes;
      }
    },
    confirminfo() {
      this.Datainfo.processes = this.subInputBoxes;

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

      localStorage.setItem('infoData', JSON.stringify(allData));
      alert('บันทึกข้อมูลสำเร็จ');
      this.$router.push({ name: 'TaskDetail', query: { infoname: this.Datainfo.infoname } });
    },
    addProcess() {
      this.subInputBoxes.push({
        procesname: '',
        procesdetails: '',
        processtart: '',
        procesend: ''
      });
    },
    delProcess(index) {
      this.subInputBoxes.splice(index, 1);
    }
  }
};
</script>
