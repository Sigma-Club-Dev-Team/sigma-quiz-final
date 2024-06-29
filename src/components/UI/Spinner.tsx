import React from 'react'
import {Loading3QuartersOutlined, CaretLeftOutlined} from "@ant-design/icons"
import {Spin} from "antd"

function Spinner({fontSize, color}:{fontSize?: string, color?: string}) {
    const antIcon = (
        <Loading3QuartersOutlined style={{ fontSize: fontSize ? fontSize : "36px", color: color ?? "#327AEF", fontWeight: 'bolder' }} spin />
    );
  return (
    <div className="center">
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Spinner