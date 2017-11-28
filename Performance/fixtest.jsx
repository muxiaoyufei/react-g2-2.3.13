;"use strict"

import React,{Component} from 'react';
import {Checkbox,Modal} from 'antd';
import createG2 from 'g2-react';
import { Stat ,Frame} from 'g2';
import './Performance.scss';
import { Link } from 'react-router'

const data = [
  { time: 1246406400000, temperature: [ 14.3, 27.7 ], averages: 21.5 },
  { time: 1246492800000, temperature: [ 14.5, 27.8 ], averages: 22.1 },
  { time: 1246579200000, temperature: [ 15.5, 29.6 ], averages: 23 },
  { time: 1246665600000, temperature: [ 16.7, 30.7 ], averages: 23.8 },
  { time: 1246752000000, temperature: [ 16.5, 25.0 ], averages: 21.4 },
  { time: 1246838400000, temperature: [ 17.8, 25.7 ], averages: 21.3 },
  { time: 1246924800000, temperature: [ 13.5, 24.8 ], averages: 18.3 },
  { time: 1247011200000, temperature: [ 10.5, 21.4 ], averages: 15.4 },
  { time: 1247097600000, temperature: [ 9.2, 23.8 ], averages: 16.4 },
  { time: 1247184000000, temperature: [ 11.6, 21.8 ], averages: 17.7 },
  { time: 1247270400000, temperature: [ 10.7, 23.7 ], averages: 17.5 },
  { time: 1247356800000, temperature: [ 11.0, 23.3 ], averages: 17.6 },
  { time: 1247443200000, temperature: [ 11.6, 23.7 ], averages: 17.7 },
  { time: 1247529600000, temperature: [ 11.8, 20.7 ], averages: 16.8 },
  { time: 1247616000000, temperature: [ 12.6, 22.4 ], averages: 17.7 },
  { time: 1247702400000, temperature: [ 13.6, 19.6 ], averages: 18.1 },
  { time: 1247788800000, temperature: [ 11.4, 22.6 ], averages: 18.1 },
  { time: 1247875200000, temperature: [ 13.2, 25.0 ], averages: 18.1 },
  { time: 1247961600000, temperature: [ 14.2, 21.6 ], averages: 17.2 },
  { time: 1248048000000, temperature: [ 13.1, 17.1 ], averages: 14.4 },
  { time: 1248134400000, temperature: [ 12.2, 15.5 ], averages: 13.7 },
  { time: 1248220800000, temperature: [ 12.0, 20.8 ], averages: 15.7 },
  { time: 1248307200000, temperature: [ 12.0, 17.1 ], averages: 14.6 },
  { time: 1248393600000, temperature: [ 12.7, 18.3 ], averages: 15.3 },
  { time: 1248480000000, temperature: [ 12.4, 19.4 ], averages: 15.3 },
  { time: 1248566400000, temperature: [ 12.6, 19.9 ], averages: 15.8 },
  { time: 1248652800000, temperature: [ 11.9, 20.2 ], averages: 15.2 },
  { time: 1248739200000, temperature: [ 11.0, 19.3 ], averages: 14.8 },
  { time: 1248825600000, temperature: [ 10.8, 17.8 ], averages: 14.4 },
  { time: 1248912000000, temperature: [ 11.8, 18.5 ], averages: 15 },
  { time: 1248998400000, temperature: [ 10.8, 16.1 ], averages: 13.6 }
];
const Chart = createG2(chart => {
  chart.col('temperature',{
    min:0,
    max:35,
    nice: false,
    tickInterval: 2
  })
  chart.col('time',{
    type: 'time',
    tickInterval: 24 * 3600 * 1000 * 2
  })
  chart.col('averages',{
    min:0,
    max:35,
    nice: false,
  })
  chart.axis('averages', false);
  chart.axis('temperature', {
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
  chart.tooltip({
    crosshairs: true
  });
  chart.area().position('time*temperature').color('#d8d8ff').opacity(0.8);
  chart.line().position('time*averages').size(2).color('#000'); 
  chart.render();
});

class FixTest extends React.Component {

    constructor(props) {
      super(props);
      let frame = new Frame(data);
      frame.addCol('temperature', function(obj) {
        return obj.temperature;
      });
      frame.addCol('averages', function(obj) {
        return obj.averages;
      });
      frame = Frame.combinColumns(frame, 'temperature', ['time', 'averages']);
      this.state = {
        Data:[],
        Binding:"B808D56CB3594D3E8A9C704B823ED908", 
        data: frame,
        forceFit: true,
        width: 500,
        height: window.innerHeight,
        plotCfg: {
          margin: [20, 100, 60]
        },   
      }    
    }
    render() {
        return (
            <div className="performance">
              <Chart
                data={this.state.data}
                averages={this.state.averages}
                width={this.state.width}
                height={this.state.height}
                plotCfg={this.state.plotCfg}
                forceFit={this.state.forceFit}
               />
            </div>
        )
    }
}

export default FixTest
