<template lang="html">
  <svg class="icon" :width="(width) ? width : null" :height="(height) ? height : null">
    <use :xlink:href="`#icon-${glyph}`" />
  </svg>
</template>

<script>
import upload from '../img/icon-upload.svg';
import add from '../img/icon-add.svg';
import inputText from '../img/inputText.svg';
import selectCard from '../img/selectCard.svg';
import tapeExecutor from '../img/tapeExecutor.svg';
import touchScreen from '../img/touchScreen.svg';
import wait from '../img/wait.svg';
import grid from '../img/grid.svg';
import trash from '../img/trash.svg';
import close from '../img/close.svg';
import execute from '../img/execute.svg';
import save from '../img/save.svg';
import edit from '../img/edit.svg';

export default {
  props: ['glyph', 'width', 'height']
}
</script>

<style lang="css">
.icon {
  fill: currentColor;
}
</style>
