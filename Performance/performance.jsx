"use strict"

import React,{Component} from 'react';
import {Checkbox,Modal} from 'antd';
import createG2 from 'g2-react';
import { Stat ,Frame} from 'g2';
import './Performance.scss';
import { Link } from 'react-router'
import fetchData from '../../util/fetch.js';
import Test from './test.jsx'
import FixTest from './fixtest.jsx'

const Chart = createG2(chart => {
  chart.col("已结束-未处理(>70%)",{
    min:0,
    max:15,
    nice: false,
    formatter: function(val) {
      return val + 'w';
    },
    tickInterval:2
  })
  chart.col('time',{
    type: 'time',
   // tickInterval: 24 * 3600 * 1000 * 15
   ticks: ['2017-10-9','2017-10-26', '2017-10-26', '2017-11-16', '2017-11-23']
  })
  chart.col('目标',{
    min:0,
    max:15,
    formatter: function(val) {
      return val + 'w';
    },
    nice: false,
  })
  chart.col('已结束',{
    min:0,
    max:15,
    formatter: function(val) {
      return val + 'w';
    },
    nice: false,
  });
  chart.col('account',{
    min:0,
    max:15,
    formatter: function(val) {
      return val + 'w';
    },
    nice: false,
  });
  chart.axis('目标', false);
  chart.axis('已结束', false);
  chart.axis('account', false);
  chart.axis("已结束-未处理(>70%)", {
    title: null,
    tickLine: false,
    nice: false,
    line: {
      stroke: '#000'
    },
    grid: {
      line: {
        stroke: '#d9d9d9'
      }
    }
  });
  chart.axis('time', {
    title: null,
    tickLine: false,
    line: {
      stroke: '#000'
    },
    grid: {
      line: {
        stroke: '#d9d9d9'
      }
    }
  });
  // chart.tooltip(true,{
  //   // map: { // 用于指定 tooltip 内显示内容同原始数据字段的映射关系
  //   //   title: 'time', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量
  //   //   name: 'account', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量
  //   //   value: 'account' // 为数据字段名时则显示该字段名对应的数值
  //   // },
  //   crosshairs: true
  // });
  chart.line().position('time*已结束-未处理(>70%)').size(1).color('#69b9d4');
  chart.area().position('time*已结束-未处理(>70%)').color('#69b9d4').opacity(0.15);
  chart.line().position('time*目标').size(2).color('#60be88'); 
  chart.line().position('time*已结束').size(2).color('#efb975'); 
  chart.render();
  const lastPoint  = chart.get('plotRange').br;
  chart.showTooltip(lastPoint);
  chart.on('tooltipchange', function(ev) {
    let items = ev.items; // tooltip显示的项
    let origin = items[1]; // 将一条数据改成多条数据
    console.log("origin>>>",origin.title,"---",items)
    let account = origin.point._origin.account+"w";
    items.splice(0); // 清空
    items.push({
      title: origin.title,
      name: '业务机会',
      marker: true,
      color: origin.color,
      value: account
    });
  });
});

class Performance extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {
            Data:[],

            Binding:"53E6FAD2CF7CD4541635BB5EB0079B93",
            // forceFit: true,
            forceFit: true,
            width: 500,
            height: 600,
            // stateList:[],
            // perData:[],
            // perCompData:{}
        }
        
    }
    // 获取绩效表数据
    getData(url, opts) { 
      fetchData(url, opts, function (res) {
          let data = eval(res);
          let item=data.businessData;
          let org=data.target
          let list=[];
          if(!item || item.length==0){
            list=[]
          }else{
            list=item.map((arr)=>{
            //   let creat1=arr.creatdata
            //  let creatData=new Data(creat1)
              return({...arr,time:arr.sDateField1,"org":org,"finish":data.finished})
            })
          }
          this.setState({
              Data: list         
          });
          
      }.bind(this))
    }
    componentDidMount(){
      let {Binding}=this.state;
      this.getData('http://117.122.226.252:9997/api/component/salesDashboard/list',{"binding":Binding})
    }
    
    render() {
       console.log("Data>>>>",this.state.Data)
       const {Data}=this.state;
       let frame = new Frame(Data);
       frame.addCol('已结束-未处理(>70%)', function(obj) {
         return obj.sumaccount/10000;
       });
       frame.addCol('目标', function(obj) {
         return obj.org/10000;
       });
       frame.addCol('已结束', function(obj) {
        return obj.finish/10000;
      });
      frame.addCol('account', function(obj) {
        return obj.account/10000;
      });
       frame = Frame.combinColumns(frame,'account', ['sDateField1', '目标','已结束','已结束-未处理(>70%)',]);
        
        return (
            <div className="performance">
            <Test />
            <FixTest />
                <Chart
                  data={frame }
                  width={this.state.width}
                  height={this.state.height}
                  forceFit={this.state.forceFit}
                />
            </div>
        )
    }
}

export default Performance
