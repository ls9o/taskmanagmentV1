<template>
  <div class="container-xl">
    <form @submit.prevent="confirminfo" class="row">
      <div class="col-12">
        <div class="mb-3">
          <label class="form-label">ชื่องาน:</label>
          <input class="form-control bg-secondary-custom" type="text" v-model="Datainfo.infoname">
        </div>
        <div class="mb-3">
          <label class="form-label">รายละเอียด:</label>
          <textarea class="form-control bg-secondary-custom" rows="3" v-model="Datainfo.infodetails"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">วันที่เริ่ม:</label>
          <input class="form-control bg-secondary-custom" type="date" v-model="Datainfo.infostart">
        </div>
        <div class="mb-3">
          <label class="form-label">วันที่จบ:</label>
          <input class="form-control bg-secondary-custom" type="date" v-model="Datainfo.infoend">
        </div>
        <div class="mb-3">
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
        <div class="col-2 mb-3">
          <label class="form-label">Project Manager:</label>
          <select class="form-control bg-secondary-custom" v-model="Datainfo.manager">
            <option v-for="manager in managers" :key="manager" :value="manager">{{ manager }}</option>
          </select>
        </div>
        <div class="col-2 mb-3">
          <label class="form-label">invite team:</label>
          <select class="form-control bg-secondary-custom" v-model="Datainfo.team">
            <option v-for="team in teams" :key="team" :value="team">{{ team }}</option>
          </select>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="addProcess">เพิ่ม process</button>
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
            <div class="mb-3">
              <label class="form-label">วันที่เริ่ม:</label>
              <input class="form-control bg-secondary-custom" type="date" v-model="subInputBox.processtart">
            </div>
            <div class="mb-3">
              <label class="form-label">วันที่จบ:</label>
              <input class="form-control bg-secondary-custom" type="date" v-model="subInputBox.procesend">
            </div>
            <button class="btn btn-danger me-2" type="button" @click="delProcess(index)">ลบ</button>
            <button class="btn btn-success" type="button">บันทึก</button>
          </div>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-success button-right">ยืนยัน</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
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
      managers: ['Manager1', 'Manager2', 'Manager3'], // ตัวอย่างชื่อ Project Manager
      teams: ['Team1', 'Team2', 'Team3'] // ตัวอย่างชื่อทีม
    };
  },
  methods: {
    async confirminfo() {
      try {
        this.Datainfo.processes = this.subInputBoxes;
        const response = await axios.post('http://127.0.0.1:8000/infos/', this.Datainfo);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
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

<style scoped>
@import './Sass/Addinfo.scss';
</style>
