<template>
  <div class="app-container flex-center page-container">
    <div class="cyber-container">
      <h1>赛博算命</h1>
      <n-input placeholder="输入你的生辰八字" show-count :maxlength="20" />
      <n-button @click="getResult">开始赛博算命</n-button>
      <h1>{{ result.data }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { chatServices } from "@/utils/openAi";
interface ResultType {
  data: string;
}

const question = ref("甲午年 庚寅月 戊寅日 戊辰时");
const result = ref<ResultType>({ data: "快点击按钮进行算命吧" });

onMounted(() => {});

const getResult = async () => {
  const res = await chatServices<ResultType>({
    prefix: "帮我使用生辰八字算一下命",
    question: question.value,
    suffix: "这里是我的生辰八字",
    dataType: { data: "算命结果" },
  });
  result.value = res;
};
</script>
<style lang="scss" scoped>
.page-container {
  height: 100%;
}
.cyber-container {
  width: 40%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
