import useSWR, { mutate } from 'swr'
import fetcher from '../../lib/fetcher'
import { Button, Divider, Form, Input, Modal, Skeleton, Table } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment'
axios.defaults.baseURL = 'http://localhost:8080'


const Customer = () => {
  const { data, isLoading } = useSWR('/customers', fetcher)
  const [open, setOpen] = useState(false)

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/customers/${id}`);
      mutate('/customers'); // Refresh the customer list
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const columns = [
    {
      key: 'fullname',
      title: 'Fullname',
      dataIndex: 'fullname',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'mobile',
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      'key': 'created',
      title: 'Created',
      render: (item) => (
        <label>{moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}</label>
      )


    },
    {
      key: 'actions',
      title: 'Actions',
      render: (item) => (
        <div className='space-x-2'>
          <Button icon={<EditOutlined />} className="!text-violet-600 !border-violet-600 !border-2" />
          <Button onClick={() => deleteCustomer(item._id)} icon={<DeleteOutlined />} className="!text-rose-600 !border-rose-600 !border-2" />
        </div>
      ),
    }
  ];

  const addCustomer = async (values) => {
    try {
      const response = await axios.post('/customers', values)
      mutate('/customers')
      toast.success(response.data.message)
      setOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred")
    }
  }

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <div className='space-y-5 '>
      <div className='flex justify-between items-center ' >
        <Input size='large'
          placeholder='Search Customers'
          suffix={<SearchOutlined className='!text-gray-500' />}
          className=' !w-[350px]' />
        <Button type='primary'
          icon={<PlusOutlined />}
          iconPosition='start'
          className='!bg-violet-500'
          size='large' onClick={() => setOpen(true)}>Add Customer</Button>

      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id">
      </Table>
      <Modal open={open} footer={null} title="Add Customer" onCancel={() => setOpen(false)} maskClosable={false}>
        <Divider />
        <Form layout='vertical' onFinish={addCustomer}>

          <Form.Item label='Customer Name' rules={[{ required: true }]} name="fullname">
            <Input size='large' placeholder='John' />
          </Form.Item>

          <Form.Item label='Email' rules={[{ required: true }]} name="email">
            <Input size='large' placeholder='John@gmail.com' />
          </Form.Item>

          <Form.Item rules={[{ required: true }]} name='mobile'>
            <PhoneInput
              country={'pk'}
              containerClass='!w-full '
              inputClass='!w-full'
            />
          </Form.Item>

          <Form.Item>
            <Button onCancel={() => setOpen(false)} icon={<UserOutlined />} htmlType='submit' size='large' type='primary'>Add Now</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}

export default Customer
