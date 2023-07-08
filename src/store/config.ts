import { defineStore } from 'pinia';
import globaConfig from '@/config/globa.config';
// 系统的全局配置
export const useGlobaConfigStore = defineStore('globa', {
  state: () => ({
    globaConfig,
  }),
  getters: {
    navigator: (state) => state.globaConfig.navigate,
  },
});
