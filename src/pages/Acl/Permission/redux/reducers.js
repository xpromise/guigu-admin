import { GET_MENU_LIST, ADD_MENU } from "./constants";

const initMenuList = [];

function addMenu(menuList, menu) {
  for (let i = 0; i < menuList.length; i++) {
    const item = menuList[i];
    if (item._id === menu.pid) {
      if (item.children) {
        item.children.push(menu);
      } else {
        item.children = [menu];
      }
      return menuList;
    }
    if (item.children) {
      const result = addMenu(item.children, menu);
      if (result) return menuList;
    }
  }
}

export default function menuList(prevState = initMenuList, action) {
  switch (action.type) {
    case GET_MENU_LIST:
      return action.data;
    case ADD_MENU:
      const menuList = JSON.parse(JSON.stringify(prevState));
      return addMenu(menuList, action.data);
    default:
      return prevState;
  }
}
