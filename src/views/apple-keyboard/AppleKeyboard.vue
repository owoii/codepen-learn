<template>
  <div class="keyboard-container">
    <div class="key-line" />
    <div class="keyboard">
      <div class="key-row">
        <button class="key-one" v-for="(item, index) in keys" :key="index">
          <span>{{ item?.text || "N" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import keylist from "./keylist";
const keys = reactive(keylist);
onMounted(() => {
  addEventListener("keydown", () => {
    console.log(123);
  });
});
</script>
<style lang="scss" scoped>
.keyboard-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(16px + (24 - 16) * (100vw - 320px) / (2560 - 320));
  background: linear-gradient(#aeaeae, #d4d4d4);
  user-select: none;
  -moz-user-select: none;
}
.keyboard {
  padding: 15px;
  background: linear-gradient(30deg, #c1c1c1, #cdcdcd);
  border-radius: 15px;
  border: 1px solid #9e9e9e;
  box-shadow: -8px -8px 10px rgba($color: #000000, $alpha: 0.45),
    1px 1px 0 rgba($color: #fff, $alpha: 0.1) inset,
    -4px 0px 25px rgba($color: #000000, $alpha: 0.2) inset;
  position: relative;
  z-index: 8;
}
.key-row {
  display: flex;
  gap: 15px;
}
.key-one {
  box-sizing: border-box;
  width: 6.4em;
  height: 6em;
  background: hsl(0%, 0%, 95%);
  border: none;
  border-radius: 10px;
  box-shadow: -0.4em -0.25em 0.4em hsla(0, 0%, 0%, 0.5),
    0 0 0 0.1em hsla(0, 0%, 0%, 0.3),
    0.04em 0.04em 0.04em hsla(0, 0%, 0%, 0.4) inset,
    -0.1em -0.1em 0.04em hsla(0, 0%, 100%, 0.8) inset;
  color: #6d6d6d;
  transition: box-shadow 0.15s;
  &:active {
    box-shadow: 0 0 0.2em hsla(0, 0%, 0%, 0.2), 0 0 0 0.1em hsla(0, 0%, 0%, 0.4),
      0 -0.05em 0 hsla(0, 0%, 0%, 0.4) inset,
      -0.05em -0.15em 0.05em hsla(0, 0%, 100%, 0.05) inset;
  }
  &:focus {
    outline: none;
  }
  & > span {
    font-size: 2.3em;
    font-weight: 5;
  }
}
.key-line {
  height: 50%;
  width: 15px;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 7;
  box-shadow: -5px 0 15px rgba($color: #000000, $alpha: 0.6),
    10px 0 10px rgba($color: #000000, $alpha: 0.5) inset;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 200%;
    left: -150%;
    transform: translateX(50%);
    margin: auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: -5px -5px 10px rgba($color: #000000, $alpha: 0.4),
      10px 0 10px rgba($color: #000000, $alpha: 0.5) inset;
  }
}
@media (prefers-color-scheme: dark) {
  .key-one {
    background: hsl(0%, 0%, 5%);
    span{
      color: #fff;
    }
  }
}
</style>
