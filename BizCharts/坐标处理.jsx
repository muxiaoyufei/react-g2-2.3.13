"use strict"

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape } from 'bizcharts';

import React,{Component} from 'react';
import {Checkbox,Modal} from 'antd';
import G2 from '@antv/g2';
import { DataView } from '@antv/data-set';
import './Performance.scss';
import { Link } from 'react-router'
import fetchData from '../../util/fetch.js';

class Testg2 extends React.Component {
    constructor(props) {
      super(props); 
      this.state = {
          Data:[],
          Binding:"4944BF71017C4C3ABFDBBD1C4E331804",
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
              return({time:arr.sDateField1,"org":org,"sumaccount":arr.sumaccount,"finish":data.finished})
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
      console.log("test>>>",this.state.Data)
      const {Data}=this.state;
        // 定义度量
        const dv = new DataView().source(Data);
        dv.transform({
          type: 'fold',
          fields: ['sumaccount','org','finish'],
          key: '状态',                   // key字段
          value: 'value',               // value字段
          retains: [ 'time' ]        // 保留字段集，默认为除 fields 以外的所有字段
        });
        const cols={
          "value":{
            min:0,
            max:150000,
           // nice: false,
            formatter: function(val) {
              return val/10000 + 'w';
            },
            // tickInterval:2
          },
          'time':{
            type: 'time',
           // tickInterval: 24 * 3600 * 1000 * 15
           ticks: ['2017-10-9','2017-10-26', '2017-10-26', '2017-11-16', '2017-11-23']
          },
          // 'org':{
          //   min:0,
          //   max:150000,
          //   tickInterval:2
          //   // max:15,
          //   // formatter: function(val) {
          //   //   return val + 'w';
          //   // },
          //   // nice: false,
          // },
          // 'finish':{
          //   min:0,
          //   max:15,
          //   formatter: function(val) {
          //     return val + 'w';
          //   },
          //   nice: false,
          // },
          // 'account':{
          //   min:0,
          //   max:15,
          //   formatter: function(val) {
          //     return val + 'w';
          //   },
          //   nice: false,
          // }
        };
        const scale = {
          'time':{
            ticks:['2017-10-9','2017-10-26', '2017-10-26', '2017-11-16', '2017-11-23'],//用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
          // tickInterval:24 * 3600 * 1000 * 15,//用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
          // tickCount:10,//定义坐标轴刻度线的条数，默认为 5
          }
        };
  
        return (
          <div  className="testg">
            <Chart height={window.innerHeight} scale={cols}  forceFit data={dv} >
                <Axis name="time"  />
                 <Axis name="value" 
                 // label={{
                //   formatter: val => {
                //     return (val / 10000)+ 'w';
                //   }
                // }} 
                />
                <Geom type="line" position='time*value' size={2} color={'状态'}  />
                <Geom type="area" position='time*value' color={'状态'} /> 
              <Legend />
              <Tooltip crosshairs={{type:'line'}}/>
            </Chart>
          </div>
        )
    }
}

export default Testg2
