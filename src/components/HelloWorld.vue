<template>
<div class="card">
    <div class="card-body">Basic card</div>
    <div class="card-body">Basic card</div>
    <button type="button" class="btn btn-info">Info</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  margin: 5%;
  position: relative;
   button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    border:none;
   }
}
</style>
