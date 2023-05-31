<template>
  <div ref="codeView" class="view-container">
    <div class="mouse" ref="mouse"></div>

    <div class="progress">
      <div ref="progressSelect" class="progress-select"></div>
    </div>
    <div class="option-constainer">
      <button class="start-button" @click="openRecode">开始录制</button>
      <button class="start-button" @click="closeRecode">取消录制</button>
      <button class="start-button" @click="reappear">复现</button>
      <button>记录按钮</button>
    </div>
  </div>
</template>
<script setup lang="ts">
interface RecordedValues {
  mouseX: number;
  mouseY: number;
}
// 控制器变量
const controllerConfig = reactive({
  recorde: false,
  play: false,
});

const recodeArray = reactive<RecordedValues[]>([]);

// 记录鼠标位置,给鼠标绑定事件
const codeView = ref<HTMLDivElement | null>(null);
const mouse = ref<HTMLDivElement | null>(null);

const progressSelect = ref<HTMLDivElement>();
const index = ref(0);
onMounted(() => {
  //这里限制一下时间,每60毫秒录制一次
  setInterval(() => {
    if (recodeArray.length > 0) {
      index.value--;
      if (!mouse.value) return;

      mouse.value.style.cssText = templateTransform(recodeArray[index.value]);
      // console.log(templateTransform(recodeArray[index.value]));
      // mouse.value.style = `transform: translateY(${e.clientY - rect.top}px) translateX(${e.clientX - rect.left}px);`
    } else {
      controllerConfig.play = false;
    }
  }, 16);
});

function recodeFunction(e: MouseEvent) {
  if (!controllerConfig.recorde) {
    return;
  }
  const rect = codeView.value?.getBoundingClientRect();
  if (rect == undefined) return;
  //开始记录位置
  recodeArray.push({
    mouseX: e.clientX - rect.left,
    mouseY: e.clientY - rect.top,
  });
}

//开始录制
const openRecode = () => {
  controllerConfig.recorde = true;
  codeView.value?.addEventListener("mousemove", (e) => {
    recodeFunction(e);
  });
};
// 停止录制
const closeRecode = () => {
  controllerConfig.recorde = false;
};

// 复现录制的内容
const reappear = () => {
  if (recodeArray.length == 0) return;
  controllerConfig.play = true;
  index.value = recodeArray.length;
};

function templateTransform(recodeValue: RecordedValues) {
  // return `left=${recodeValue.mouseX}px;top:${recodeValue.mouseY}px;`;
  return `transform: translateY(${recodeValue.mouseY}px) translateX(${recodeValue.mouseX}px)`;
}
</script>
<style lang="scss" scoped>
.progress {
  position: absolute;
  width: 100%;
  height: 10px;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.08);
  & > &-select {
    background: #000;
    height: 10px;
    width: 10px;
  }
}
.view-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.option-constainer {
  position: absolute;
  margin: auto;
  bottom: 20px;
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  & > button {
    background: none;
    border: 0;
    padding: 8px 15px;
    background: rgba($color: #000000, $alpha: 0.05);
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    color: #333;
    &:hover {
      background: rgba($color: #000000, $alpha: 0.1);
    }
  }
  & > .start-button {
    background: rgba($color: red, $alpha: 0.05);
    &:hover {
      background: rgba($color: red, $alpha: 0.1);
    }
  }
}
.mouse {
  position: absolute;
  height: 25px;
  width: 25px;
  background: #333;
  transition: all 0.1s ease-in-out;
}
</style>
