import React from 'react'
import { Space , Spin } from 'antd'
import './index.scss'

function Loader() {
  return (
    <div className='loader'>
      <p>Loading..Please Wait..</p>
        <Space size="middle">
            <Spin size="large" />
        </Space>
    </div>
  )
}

export default Loader