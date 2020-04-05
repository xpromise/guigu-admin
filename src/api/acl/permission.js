import request from "@utils/request";

const BASE_URL = "/admin/acl/permission";

// 请求菜单列表
export function reqGetMenuList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET"
  });
}

// 请求添加菜单
export function reqAddMenu(menu) {
  return request({
    url: `${BASE_URL}/save`,
    data: menu,
    method: "POST"
  });
}
