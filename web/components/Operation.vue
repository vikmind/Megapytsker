<template lang="html">
  <div v-if="mode !== 'edit'" class="operation">
    <div class="operation__content">
      <h2 class="operation__title" v-html="operation.name"></h2>
      <div v-if="operation.type === 'selectCard'"
          class="operation__card">
          <span v-if="operation.args[0] !== 'INIT'">ARROWPASS<BR></span>
          {{ operation.args[0] }}
      </div>
      <div v-else-if="operation.type === 'touchScreen'">
        <div class="operation__card">
          <div>
            <strong>X:</strong><span>{{ operation.args[0] }}</span>
          </div>
          <div>
            <strong>Y:</strong><span>{{ operation.args[1] }}</span>
          </div>
        </div>
      </div>
      <pre v-else>{{ JSON.stringify(operation, null, 2) }}</pre>
    </div>
    <div class="operation__actions"></div>
  </div>
  <OperationEdit :operation="operation" v-else />
</template>

<script>
import OperationEdit from './OperationEdit.vue';
export default {
  components: {
    OperationEdit
  },
  props: ['operation', 'mode'],
}
</script>

<style lang="css">
.operations-list{
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
}
.operation{
  width: 270px;
  height: 450px;
  padding: 15px;
  background: #C2C2C2;
  border: 1px solid #424242;
  border-radius: 5px;
  margin: 0 20px 20px 0;

  display: flex;
  flex-direction: column;
}
.operation__content{
  background: #fff;
  flex-grow: 1;
  border: 1px solid #424242;
  padding: 15px;
  box-shadow: 0 0 10px 0 #696969 inset;
  overflow-x: hidden;
  overflow-y: auto;
}
.operation__title{
  font-size: 1.2em;
  margin: 0;
}
.operation__card{
  color: #1F1F1F;
  background: #F3F3F3;
  border-radius: 10px;
  box-shadow: 2px 2px 1px 0 #bbb;
  font-size: 1.2em;

  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 180px;
  height: 100px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.operation__actions{
  height: 40px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
