import { Legend, Title } from 'chart.js';
import React from 'react';
import { Line, Chart } from 'react-chartjs-2'; 
import DraggableBar from './DraggableUsage';
import Draggable from 'react-draggable';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useState, useEffect} from 'react';
import DragBox from './DragBox';
import axios from 'axios';
import * as constants from '../../Constants'

function valuetext(value) {
  return `${value}°C`;
}

// let AFEData = [];



const TimeLine = (props) =>{
  const proxy = constants.PROXY
  const [AFE,setAFE] = useState([])
  const [AFEData,setAFEData] = useState([])
  

  let volc_num = props.onGetVolcNum();

  useEffect(() =>{
    axios.get(`${proxy}/volcanoes/getAFE`)
        .then(data =>{
         
          setAFE(data.data.afes)
        })

         
	},[])

 
  let FinalAFEData = []
  let TaalData = props.onGetTaalData();
  

  

  useEffect(()=>{
    let a = []
      if(AFE.length != 0){
      for(let i =0;i<12;i++){
        if(AFE[i]['volc_num'] === volc_num){
        let s = AFE[i]['afe_date'].substr(0,4) + '.' + AFE[i]['afe_date'].substr(5,7);
        a.push({x: parseFloat(s),y:5});
        }
    }
      }
  setAFEData(a);
  
  },[AFE])
  

    

  let fillList = TaalData;

	// fillList.sort((a,b) => a.x > b.x && 1 || -1 )

  // let zoomList = [{x:fillList[0],y:0}];
  
	// for(let i=0;i<fillList.length;i++){
	// 	zoomList.push(fillList[i]);
	// 	if(zoomList.length%2 === 0){
	// 		zoomList.push({
	// 			x:zoomList[zoomList.length - 1].x,
	// 			y:0
	// 		});
	// 		if(i< fillList.length - 1){
	// 		zoomList.push({
	// 			x:fillList[i+1].x,
	// 			y:0
	// 		});
	// 		}
	// 	}
	// }

  


  const [value, setValue] = React.useState([72, 78]);
  const [first,setFirst] = useState(0);
  const [last,setLast] = useState(1);

  const CreateLabel = (startYear) => {
    let temp = startYear;
    let list = [];
    while(temp - startYear < 9){
      if(temp <= (Math.floor(temp)+0.12)){
        if(temp === Math.floor(temp)+0.01){
          list.push(temp);
          temp+=0.01;
         
          continue;
        }
        else if(temp === Math.floor(temp))
          temp+=0.01;
        else{
        list.push(temp);
        temp += 0.01;}
       }
      else{
        temp = Math.floor(temp) + 1; 
      }
    }
    list.push(startYear+9);

    return list;
  }

  const [EruptionLabel,setEruptionLabel] = useState(CreateLabel(2021));
  
  const MovePrev = () =>{
      let newlist = [];
      newlist = CreateLabel(EruptionLabel[0]-10);
      if(newlist[0] <= 1911){
        setFirst(1);
      }
      else{
        setFirst(0);
        setLast(0);
      }
      setEruptionLabel([...newlist]);
  }

  const MoveForward = () =>{
    let newlist = [];
    newlist = CreateLabel(EruptionLabel[EruptionLabel.length -1 ]+1);
    if(newlist[newlist.length - 1] >= 2030){
      setLast(1);
    }
    else{
      setLast(0);
      setFirst(0);
    }
    setEruptionLabel([...newlist]);
  }

  let t;
  FinalAFEData = AFEData.filter(n => n.x>=EruptionLabel[0]&&n.x<=EruptionLabel[EruptionLabel.length - 1])
  
 for(let i=0;i<fillList.length;i+=2){
  if(fillList[i].x < EruptionLabel[0] && fillList[i+1].x > EruptionLabel[0]  ){
    fillList[i].x = EruptionLabel[0];
    fillList[i].y = 10;
  }
  
  if(fillList[i+1].x > EruptionLabel[EruptionLabel.length - 1] && fillList[i].x < EruptionLabel[EruptionLabel.length -1]  ){
    fillList[i+1].x = EruptionLabel[EruptionLabel.length - 1];
  }

 }

 fillList.sort((a,b) => a.x > b.x && 1 || -1 )

  let zoomList = []
  
	for(let i=0;i<fillList.length;i++){
		zoomList.push(fillList[i]);
		if(zoomList.length%2 === 0){
			zoomList.push({
				x:zoomList[zoomList.length - 1].x,
				y:0
			});
			if(i< fillList.length - 1){
			zoomList.push({
				x:fillList[i+1].x,
				y:0
			});
			}
		}
	}




	const graphData = {
		labels: EruptionLabel,
  datasets: [{
      label: 'Line Dataset',
      data: zoomList.filter(n => n.x>=EruptionLabel[0]&&n.x<=EruptionLabel[EruptionLabel.length - 1]),
      fill: true,
      showLine: false,
      pointRadius: 0,
      backgroundColor: 'green',
      pointRadius: 0,
    },
    {
      position: 'Right',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'red',
      borderColor: 'rgba(0,0,0,1)',
      pointStyle: 'rectRot',
      borderWidth: 1,
      pointRadius: 10,
      showLine: false,
      data: FinalAFEData,
      
    }
    
    
  ],
    }


const opt = {
		maintainAspectRatio: false,
            scales: {
              y: {
                display:false,
              },

              x:{
                display:true,
                ticks: {
                  callback: function(tick, index, array){
                    return (index%12)? "" : EruptionLabel[tick];
                  }
              },
              }
            },

            plugins: {
              title: {
                  display: true,
                  text: 'Eruption History',
                  font: {
                    size: 25
                  }
              },

              legend:{
                display: false,
              }

              
          },

	}


  

  const [w,setW] = useState(window.innerWidth);
  const [posMouseDown,setPosMouseDown] = useState(0);
  const [posMouseUp,setPosMouseUp] = useState(0);
  const [yearDown,setYearDown] = useState(1955);
  const [yearUp,setYearUp] = useState(1955);
  const [monthDown,setMonthDown] = useState(0);
  const [monthUp,setMonthUp] = useState(0);


  const MouseDown = () => {
   
    var e = window.event;

    var posX = e.clientX;
    setYearDown((1/6)*(posX/w - 21/w)/(37/2090) + EruptionLabel[0] );
    var yD = (1/6)*(posX/w - 21/w)/(37/2090) + EruptionLabel[0] ;
    setMonthDown( Math.floor((yD-Math.floor(yD)) /0.08333333333) + 1 );

    setPosMouseDown(posX/w);
  
  }




  window.addEventListener("resize", () => {
    setW(window.innerWidth);
  })

  window.addEventListener("onload", () => {
    setW(window.innerWidth);
  })



  const MouseUp = () => {
   
    var e = window.event;
    var w = window.innerWidth;
    var posX = e.clientX;
    setYearUp((1/6)*(posX/w - 21/w)/(37/2090) + EruptionLabel[0]  );
    var yU = (1/6)*(posX/w - 21/w)/(37/2090) + EruptionLabel[0] ;
    var m = Math.floor((yU-Math.floor(yU)) /0.08333333333) + 1 ;
    props.onPassData(yearDown,yU);
    setMonthUp( Math.floor((yU-Math.floor(yU)) /0.08333333333) + 1 );

    setPosMouseUp(posX/w);
    setPosMouseDown(0);
 
  }

 

  let moveButton;
  if(last === 1){
    moveButton = <div className = 'mButton'>
      <h3 className = 'prevButton' onClick = {MovePrev} >prev</h3>
      <h3 className = 'nextButton' ></h3>
    </div>
  }
  else if (first === 1){
    moveButton = <div className = 'mButton'>
      <h3 className = 'prevButton' ></h3>
      <h3 className = 'nextButton' onClick = {MoveForward} >next</h3>
    </div>
  }
  else{
    moveButton = <div className = 'mButton'>
      <h3 className = 'prevButton' onClick = {MovePrev} >prev</h3>
      <h3 className = 'nextButton' onClick = {MoveForward} >next</h3>
    </div>
  }


	return(
    <div>
      <div
      onMouseDownCapture = {MouseDown}
      onMouseUpCapture = {MouseUp}
      >
        <DragBox  ></DragBox>
      </div>
      <div
      class = 'graph'
      >
          <Line 

		    data={graphData}
		    height={300}
		    width={300}
		    options={opt}
  
       
        />
    
      </div>
      {moveButton}
    </div>
		
	);
}

export default TimeLine;