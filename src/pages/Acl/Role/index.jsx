import React, { Component } from "react";
import { Input, Button, message, Table } from "antd";
import {
  InfoCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { getRoleList } from "./redux";

import { filterPermissions } from "@utils/tools";

import "@assets/common.less";

const { Search } = Input;

@connect(
  (state) => ({
    roleList: state.roleList,
    permissionValueList: filterPermissions(
      state.user.permissionValueList,
      "role"
    ),
  }),
  { getRoleList }
)
class Role extends Component {
  state = {
    searchLoading: false,
    tableLoading: false,
    page: 1, // 页数
    limit: 10, // 每页显示条数
    role: null, // 设置/更新/删除的role
  };

  search = (searchName) => {
    this.setState({
      searchLoading: true,
    });

    const { page, limit } = this.state;

    this.getRoleList({ roleName: searchName, page, limit }).finally(() => {
      this.setState({
        searchLoading: false,
      });
    });
  };

  // 设置角色权限
  showSetRole = (role) => {
    return () => {
      this.props.history.push("/acl/role/auth/" + role._id);
    };
  };

  // 更新角色
  updateRole = (role) => {
    return () => {
      this.props.history.push("/acl/role/auth/" + role._id);
    };
  };

  // 删除角色
  removeRole = (role) => {
    return () => {};
  };

  renderTableItem = (role) => {
    // const { permissionValueList } = this.props;

    return (
      <div>
        {/* {permissionValueList["role.detail"] && ( */}
        <Button onClick={this.showSetRole(role)}>
          <InfoCircleOutlined />
        </Button>
        {/* )} */}
        {/* {permissionValueList["role.edit"] && ( */}
        <Button type="primary" className="acl-edit-btn">
          <FormOutlined />
        </Button>
        {/* )} */}
        {/* {permissionValueList["role.remove"] && ( */}
        <Button type="danger">
          <DeleteOutlined />
        </Button>
        {/* )} */}
      </div>
    );
  };

  columns = [
    {
      title: "序号",
      dataIndex: "index",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      width: "70%",
    },
    {
      title: "操作",
      render: this.renderTableItem,
    },
  ];

  selectRow = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };

  componentDidMount() {
    const { page, limit } = this.state;
    this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getRoleList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getRoleList = ({ page, limit, roleName }) => {
    return this.props.getRoleList({ page, limit, roleName }).then((total) => {
      if (total === 0) {
        message.warning("暂无角色列表数据");
        return;
      }
      message.success("获取角色列表数据成功");
    });
  };

  render() {
    const { searchLoading, page, limit, tableLoading } = this.state;

    let {
      roleList: { items, total },
      // permissionValueList,
    } = this.props;

    const roleList = items.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });

    return (
      <div className="acl">
        <div className="acl-search-wrap">
          <Search
            placeholder="用户名"
            enterButton="搜索"
            onSearch={this.search}
            className="acl-search"
            loading={searchLoading}
          />
        </div>
        <div className="acl-btn-wrap">
          {/* {permissionValueList["role.add"] && ( */}
          <Button className="acl-add-btn" type="danger">
            添加
          </Button>
          {/* )} */}
          {/* {permissionValueList["role.remove"] && ( */}
          <Button type="danger">批量删除</Button>
          {/* )} */}
        </div>

        <Table
          rowSelection={{
            type: "checkbox",
            onChange: this.selectRow,
          }}
          columns={this.columns}
          dataSource={roleList}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: limit,
            pageSizeOptions: ["5", "10", "20", "30", "40", "50", "100"],
            showQuickJumper: true,
            showSizeChanger: true,
            total,
            onChange: this.handleTableChange,
            onShowSizeChange: this.handleTableChange,
          }}
          loading={tableLoading}
        />
      </div>
    );
  }
}

export default Role;
