import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";

import "./index.less";

const { Option } = Select;
const { RangePicker } = DatePicker;

function SearchForm() {
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="姓名">
        <Input placeholder="讲师姓名" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="级别">
        <Select
          allowClear
          placeholder="课程级别"
          style={{ width: 250, marginRight: 20 }}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="时间">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
