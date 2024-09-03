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
              <span>{{ item.statusprogress }} %</span>
              <span>{{ item.progressPercentage }} %</span>
              <div><i class="fa-solid fa-calendar-days icon-pad"></i>
                <span class="col">Start: {{ item.infostart ? item.infostart : 'No Start Date' }}</span>
                <span class="col">/End: {{ item.infoend ? item.infoend : 'No End Date' }}</span>
              </div>
              <button @click="moreinfo(item)" type="button" class="btn btn-outline-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="pagination">
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
              <span>{{ item.trueprogressPercentage }} %</span>
              <span>{{ item.progressPercentage }} %</span>
              <span class="col">DayStart: {{ item.infostart ? item.infostart : 'No Start Date' }}</span>
              <span class="col">DayEnd: {{ item.infoend ? item.infoend : 'No End Date' }}</span>
              <button @click="moreinfo(item)" type="button" class="btn btn-outline-primary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div class="pagination">
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
      itemsPerPage: 3
    };
  },
  computed: {
    paginatedDataInfo() {
      const start = (this.currentPageDataInfo - 1) * this.itemsPerPage;
      return this.filteredDatainfo.slice(start, start + this.itemsPerPage);
    },
    paginatedDataInTeam() {
      const start = (this.currentPageDataInTeam - 1) * this.itemsPerPage;
      return this.filteredDatainteam.slice(start, start + this.itemsPerPage);
    },
    totalPagesDataInfo() {
      return Math.ceil(this.filteredDatainfo.length / this.itemsPerPage);
    },
    totalPagesDataInTeam() {
      return Math.ceil(this.filteredDatainteam.length / this.itemsPerPage);
    },
    filteredDatainfo() {
      return this.datainfo.filter(item => item.infotype === 'ภายใน' && item.infoname);
    },
    filteredDatainteam() {
      return this.datainteam.filter(item => item.infotype === 'ทีมงาน' && item.infoname);
    }
  },
  methods: {
    changePageDataInfo(page) {
      if (page >= 1 && page <= this.totalPagesDataInfo) {
        this.currentPageDataInfo = page;
      }
    },
    changePageDataInTeam(page) {
      if (page >= 1 && page <= this.totalPagesDataInTeam) {
        this.currentPageDataInTeam = page;
      }
    },
    moreinfo(item) {
      this.$router.push({ name: 'TaskDetail', query: { infoname: item.infoname } }); // ส่ง `infoname` ผ่าน query params
    },
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    }
  },
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
