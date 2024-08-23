<template>
  <div class="container-fluid">
    <div class="row">
      <div class="row">
        <h1 class="col-8 mb-2">My Project</h1>
        <input type="date" class="col-2 btn button-right">
        <input type="date" class="col-2 btn button-right">
      </div>
      <div class="col-12 border-bottom section-half">
        <div v-if="paginatedDataInfo.length > 0">
          <div class="card mb-3" v-for="(item, index) in paginatedDataInfo" :key="index">
            <div class="card-body d-flex justify-content-between">
              <span class="col-4">Name: {{ truncate(item.infoname, 20) }}</span>
              <span class="col-4">Detail: {{ truncate(item.infodetails, 50) }}</span>
              <div><i class="fa-solid fa-calendar-days icon-pad"></i>
                <span class="col">Start: {{ item.infostart ? item.infostart : 'No Start Date' }}</span>
                <span class="col">/End: {{ item.infoend ? item.infoend : 'No End Date' }}</span>
              </div>
              <button @click="moreinfo(item)" type="button" class="btn btn-outline-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="pagination ">
            <button @click="changePageDataInfo(currentPageDataInfo - 1)"
              :disabled="currentPageDataInfo === 1">Previous</button>
            <span>Page {{ currentPageDataInfo }} of {{ totalPagesDataInfo }}</span>
            <button @click="changePageDataInfo(currentPageDataInfo + 1)"
              :disabled="currentPageDataInfo === totalPagesDataInfo">Next</button>
          </div>
        </div>
        <div v-else>
          <h1 class="text-Result">No Result</h1>
        </div>
      </div>
      <div class="col-12 section-half">
      <h1>In Team</h1>
        <div v-if="paginatedDataInTeam.length > 0">
          <div class="card mb-3" v-for="(item, index) in paginatedDataInTeam" :key="index">
            <div class="card-body d-flex justify-content-between">
              <span class="col-4">Name: {{ truncate(item.infoname, 20) }}</span>
              <span class="col-4">Detail: {{ truncate(item.infodetails, 50) }}</span>
              <span class="col">DayStart: {{ item.infostart ? item.infostart : 'No Start Date' }}</span>
              <span class="col">DayEnd: {{ item.infoend ? item.infoend : 'No End Date' }}</span>
              <button @click="moreinfo(item)" type="button" class="btn btn-outline-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="pagination pagination-center">
            <button @click="changePageDataInTeam(currentPageDataInTeam - 1)"
              :disabled="currentPageDataInTeam === 1">Previous</button>
            <span>Page {{ currentPageDataInTeam }} of {{ totalPagesDataInTeam }}</span>
            <button @click="changePageDataInTeam(currentPageDataInTeam + 1)"
              :disabled="currentPageDataInTeam === totalPagesDataInTeam">Next</button>
          </div>
        </div>
        <div v-else>
          <h1 class="text-Result">No Result</h1>
        </div>
      </div>
    </div>
  </div>
</template>

 
<script>
export default {
  data() {
    return {
      datainfo: [],
      datainteam: [],
      currentPageDataInfo: 1,
      currentPageDataInTeam: 1,
      itemsPerPage: 3,
      progressPercentage: 0
    };
  },
  computed: {
    // แสดงข้อมูลใน dataInfo ที่ถูกกรองและแบ่งหน้าตาการตั้งค่า
    paginatedDataInfo() {
      const start = (this.currentPageDataInfo - 1) * this.itemsPerPage;
      return this.filteredDatainfo.slice(start, start + this.itemsPerPage);
    },
    // แสดงข้อมูลใน DataInTeam ที่ถูกกรองและแบ่งหน้าตาการตั้งค่า
    paginatedDataInTeam() {
      const start = (this.currentPageDataInTeam - 1) * this.itemsPerPage;
      return this.filteredDatainteam.slice(start, start + this.itemsPerPage);
    },
    // คำนวณจำนวนหน้าทั้งหมดสำหรับข้อมูล datainfo ที่ถูกกรอง
    totalPagesDataInfo() {
      return Math.ceil(this.filteredDatainfo.length / this.itemsPerPage);
    },
    // : คำนวณจำนวนหน้าทั้งหมดสำหรับข้อมูล datainteam ที่ถูกกรองในส่วน In Team
    totalPagesDataInTeam() {
      return Math.ceil(this.filteredDatainteam.length / this.itemsPerPage);
    },
    //  กรองข้อมูลใน datainfo ให้เหลือเฉพาะข้อมูลที่ต้องการแสดงผล (ข้อมูลเกี่ยวกับ 'จัดซื้อจัดจ้าง')
    filteredDatainfo() {
      return this.datainfo.filter(item => item.infotype === 'จัดซื้อจัดจ้าง' && item.infoname);
    },
    // กรองข้อมูลใน datainteam ให้เหลือเฉพาะข้อมูลที่ต้องการแสดงผลในส่วน In Team
    filteredDatainteam() {
      return this.datainteam.filter(item => item.infotype === 'ทีมงาน' && item.infoname);
    }
  },
  methods: {
    // เปลี่ยนหน้าแสดงผลข้อมูลในส่วน datainfo ให้ตรงกับที่ผู้ใช้เลือก
    changePageDataInfo(page) {
      if (page >= 1 && page <= this.totalPagesDataInfo) {
        this.currentPageDataInfo = page;
      }
    },
    // เปลี่ยนหน้าแสดงผลข้อมูลในส่วน In Team ให้ตรงกับหน้าที่ผู้ใช้เลือก.
    changePageDataInTeam(page) {
      if (page >= 1 && page <= this.totalPagesDataInTeam) {
        this.currentPageDataInTeam = page;
      }
    },
    //  นำผู้ใช้ไปยังหน้ารายละเอียดของงานที่เลือก พร้อมส่งค่า infoname ไปเพื่อให้สามารถดึงข้อมูลเพิ่มเติมได้
    moreinfo(item) {
      this.$router.push({ name: 'TaskDetail', query: { infoname: item.infoname } }); // ส่ง `infoname` ผ่าน query params
    },
    // ตัดข้อความที่ยาวเกินกว่าที่กำหนดให้เหลือเพียงบางส่วน พร้อมกับแสดง ...  ต่อท้าย
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    }
  },
  // mounted ข้อมูลจาก local storage ถ้ามี และเก็บข้อมูลที่กรองแล้วไว้ใน state (datainfo และ datainteam) เพื่อเอามาแสดงผล
  mounted() {
    const SaveData = localStorage.getItem('infoData');
    if (SaveData) {
      const allData = JSON.parse(SaveData);
      this.datainfo = allData.filter(item => item.infoname); // ตรวจสอบว่า `infoname` มีค่า
      this.datainteam = allData.filter(item => item.team === 'Team1' && item.infoname); // ตรวจสอบว่า `infoname` มีค่า
      console.log("ข้อมูลที่โหลดจาก Local Storage:", this.datainfo);
    } else {
      console.log("ไม่มีข้อมูลใน Local Storage");
    }

  }
};
</script>


<style scoped>
@import './Sass/Homepage.scss';
</style>
