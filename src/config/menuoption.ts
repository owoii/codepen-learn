import type { MenuOption } from "naive-ui";
import { RouterLink } from 'vue-router'
const menuOptions: MenuOption[] = [
  {
    label: "CodePen临摹",
    key: "pinball-1973",
    children: [
      {
        label:()=>h(RouterLink,{to:'/apple'},"键盘"),
        key: "rat",
      },
    ],
  },
];

export default menuOptions;
