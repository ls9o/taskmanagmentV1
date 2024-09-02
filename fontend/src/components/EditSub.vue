<template>
  <div class="container-xl">
    <form @submit.prevent="confirmEdit">
      <h1 class="text-center mb-4">แก้ไขข้อมูล</h1>
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">รายละเอียด:</label>
          <textarea class="form-control bg-secondary-custom" rows="3" v-model="editData.editDetail"></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <div v-if="isDate" class="col-6">
          <label class="form-label">วันที่เริ่ม:</label>
          <input class="form-control bg-secondary-custom" type="date" v-model="editData.editStart">
        </div>
        <div class="col-6" v-if="!isDate">
          <label class="form-label">จำนวนวันทำงาน:</label>
          <input class="form-control bg-secondary-custom" type="number" v-model="editData.workingDays">
        </div>
        <div class="col-6">
          <label class="form-label">วันที่จบ:</label>
          <input class="form-control bg-secondary-custom" type="date" v-model="editData.editEnd">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-danger button-right" type="button" @click="cancelEdit">ยกเลิก</button>
          <button class="btn btn-success button-right" type="submit">บันทึก</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editData: {
        editDetail: '',
        editStart: '',
        editEnd: '',
        workingDays: ''
      },
      isDate: true // สมมติให้ค่าเริ่มต้น
    };
  },
  created() {
    const taskDetail = JSON.parse(localStorage.getItem('infoData')).find(task => task.infoname === this.$route.query.infoname);
    if (taskDetail) {
      if (this.$route.query.editType === 'info') {
        const subTask = taskDetail.subInputBoxesinfo.find(sub => sub.infodetails === this.$route.query.editDetail);
        if (subTask) {
          this.editData.editDetail = subTask.infodetails;
          this.editData.editStart = subTask.infostart;
          this.editData.editEnd = subTask.infoend;
          this.isDate = true;
        }
      } else if (this.$route.query.editType === 'process') {
        taskDetail.processes.forEach(process => {
          const subProcess = process.subProcesses.find(sub => sub.procesdetails === this.$route.query.editDetail);
          if (subProcess) {
            this.editData.editDetail = subProcess.procesdetails;
            this.editData.workingDays = subProcess.processtart;
            this.editData.editEnd = subProcess.procesend;
            this.isDate = false;
          }
        });
      }
    }
  },
  methods: {
    confirmEdit() {
      const allData = JSON.parse(localStorage.getItem('infoData'));
      const taskDetail = allData.find(task => task.infoname === this.$route.query.infoname);
      if (taskDetail) {
        if (this.$route.query.editType === 'info') {
          const subTaskIndex = taskDetail.subInputBoxesinfo.findIndex(sub => sub.infodetails === this.$route.query.editDetail);
          if (subTaskIndex !== -1) {
            taskDetail.subInputBoxesinfo[subTaskIndex] = {
              infodetails: this.editData.editDetail,
              infostart: this.editData.editStart,
              infoend: this.editData.editEnd,
            };
          }
        } else if (this.$route.query.editType === 'process') {
          taskDetail.processes.forEach(process => {
            const subProcessIndex = process.subProcesses.findIndex(sub => sub.procesdetails === this.$route.query.editDetail);
            if (subProcessIndex !== -1) {
              process.subProcesses[subProcessIndex] = {
                procesdetails: this.editData.editDetail,
                processtart: this.editData.workingDays,
                procesend: this.editData.editEnd,
              };
            }
          });
        }
        localStorage.setItem('infoData', JSON.stringify(allData));
        alert('บันทึกการแก้ไขสำเร็จ');
        this.$router.push({ name: 'TaskDetail', query: { infoname: this.$route.query.infoname } });
      }
    },
    cancelEdit() {
      this.$router.push({ name: 'TaskDetail', query: { infoname: this.$route.query.infoname } });
    }
  }
};
</script>

<style scoped>
.container-xl {
  max-width: 50rem;
  margin: 0 auto;
}

button {
  margin-top: 0.2rem;
}
.btn {
  margin: 5px;
}
</style>