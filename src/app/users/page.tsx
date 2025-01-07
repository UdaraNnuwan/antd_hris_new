"use client";
import React, { useState } from "react";
import { Card, Table, Typography, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

const Users = () => {
  // Static array of users with default roles
  const [data, setData] = useState([
    { key: 1, name: "Ganesh", role: "SuperUser" },
    { key: 2, name: "Udara", role: "NormalUser" },
    { key: 3, name: "Tharanga", role: "SuperUser" },
    { key: 4, name: "Nuwan", role: "NormalUser" },
    { key: 5, name: "Amila", role: "SuperUser" },
  ]);

  // Update role in state
  const handleRoleChange = (key: number, newRole: string) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.key === key ? { ...user, role: newRole } : user
      )
    );
  };

  // Define columns for the table
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record: { key: number }) => (
        <Select
          value={role}
          onChange={(newRole) => handleRoleChange(record.key, newRole)}
          style={{ width: 150 }}
        >
          <Option value="SuperUser">SuperUser</Option>
          <Option value="NormalUser">NormalUser</Option>
        </Select>
      ),
    },
  ];

  return (
    <Card
      bordered={false}
      style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
    >
      <Title level={3}>Users</Title>
      <Table dataSource={data} columns={columns} rowKey="key" pagination={false} />
    </Card>
  );
};

export default Users;
