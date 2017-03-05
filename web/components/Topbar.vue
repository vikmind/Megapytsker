<template lang="html">
  <header class="topbar">
    <img class="logo" :src="require('!file-loader!../img/logo.svg')" alt="Мегапыцкер">
    <div class="status">
      <Status param="arduino" title="Arduino"/>
      <Status param="famoco" title="Device" />
      <Status param="server" title="Server" />
    </div>
  </header>
</template>

<script>
import Status from './Status.vue';

export default {
  components: { Status }
}
</script>

<style lang="css">
  .topbar{
    background: #FAFAFA;
    border-bottom: 1px solid #979797;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.22);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
  }
  .status{
    text-align: right;
  }
  @media only screen and (max-width:560px){
    .topbar{
      flex-direction: column;
    }
    .logo{
      align-self: flex-start;
      margin-bottom: 1em;
    }
    .status{
      align-self: flex-end;
    }
  }
</style>
