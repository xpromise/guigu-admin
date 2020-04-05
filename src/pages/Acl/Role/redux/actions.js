import { reqRoleList } from "@api/acl/role";

import { GET_ROLE_LIST } from "./constants";
/**
 * 获取/搜索 用户分页数据
 */
const getRoleListSync = list => ({
  type: GET_ROLE_LIST,
  data: list
});

export const getRoleList = ({ page, limit, roleName }) => {
  return dispatch => {
    return reqRoleList({ page, limit, roleName }).then(response => {
      dispatch(getRoleListSync(response));
      return response.total;
    });
  };
};
