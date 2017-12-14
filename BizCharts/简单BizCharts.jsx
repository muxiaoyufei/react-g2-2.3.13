"use strict"

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide, Shape,View} from 'bizcharts';

import React,{Component} from 'react';
import {Checkbox,Modal} from 'antd';
import G2 from '@antv/g2';
import './Performance.scss';
import { Link } from 'react-router'
import fetchData from '../../util/fetch.js';

class Testg2 extends React.Component {
    constructor(props) {
      super(props); 
      this.state = {
          Data:[],
          Binding:"8D22EEEDD919BF70E5E0A691A2FA43C7",
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
              return({time:arr.sDateField1,"org":org,"sumaccount":arr.sumaccount})
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
        const cols={
          "sumaccount":{
            min:0,
            max:150000,
           // nice: false,
            // formatter: function(val) {
            //   return val + 'w';
            // },
            //tickInterval:2
          },
          'time':{
            type: 'time',
           // tickInterval: 24 * 3600 * 1000 * 15
           ticks: ['2017-10-9','2017-10-26', '2017-10-26', '2017-11-16', '2017-11-23']
          },
          'org':{
            min:0,
            max:150000,
            tickInterval:2
            // max:15,
            // formatter: function(val) {
            //   return val + 'w';
            // },
            // nice: false,
          },
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
        return (
          <div  className="testg">
            <Chart height={window.innerHeight} scale={cols}  forceFit data={Data}>
                <Axis name="time"/>
                <Axis name="sumaccount" label={{
                  formatter: val => {
                    return (val / 10000)+ 'w';
                  }
                }} />  
              <Legend />
              <Tooltip crosshairs={{type:'line'}} />
              <Geom type="line" position='time*sumaccount' size={2}  />
              <Geom type="area" position='time*sumaccount'  /> 
            </Chart>
          </div>
        )
    }
}

export default Testg2
