import React, { Component } from "react";
import { Button, message, Table, Tooltip, Modal } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  FullscreenOutlined,
  // FullscreenExitOutlined,
  RedoOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import SearchForm from "./SearchForm";

import "./index.less";

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
  })
  // { getcourseList }
)
class Teacher extends Component {
  state = {
    searchLoading: false,
    tableLoading: false,
    page: 1, // 页数
    limit: 5, // 每页显示条数
    previewVisible: false,
    previewImage: "",
  };

  renderTableItem = () => {
    // const { permissionValueList } = this.props;

    return (
      <div>
        <Tooltip title="更新">
          <Button type="primary" className="acl-edit-btn">
            <FormOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="删除">
          <Button type="danger">
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </div>
    );
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  columns = [
    {
      title: "序号",
      dataIndex: "index",
      width: 70,
    },
    {
      title: "讲师姓名",
      dataIndex: "name",
    },
    {
      title: "讲师介绍",
      dataIndex: "intro",
      ellipsis: true,
      width: 200,
    },
    {
      title: "讲师职称",
      dataIndex: "career",
    },
    {
      title: "讲师等级",
      dataIndex: "level",
    },
    {
      title: "入职时间",
      dataIndex: "gmtCreate",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      width: 120,
      render: (img) => (
        <img
          onClick={this.showImgModal(img)}
          style={{ width: 50, height: 40, cursor: "pointer" }}
          src={img}
          alt="头像"
        />
      ),
    },
    {
      title: "操作",
      render: this.renderTableItem,
      width: 200,
      fixed: "right",
    },
  ];

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  render() {
    const {
      page,
      limit,
      tableLoading,
      previewVisible,
      previewImage,
    } = this.state;

    const teacherList = [
      {
        id: "1196725201876611073",
        gmtCreate: "2019-11-19 17:41:37",
        gmtModified: "2019-11-19 17:43:30",
        deleted: false,
        name: "测试",
        intro: "高级讲师",
        career: "高级讲师",
        level: 1,
        avatar:
          "https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg",
        sort: 0,
      },
      {
        id: "1192249914833055746",
        gmtCreate: "2019-11-07 09:18:25",
        gmtModified: "2019-11-19 17:41:14",
        deleted: false,
        name: "李四",
        intro: "高级讲师简介",
        career: "高级讲师",
        level: 1,
        avatar:
          "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/11/19/4cc99f87-232a-4712-894f-81a2ccb034d3.png",
        sort: 0,
      },
      {
        id: "1189426464967995393",
        gmtCreate: "2019-10-30 14:19:02",
        gmtModified: "2019-11-12 13:37:18",
        deleted: false,
        name: "王五",
        intro: "高级讲师简介",
        career: "高级讲师",
        level: 1,
        avatar:
          "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/65423f14-49a9-4092-baf5-6d0ef9686a85.png",
        sort: 0,
      },
      {
        id: "1189426437876985857",
        gmtCreate: "2019-10-30 14:18:56",
        gmtModified: "2019-11-12 13:37:35",
        deleted: false,
        name: "王二",
        intro: "高级讲师简介",
        career: "高级讲师",
        level: 1,
        avatar:
          "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/11/08/e44a2e92-2421-4ea3-bb49-46f2ec96ef88.png",
        sort: 0,
      },
      {
        id: "1189390295668469762",
        gmtCreate: "2019-10-30 11:55:19",
        gmtModified: "2019-11-12 13:37:52",
        deleted: false,
        name: "李刚",
        intro: "高级讲师简介",
        career: "高级讲师",
        level: 2,
        avatar:
          "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/b8aa36a2-db50-4eca-a6e3-cc6e608355e0.png",
        sort: 2,
      },
      {
        id: "1189389726308478977",
        gmtCreate: "2019-10-30 11:53:03",
        gmtModified: "2019-10-30 11:53:03",
        deleted: false,
        name: "晴天",
        intro: "高级讲师简介",
        career: "高级讲师资历",
        level: 2,
        avatar:
          "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/de47ee9b-7fec-43c5-8173-13c5f7f689b2.png",
        sort: 1,
      },
      {
        id: "1",
        gmtCreate: "2019-10-30 14:18:46",
        gmtModified: "2019-11-12 13:36:36",
        deleted: false,
        name: "张三",
        intro:
          "近年主持国家自然科学基金（6项）、江苏省重大科技成果转化项目（5项）、江苏省产学研前瞻性联合研究项目（3项）、省工业科技支撑、省高技术、省自然科学基金等省部级及其企业的主要科研项目40多个，多个项目在企业成功转化，产生了较好的经济、社会和环境效益。积极开展产学研科技合作，并与省内16家企业建立了江苏省研究生工作站，其中6家为江苏省优秀研究生工作站",
        career: "高级",
        level: 1,
        avatar:
          "https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg",
        sort: 0,
      },
    ].map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });

    const total = teacherList.length;

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>

        <div className="course-table">
          <div className="course-table-header">
            <h3>讲师数据列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新建</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Table
            columns={this.columns}
            dataSource={teacherList}
            rowKey="id"
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
            scroll={{ x: 1200 }}
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Teacher;
