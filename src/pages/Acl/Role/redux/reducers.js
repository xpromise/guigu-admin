import { GET_ROLE_LIST } from "./constants";

const initRoleList = {
  total: 0, // 总数
  items: [] // 详细role数据
};

export default function roleList(prevState = initRoleList, action) {
  switch (action.type) {
    case GET_ROLE_LIST:
      return action.data;
    default:
      return prevState;
  }
}
