<template lang="html">
<div class="operation operation-edit">
  <div class="operation__content edit-form">
    <div class="edit-form__line">
      <label>Operation name</label>
      <input type="text" v-model="operation.name">
    </div>
    <div v-for="type in operationTypes" v-if="type.identifier === operation.type">
      <TouchScreenInput
        v-if="type.identifier === 'touchScreen'"
        :args="operation.args"
        :argsInfo="type.arguments"
        v-on:select="argsUpdate"
      />
      <SwipeInput
        v-else-if="type.identifier === 'swipe'"
        :args="operation.args"
        :argsInfo="type.arguments"
        v-on:select="argsUpdate"
      />
      <TapeExecutorInput
        v-else-if="type.identifier === 'tapeExecutor'"
        :tapes="tapes.filter(item => item.id !== openedTapeId)"
        :args="operation.args"
        :argsInfo="type.arguments"
        v-on:select="argsUpdate"
      />
      <GenericInput
        v-else
        :args="operation.args"
        :argsInfo="type.arguments"
        v-on:select="argsUpdate"
      />
    </div>
    <TypeSelect
      v-if="typePopup || (operation.type == null)"
      :value="operation.type"
      @input="selectType"
    />
  </div>
  <div class="operation__actions">
    <button class="operation__action-button is-operation" @click="togglePopup">
      <Icon :glyph="operation.type || 'grid'" width="32" height="32" />
    </button>
    <button class="handle">
      <Icon glyph="move" width="32" height="32" />
    </button>
    <button class="operation__action-button is-remove" @click="$emit('delete')">
      <Icon glyph="trash" width="32" height="32" />
    </button>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from './Icon.vue';
import TypeSelect from './operation-edit/TypeSelect.vue';
import TouchScreenInput from './operation-edit/TouchScreen.vue';
import SwipeInput from './operation-edit/Swipe.vue';
import TapeExecutorInput from './operation-edit/TapeExecutor.vue';
import GenericInput from './operation-edit/GenericType.vue';

export default {
  components: {
    Icon,
    TypeSelect,
    TouchScreenInput,
    SwipeInput,
    TapeExecutorInput,
    GenericInput
  },
  computed:
    mapState([
      'openedTapeId',
      'operationTypes',
      'cards',
      'tapes'
    ]),
  props: ['operation'],
  data (){
    return {
      typePopup: false
    }
  },
  methods: {
    togglePopup() {
      this.typePopup = !this.typePopup;
    },
    selectType(value) {
      this.operation.type = value;
      this.operation.args = [];
      this.typePopup = false;
      if (!this.operation.name){
        this.operation.name = this.operationTypes.find(item => item.identifier === value).name;
      }
    },
    argsUpdate(args){
      this.operation.args = args;
    }
  }
}
</script>

<style lang="scss">
@import 'foundation-settings';
.operation-edit{
  height: 443px;
  &.gu-transit{
    &>.operation__content{
      background-color: #88f797;
    }
  }
}
.edit-form{}
.operation__action-button{
  color: #fefefe;
  cursor: pointer;
  &.is-remove:hover{
    color: map-get($foundation-palette, alert);
  }
  &.is-operation:hover{
    color: map-get($foundation-palette, primary);
  }
}
.gu-transit{
  transform: scale(1.05);
  transform-origin: 10px center;
}
.handle {
  padding: 0 5px;
  margin-right: 5px;
  cursor: move;
  position: relative;
  color: #fff;
  &:focus{
    outline: none;
  }
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
