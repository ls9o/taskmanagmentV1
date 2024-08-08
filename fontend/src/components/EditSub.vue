<template>
    <div class="container">
      <h1 class="text-center">edit sub</h1>
      <form @submit.prevent="confirmEdit" class="row">
        <div class="col-12">
          <label class="form-label">รายละเอียด</label>
          <div class="">
            <textarea v-model="editData.editDetail" class="form-control bg-secondary-custom shadow-sm p-3 mb-5 bg-body-tertiary rounded" type="text"></textarea>
          </div>
          <div class="row">
            <label>วันที่เริ่ม</label>
            <div class="form-label col-2">
              <input v-model="editData.editStart" class="form-control bg-secondary-custom" type="date">
            </div>
          </div>
          <div class="row">
            <label>วันที่จบ</label>
            <div class="form-label col-2">
              <input v-model="editData.editEnd" class="form-control bg-secondary-custom" type="date">
            </div>
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
        },
      };
    },
    created() {
      const taskDetail = JSON.parse(localStorage.getItem('infoData')).find(task => task.infoname === this.$route.query.infoname);
      if (taskDetail) {
        const subTask = taskDetail.subInputBoxesinfo.find(sub => sub.infodetails === this.$route.query.editDetail);
        if (subTask) {
          this.editData.editDetail = subTask.infodetails;
          this.editData.editStart = subTask.infostart;
          this.editData.editEnd = subTask.infoend;
        }
      }
    },
    methods: {
      confirmEdit() {
        const allData = JSON.parse(localStorage.getItem('infoData'));
        const taskDetail = allData.find(task => task.infoname === this.$route.query.infoname);
        if (taskDetail) {
          const subTaskIndex = taskDetail.subInputBoxesinfo.findIndex(sub => sub.infodetails === this.$route.query.editDetail);
          if (subTaskIndex !== -1) {
            taskDetail.subInputBoxesinfo[subTaskIndex] = {
              infodetails: this.editData.editDetail,
              infostart: this.editData.editStart,
              infoend: this.editData.editEnd,
            };
            localStorage.setItem('infoData', JSON.stringify(allData));
            alert('บันทึกการแก้ไขสำเร็จ');
            this.$router.push({ name: 'TaskDetail', query: { infoname: this.$route.query.infoname } });
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* CSS สำหรับสไตล์ */
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
  