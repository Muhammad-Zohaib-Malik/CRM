import useSWR, { mutate } from 'swr'
import fetcher from '../../lib/fetcher'
import { Button, Divider, Form, Input, Modal, Skeleton, Table,Pagination } from 'antd'
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  ImportOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment'
import lodash from 'lodash'
import * as XLS from "xlsx";


axios.defaults.baseURL = 'http://localhost:8080'


const Customer = () => {

  const [page,setPage]=useState(1)
  const [limit]=useState(5)
  const { data, isLoading } = useSWR(`/customers?page=${page}`, fetcher)
  const [filter, setFilter] = useState([])
  const [open, setOpen] = useState(false)
  const [importModel,setImportModel]=useState(false)

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/customers/${id}`);
      mutate(`/customers?page=${page}`); 
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };


  const onPaginate = async (pageNo) => {
    setPage(pageNo)
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
      'key': 'created',
      title: 'Created',
      render: (item) => ( 
        <label>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
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
      mutate(`/customers?page=${page}`)
      toast.success(response.data.message)
      setOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred")
    }
  }

  const onSearch=lodash.debounce((e)=>{
      const key=e.target.value.trim()
      const filtered=data.filter((item)=>item.fullname.toLowerCase().includes(key.toLowerCase()))
      setFilter(filtered)
  },500)

const downloadSample=()=>{
  const a=document.createElement('a')
  a.href='/sample.xlsx'
  a.download='sample.xlsx'
  a.click()
  a.remove()
}

const importXlsFile=async(e)=>{
  const input=e.target
  const file=input.files[0]
 if (
  file.type !== "application/vnd.ms-excel" &&
  file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
) {
  toast.error("Invalid file format");
  return;
}

  const reader=new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload=(e)=>{
    const result=new Uint8Array(e.target.result)
    const excelFile=XLS.read(result,{type:'array'})
    const key=excelFile.SheetNames[0]
    const sheet=excelFile.Sheets[key]
    const data=XLS.utils.sheet_to_json(sheet)
    if(data.length==0)
    {
      return toast.error('No data found in file')
    }
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
          className=' !w-[350px]'
          onChange={onSearch} />
       <div className='space-x-2'>
         <Button 
          icon={<ImportOutlined />}
          iconPosition='start'
          size='large' onClick={()=>setImportModel(true)}>Import Customer</Button>
          <Button type='primary'
          icon={<PlusOutlined />}
          iconPosition='start'
          className='!bg-violet-500'
          size='large' onClick={() => setOpen(true)}>Add Customer</Button>
       </div>

      </div>
      <Table
        columns={columns}
        dataSource={filter.length > 0 ? filter : data}
        rowKey="_id"
        pagination={false}
        />
      <Pagination  align='end'
       total={50}
        onChange={onPaginate}
         current={page}
           pageSize={limit}
           /> 
      
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


      <Modal open={importModel} footer={null} title="Import Customer Record" onCancel={() => setImportModel(false)} maskClosable={false}>
      <Divider/>
      <div className='grid grid-cols-2'>
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold '>Sample XLS File Format</h1>
          <Button icon={<DownloadOutlined size='large'/>} onClick={downloadSample}>Download Sample</Button>
        </div>  
        <div className='flex justify-center relative '>
          <Button className='!w-[100px] !h-[100px] flex flex-col !text-gray-500'>
            <UploadOutlined className='text-3xl'/>Upload
            <input type="file"
              accept='.xls' 
              className='w-full h-full absolute top-0 left-0 opacity-0'
              onChange={importXlsFile}/>
            </Button>
        </div>
      </div>
      </Modal>

    </div >
  )
}

export default Customer
