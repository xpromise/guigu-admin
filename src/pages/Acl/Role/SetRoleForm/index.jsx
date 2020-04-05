import React, { Component } from "react";
import { Tree } from "antd";
import { connect } from "react-redux";

import { getMenuList } from "../../Permission/redux";
import { getAccessRoutes } from "@comps/Authorized/redux";

import "./index.less";

@connect(
  (state) => ({
    menuList: state.menuList,
    permissionList: state.user.permissionList,
  }),
  {
    getMenuList,
    getAccessRoutes,
  }
)
class SetRoleForm extends Component {
  state = {
    expandedKeys: [],
    treeData: [],
    checkedKeys: [],
  };

  onCheck = () => {};

  componentDidMount() {
    const { menuList, permissionList } = this.props;
    const promises = [];

    if (!permissionList.length) {
      promises.push(
        this.props
          .getAccessRoutes()
          .then((res) => ({ type: "permissionList", data: res }))
      );
    }
    if (!menuList.length) {
      promises.push(
        this.props
          .getMenuList()
          .then((res) => ({ type: "menuList", data: res }))
      );
    }

    Promise.all(promises).then((result) => {
      const data = {
        menuList,
        permissionList,
      };
      result.forEach((item) => {
        data[item.type] = item.data;
      });

      this.setState({
        treeData: this.renderTreeData(data.menuList),
        expandedKeys: this.findExpandedKeys(data.menuList),
        checkedKeys:
          this.findCheckedKeys(data.menuList, data.permissionList) || [],
      });
    });
  }

  renderTreeData = (menus) => {
    return menus.map((menu) => {
      return {
        title: menu.name,
        key: menu._id,
        children: menu.children && this.renderTreeData(menu.children),
      };
    });
  };

  findExpandedKeys = (menus) => {
    menus = JSON.parse(JSON.stringify(menus));

    const expandedKeys = [];

    while (menus.length) {
      const menu = menus.shift();
      if (menu.children) {
        expandedKeys.push(menu._id);
        menus = menus.concat(menu.children);
      }
    }

    return expandedKeys;
  };

  findCheckedKeys = (menus, permissionList) => {
    console.log(menus, permissionList);

    menus = JSON.parse(JSON.stringify(menus));
    const checkedKeys = [];

    while (menus.length) {
      const menu = menus.shift();
      if (menu.children) {
        menus = menus.concat(menu.children);
      }

      for (let i = 0; i < permissionList.length; i++) {
        const permissionItem = permissionList[i];
        if (permissionItem.children) {
          for (let j = 0; j < permissionItem.children.length; j++) {
            const item = permissionItem.children[j];
            if (item.path) {
              if (menu.name === item.name) {
                checkedKeys.push(menu._id);
              }
            } else {
              console.log(menu, item);
            }
          }
        } else {
          if (menu.name === permissionItem.name) {
            checkedKeys.push(menu._id);
          }
        }
      }
    }

    return checkedKeys;
  };

  render() {
    const { expandedKeys, treeData, checkedKeys } = this.state;
    // const { permissionList } = this.props;

    return (
      <div className="set-role-form">
        <Tree
          checkable
          // onExpand={onExpand}
          expandedKeys={expandedKeys}
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
          // onSelect={onSelect}
          // selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </div>
    );
  }
}

export default SetRoleForm;
