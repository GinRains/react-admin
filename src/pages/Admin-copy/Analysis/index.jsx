import React, {Component} from 'react';
import {Col, Row, Statistic, Progress} from "antd";
import {AreaChart, ColumnChart} from "bizcharts";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import Card from '@comps/Card'

const initRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
};

// 数据源
const data = [
  { year: '1991', value: 6 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 12 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

// 数据源
const columnData = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

class Analysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500)
  }

  render() {
    return (
      <Row gutter={[16, 16]}>
        <Col {...initRowCol}>
          <Card title={<Statistic title={"总销售额"} prefix={"￥"} value={112893} />} loading={this.state.isLoading} footer={<span>日销售额 ￥ 12,434</span>}>
            <span>周同比 12%<CaretUpOutlined style={{color: "red"}} /> 日同比 10%<CaretDownOutlined style={{color: "green"}} /> </span>
          </Card>
        </Col>
        <Col {...initRowCol}>
          <Card title={<Statistic title={"访问量"} value={22222} />} loading={this.state.isLoading} footer={<span>日销售额 ￥ 12,434</span>}>
            <AreaChart
              data={data}
              title={{
                visible: false
              }}
              xField='year'
              yField='value'
              xAxis={{visible: false}}
              yAxis={{visible: false}}
              padding={'0'}
              color={["#00A4FF"]}
              smooth={true}
            />
          </Card>
        </Col>
        <Col {...initRowCol}>
          <Card title={<Statistic title={"支付笔数"} value={33333} />} loading={this.state.isLoading} footer={<span>转化率 60%</span>}>
            <ColumnChart
              data={columnData}
              title={{
                visible: false
              }}
              forceFit
              padding='0'
              xField='type'
              yField='sales'
              xAxis={{visible: false}}
              yAxis={{visible: false}}
              meta={{
                type: {
                  alias: '类别',
                },
                sales: {
                  alias: '销售额(万)',
                },
              }}
            />
          </Card>
        </Col>
        <Col {...initRowCol}>
          <Card title={<Statistic title={"运营结果"} value={44444} />} loading={this.state.isLoading} footer={<span>周同比 12%<CaretUpOutlined style={{color: "red"}} /> 日同比 10%<CaretDownOutlined style={{color: "green"}} /> </span>}>
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
              percent={80.9}
              status="active"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Analysis;
