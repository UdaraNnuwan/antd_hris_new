"use client"
import React, {useState } from 'react'
import axiosInstance from '@/lib/api/axiosClient';
import { Button, Card, DatePicker, message, Space, Table,Typography } from 'antd';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const OtCal=()=> {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Day Shift", dataIndex: "dayShiftCount", key: "dayShiftCount" },
    { title: "Full Day Leave", dataIndex: "fullDayLeave", key: "fullDayLeave" },
    { title: "Night Allowance Count", dataIndex: "nightAllowanceCount", key: "nightAllowanceCount" },
    { title: "Night Shift Count", dataIndex: "nightShiftCount", key: "nightShiftCount" },
    { title: "Double OT", dataIndex: "dobleOt", key: "dobleOt" },
    { title: "Double OT Duration", dataIndex: "dobleOtDuration", key: "dobleOtDuration" },
    { title: "Normal OT", dataIndex: "normalOt", key: "normalOt" },
    { title: "Normal OT Duration", dataIndex: "normalOtDuration", key: "normalOtDuration" },
    { title: "Late", dataIndex: "late", key: "late" },
  ];

  const fetchData = async () => {
    if (!range || range.length !== 2) {
      message.warning("Please select a valid date and time range.");
      return;
    }
    const [start, end] = range && range.length === 2
    ? range.map((date: Dayjs | null) => 
        date ? date.format("YYYY-MM-DD HH:mm:ss") : ''
      )
    : ['', '']; // Default to empty strings if range is null or doesn't have two elements
  
  console.log(start, end);

    const payload = {
      checkIn: start,
      checkOut: end,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/check-time", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const rawData = response.data.data;
      const processedData: { [key: string]: string } = {
        dayShiftCount: rawData.dayShiftCount,
        fullDayLeave: rawData.fullDayLeave,
        nightAllowanceCount: rawData.nightAllowanceCount,
        nightShiftCount: rawData.nightShiftCount,
        dobleOt: `${rawData.dobleOt.hours}h ${rawData.dobleOt.minutes}m`,
        normalOt: `${rawData.normalOt.hours}h ${rawData.normalOt.minutes}m`,
        dobleOtDuration: rawData.dobleOt.timeDuration,
        normalOtDuration: rawData.normalOt.timeDuration,
        late: `${rawData.late.hours}h ${rawData.late.minutes}m`,
      };
      
      const arr: { [key: string]: string }[] = []; // Array of objects
      arr.push(processedData);
      setData(arr);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };
  
  return (
   <>
      <Card title="Select Time" bordered={false} style={{ marginBottom: 20, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", backgroundColor: "#ffffff" }}>
        <Space direction="vertical" style={{ marginBottom: 20 }}>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(values) => setRange(values ? values : null)} // Handle null case explicitly
            style={{ width: "100%" }}
          />
          <Button type="primary" onClick={fetchData} loading={loading} style={{ width: "100%", padding: "12px 0" }}>
            Fetch Data
          </Button>
        </Space>
      </Card>
      
         <Card bordered={false} style={{ backgroundColor: "#ffffff", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
        <Title level={3}>Shift Data</Title>
        <Table dataSource={data} columns={columns} rowKey="key" pagination={false} />
      </Card>
   </>
  )
}

export default OtCal