import { reqGetMenuList, reqAddMenu } from "@api/acl/permission";

import { GET_MENU_LIST, ADD_MENU } from "./constants";

/**
 * 获取菜单
 */
const getMenuListSync = menuList => ({
  type: GET_MENU_LIST,
  data: menuList
});

export const getMenuList = () => {
  return dispatch => {
    return reqGetMenuList().then(response => {
      dispatch(getMenuListSync(response));
      return response;
    });
  };
};

/**
 * 添加菜单
 */
const addMenuSync = menu => ({
  type: ADD_MENU,
  data: menu
});

export const addMenu = (menu) => {
  return dispatch => {
    return reqAddMenu(menu).then(response => {
      dispatch(addMenuSync(response));
      return response;
    });
  };
};
