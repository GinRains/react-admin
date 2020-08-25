import React, {Component} from 'react';
import {Card, Button, DatePicker} from 'antd'
import moment from 'moment'

const tabList = [
  {
    key: 'scales',
    tab: '销售额',
  },
  {
    key: 'visited',
    tab: '访问量',
  }
];

const contentList = {
  scales: <p>scales content...</p>,
  visited: <p>visited content...</p>
};

const { RangePicker } = DatePicker;

class Scales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "scales",
      contentBtn: "day",
      disDate: [moment(), moment()]
    }
  }

  onTabChange = key => {
    this.setState({
      key
    })
  }
  handleChangeBtnType = date => () => {
    let newDate = []
    switch (date) {
      case 'day':
        newDate = [moment(), moment()]
        break;
      case 'week':
        newDate = [moment(), moment().add(7, 'd')]
        break;
      case 'month':
        newDate = [moment(), moment().add(1, 'M')]
        break;
      case 'year':
        newDate = [moment(), moment().add(1, 'y')]
        break;
      default:
        newDate = [moment(), moment()]
    }

    this.setState({
      contentBtn: date,
      disDate: newDate
    })
  }

  handleRangePicker = dateArr => {
    this.setState({
      disDate: dateArr
    })
  }

  render() {
    const extra = (
      <>
        <Button type={this.state.contentBtn === "day" ? "link" : "text"} onClick={this.handleChangeBtnType("day")}>今日</Button>
        <Button type={this.state.contentBtn === "week" ? "link" : "text"} onClick={this.handleChangeBtnType("week")}>本周</Button>
        <Button type={this.state.contentBtn === "month" ? "link" : "text"} onClick={this.handleChangeBtnType("month")}>本月</Button>
        <Button type={this.state.contentBtn === "year" ? "link" : "text"} onClick={this.handleChangeBtnType("year")}>本年</Button>
        <RangePicker value={this.state.disDate} onChange={this.handleRangePicker}/>
      </>
    )

    return (
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={this.state.key}
        tabBarExtraContent={extra}
        onTabChange={this.onTabChange}
      >
        {contentList[this.state.key]}
      </Card>
    );
  }
}

export default Scales;
