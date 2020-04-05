import request from "@utils/request";

const BASE_URL = "/admin/acl/role";

// 获取/搜索 角色分页数据
export function reqRoleList({ page, limit, roleName }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    params: {
      roleName
    },
    method: "GET"
  });
}

// 
