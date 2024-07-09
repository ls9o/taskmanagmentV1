<template>
  <div class="center">
    <form action="">
      <div class="info">information</div>
      <div class="inputbox">
        <div class="input-space">
          <label>ชื่องาน:</label>
          <input class="full-width-input" type="text">
        </div>
        <div class="input-space">
          <label>รายละเอียด:</label>
          <textarea cols="20" rows="1"></textarea>
        </div>
        <div class="input-space">
          <label>วันที่เริ่ม:</label>
          <input type="date">
        </div>
        <div class="input-space">
          <label>วันที่จบ:</label>
          <input type="date">
        </div>
        
        <!-- Render sub-inputboxes using v-for -->
        <div v-for="(subInputBox, index) in subInputBoxes" :key="index" class="sub-inputbox">
          <div class="input-space">
            <label>ชื่อ process:</label>
            <input class="full-width-input" type="text">
          </div>
          <div class="input-space">
            <label>รายละเอียด:</label>
            <textarea cols="20" rows="1"></textarea>
          </div>
          <div class="input-space">
            <label>วันที่เริ่ม:</label>
            <input type="date">
          </div>
          <div class="input-space">
            <label>วันที่จบ:</label>
            <input type="date">
          </div>
          <div class="input-space">
            <button @click="DelProcess">del</button>
          </div>
          <div class="input-space">
            <button>confirm</button>
          </div>
        </div>

        <div>
          <button type="button" @click="addProcess">เพิ่ม process</button>
        </div>
        <div>
          <button type="submit" class="button-right">ยืนยัน</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subInputBoxes: []  // Array สำหรับเก็บข้อมูล sub-inputbox
    };
  },
  methods: {
    addProcess() {
      this.subInputBoxes.push({});  // เพิ่ม object ใหม่เข้าไปใน array
    },
    DelProcess() {
      this.subInputBoxes.pop
    },
    confirmProcess() {
      this
    }
  }
};
</script>

<style scoped>
@import './Sass/Addinfo.scss';
</style>
