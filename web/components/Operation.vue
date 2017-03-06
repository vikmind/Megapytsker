<template lang="html">
  <div class="operation">
    <div class="operation__content">
      <div v-if="operation.type === 'selectCard'"
          class="operation__card">
          <span v-if="operation.args[0] !== 'INIT'">ARROWPASS<BR></span>
          {{ operation.args[0] }}
      </div>
      <div v-else-if="operation.type === 'touchScreen'"
          class="operation__card">
        <div>
          <strong>X:</strong><span>{{ operation.args[0] }}</span>
        </div>
        <div>
          <strong>Y:</strong><span>{{ operation.args[1] }}</span>
        </div>
      </div>
      <div v-else-if="operation.type === 'tapeExecutor'" class="operation__card">
        <strong>{{tapes.find(item => item.id === parseInt(operation.args[0], 10)).name}}</strong>
        <div>x
          <strong>{{ operation.args[1] }}</strong>
        </div>
      </div>
      <div v-else class="operation__card">
        <div v-for="argument in operation.args">
          {{ argument }}
        </div>
      </div>
      <pre v-if="false">{{ JSON.stringify(operation, null, 2) }}</pre>
    </div>
    <div class="operation__actions operation__actions--static">
      <div class="operation__action-button">
        <Icon :glyph="operation.type || 'grid'" width="32" height="32" />
      </div>
      <div class="operation__bottom-title" v-html="operation.name"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from './Icon.vue';
export default {
  components: { Icon },
  props: ['operation'],
  computed:
    mapState([
      'tapes'
    ]),
}
</script>

<style lang="scss">
.operations-list{
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
}
.operation{
  width: 270px;
  height: 250px;
  padding: 15px;
  background: #424242;
  border: 1px solid #424242;
  border-radius: 5px;
  margin: 0 20px 20px 0;

  display: flex;
  align-items: stretch;
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
  position: relative;
}
.operation__content--centered{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
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
  margin: auto;
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
.operation__actions--static{
  justify-content: flex-start;
  &>*:first-child {
    margin-right: 1em;
  }
}
.operation__bottom-title{
  color: #fefefe;
}
</style>
