<template lang="html">
  <div class="operation">
    <div class="operation__content" :class="{green: currentOperationId === operation.id}">
      <div v-if="operation.type === 'selectCard'">
          <div class="operation__card">
            <span v-if="operation.args[0] !== 'INIT'">ARROWPASS<BR></span>
            <span>{{ operation.args[0] }}</span>
          </div>
          <div class="operation__info">
            <Icon glyph="wait" width="18" height="18"/>
            <span>{{ parseInt(operation.args[1], 10) || 1000 }}ms</span>
          </div>
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
        <div class="operation__info">
          <Icon glyph="wait" width="18" height="18"/>
          <span>{{ parseInt(operation.args[2], 10) || 200 }}ms</span>
        </div>
      </div>
      <div v-else-if="operation.type === 'swipe'">
        <div class="operation__card">
          <table>
            <tr>
              <th>X1</th>
              <td>{{ operation.args[0] }}</td>
              <th>Y1</th>
              <td>{{ operation.args[1] }}</td>
            </tr>
            <tr>
              <th>X2</th>
              <td>{{ operation.args[2] }}</td>
              <th>Y2</th>
              <td>{{ operation.args[3] }}</td>
            </tr>
            <tr>
              <td colspan="4">
                <Icon glyph="wait" width="18" height="16"/>
                <span>{{ parseInt(operation.args[4], 10) || 200 }}ms</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="operation__info">
          <Icon glyph="wait" width="18" height="18"/>
          <span>{{ parseInt(operation.args[4], 10) || 200 }}ms</span>
        </div>
      </div>
      <div v-else-if="operation.type === 'tapeExecutor'" class="operation__card">
        <strong>{{tapeName}}</strong>
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
      <div class="operation__action-button" :class="{green: currentOperationId === operation.id}">
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
      'tapes',
      'currentOperationId'
    ]),
  data(){
    let tapeName = "Error, tape not found";
    if (this.operation.type === 'tapeExecutor'){
      const tape = this.$store.state.tapes.find(item => item.id === parseInt(this.operation.args[0], 10));
      tapeName = tape ? tape.name : tapeName;
    }
    return {
      tapeName
    }
  }
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
  height: 270px;
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
  transition: background-color .2s;
  &.green{
    background-color: #88f797;
  }
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
  svg{
    vertical-align: middle;
  }
}
.operation__info{
  text-align: center;
  margin: 0.5rem 0 0;
  svg{
    vertical-align: middle;
  }
}
.operation__actions{
  height: 40px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.operation__action-button{
  transition: color .2s;
}
.operation__action-button.green{
  color: #3adb76;
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
