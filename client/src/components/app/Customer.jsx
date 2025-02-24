import useSWR, { mutate } from 'swr'
import fetcher from '../../lib/fetcher'
import { Button, Skeleton, Table } from 'antd'
import {
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080'


const Customer = () => {
  const { data, error, isLoading } = useSWR('/customers', fetcher)
  console.log(data, error)

  const deleteCustomer = async (id) => {
    await axios.delete(`/customers/${id}`)
    mutate('/customers')
  }

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

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id">
      </Table>
    </div>
  )
}

export default Customer
