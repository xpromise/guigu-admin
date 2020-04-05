import React, { Component } from "react";
import { Table, Button, Modal } from "antd";
import {
  DownOutlined,
  RightOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusOutlined
} from "@ant-design/icons";

import { connect } from "react-redux";
import { getMenuList, addMenu } from "./redux";

import AddMenuForm from "./AddMenuForm";

@connect(state => ({ menuList: state.menuList }), { getMenuList, addMenu })
class Permission extends Component {
  state = {
    expandedRowKeys: [],
    isShowAddMenu: false,
    parentMenu: {}
  };

  renderTableItem = item => {
    const btns = [
      <Button
        type="primary"
        key="0"
        style={{ marginRight: 10 }}
        onClick={this.showAddMenu(item)}
      >
        <PlusOutlined />
      </Button>,
      <Button type="primary" style={{ marginRight: 10 }} key="1">
        <FormOutlined />
      </Button>,
      <Button type="danger" key="2">
        <DeleteOutlined />
      </Button>
    ];

    if (item.name === "全部数据") {
      btns.splice(1, 2);
    } else if (item.type === 2) {
      btns.splice(0, 1);
    }

    return <div>{btns}</div>;
  };

  columns = [
    {
      title: "名称",
      dataIndex: "name",
      width: "20%",
      render: text => <span style={{ marginLeft: 10 }}>{text}</span>
    },
    {
      title: "访问路径",
      dataIndex: "path",
      width: "20%"
    },
    {
      title: "组件路径",
      dataIndex: "component",
      width: "20%"
    },
    {
      title: "权限值",
      dataIndex: "permissionValue",
      width: "20%"
    },
    {
      title: "操作",
      width: "20%",
      render: this.renderTableItem
    }
  ];

  // 显示菜单
  showAddMenu = item => {
    return () => {
      this.setState({
        parentMenu: item,
        isShowAddMenu: true
      });
    };
  };

  onExpandedRowsChange = expandedRowKeys => {
    this.setState({
      expandedRowKeys
    });
  };

  componentDidMount() {
    this.props.getMenuList().then(menus => {
      this.setState({
        expandedRowKeys: [menus[0] && menus[0]._id]
      });
    });
  }

  hidden = key => {
    return () => {
      this.setState({
        [key]: false
      });
    };
  };

  render() {
    const { menuList, addMenu } = this.props;
    const { expandedRowKeys, isShowAddMenu, parentMenu } = this.state;

    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={menuList}
          rowKey="_id"
          pagination={{ hideOnSinglePage: true }}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) => {
              // 没有子元素不显示图标
              if (!record.children) return null;
              return expanded ? (
                <DownOutlined onClick={e => onExpand(record, e)} />
              ) : (
                <RightOutlined onClick={e => onExpand(record, e)} />
              );
            },
            expandedRowKeys,
            onExpandedRowsChange: this.onExpandedRowsChange
          }}
        />

        <Modal
          title={parentMenu.level < 3 ? "添加菜单" : "添加按钮"}
          visible={isShowAddMenu}
          footer={null}
          // onOk={this.addMenu}
          // onCancel={this.hidden("isShowAddMenu")}
        >
          <AddMenuForm
            hidden={this.hidden("isShowAddMenu")}
            parentMenu={parentMenu}
            addMenu={addMenu}
          />
        </Modal>
      </div>
    );
  }
}

export default Permission;
