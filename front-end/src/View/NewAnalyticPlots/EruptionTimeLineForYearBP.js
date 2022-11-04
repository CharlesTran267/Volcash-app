import React from 'react';
import { Line } from 'react-chartjs-2';
import DragBox from './DragBox';
import { useState,useEffect } from 'react';
import * as constants from '../../Constants'
let c = 0

const axios = require('axios')
const proxy = constants.PROXY
const EruptionTimeLineForYearBP = (props) =>{
  const [eruptions,setEruptions] = useState([])
  const [volcanoes,setVolcanoes] = useState([])
  const [AFE,setAFE] = useState([])


  useEffect(() =>{
    axios.get(`${proxy}/volcanoes/getAFE`)
    .then(data =>{
      setAFE(data.data.afes)
    })


		axios.get(`${proxy}/volcanoes/getEruptions`)
		.then(data =>{
      setEruptions(data.data['eruptions'])
		})
	  axios.get(`${proxy}/volcanoes/getVolcanoes`)

         .then(response => {
           if(response.data.success){
             setVolcanoes(response.data.volcanoes)
           } else{
             alert("Failed to fetch data")
           }
         })	
        
	},[])
  let Vol = [];
  let TaalEruptionYear = [];
const TaalData = [];



var pathArray = window.location.pathname.split('/');
let vol = props.onPassVolcName();

let volc_num = 0;
for (let i=0;i<volcanoes.length;i++){
  if(volcanoes[i]['volc_name'] === vol ){
    volc_num = volcanoes[i]['volc_num'];
    break;
  }
}

let list = [];
// let timeMode = 0;

let check = {}

for(let i=0;i<eruptions.length;i++){
  let s = eruptions[i]['ed_yearsBP'];
  if(eruptions[i]['volc_name'] === vol && !check[s] ){
  
    check[s] = 1
    Vol.push({s:Math.floor(- parseFloat(s)/100)*100,e:Math.floor(( - parseFloat(s) + 1000)/100)*100})
    
  }

}

console.log(Vol)

Vol.reverse()

for(let i = -1200000;i<=0;i+=100){
  list.push(i);
}


// }
// catch{
//   list = []

//   for(let i=0;i<eruptions.length;i++){
//     if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_stime'] && eruptions[i]['ed_etime'] ){
//       let s = eruptions[i]['ed_yearsBP'];
//       let e = eruptions[i]['ed_yearsBP_unc'];
  
//       if(parseFloat(s) !== parseFloat(e)){
//       Vol.push({s:parseFloat(s),e:parseFloat(e)})
//       }
//       else{
//         Vol.push({s:parseFloat(s),e:parseFloat(e)+1})
//       }
  
//     }
//   }

// }

let VolEndYear=[]
// for(let i=0;i<eruptions.length;i++){
//   if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_etime']){
//     let s = eruptions[i]['ed_etime'].substr(0,4);
//     if(parseInt(s)>=1521  && parseInt(s) <= 2022){
//     VolEndYear.push(parseInt(s))
//   }
//   } 
// }

for(let i=0;i<Vol.length;i++){
  TaalEruptionYear.push(Vol[i].s)
  VolEndYear.push(Vol[i].e)
}



for(let i=0;i<TaalEruptionYear.length;i++){
  let s = {
    x: TaalEruptionYear[i],
    y: 10
  }
  TaalData.push(s);
  let e = {
    x: VolEndYear[i],
    y:10
  } 
  TaalData.push(e)

}



  



  const [lb,setLB] = useState(list);

  const [yearDown,setYearDown] = useState(0);
  const [yearUp,setYearUp] = useState(0);
  const [w,setW] = useState(window.innerWidth);
  const [EruptionLabel,setEruptionLabel] = useState([...list]);

  let TaalEndYear = props.onGetTaalEruptionEndYear();
  // let AFEDummyData = props.onGetDummyAFEData();
  let AFEDummyData = []

  try{
  for(let i =0;i<AFE.length;i++){
    if(AFE[i]['volc_num'] === volc_num){
    let s = AFE[i]['afe_date'].substr(0,4) + '.' + AFE[i]['afe_date'].substr(5,7);
    AFEDummyData.push({x: Math.floor(- parseFloat(s)/100)*100,y:5});
    }
  
}
  }
  catch{

  }

  console.log(AFEDummyData)
  let fillList = TaalData;

  // fillList.reverse()

  let zoomList = [];
 
  if(fillList.length >0 && c ===0){
  zoomList.push({x:fillList[0].x,
                  y:0}
    )
	for(let i=0;i<fillList.length;i++){
    
    zoomList.push(fillList[i])
		if(i>=1&& i<fillList.length -1 && i%2 ===1){
      zoomList.push({
        x:fillList[i].x,
        y:0
      })

      zoomList.push({
        x:fillList[i+1].x,
        y:0
      })
    }
	}

zoomList.push({
  x:fillList[fillList.length-1].x,
  y:0
})


  }




  window.addEventListener("resize", () => {
    setW(window.innerWidth);
  })

  window.addEventListener("onload", () => {
    setW(window.innerWidth);
  })


  // const MouseDown = () =>{
  //   var e = window.event;
  //   var w = window.innerWidth;
  //   var posX = e.clientX;
   
  //   setYearDown(EruptionLabel[0] - 20700*(posX/w-20/w)/(34/1987) );

      
  // }

  // const MouseUp = () =>{
  //   var e = window.event;
  //   var w = window.innerWidth;
  //   var posX = e.clientX;
  //   // let x = Math.floor((posX-19)/19)
  //   setYearUp( EruptionLabel[0] - 20700*(posX/w-20/w)/(34/1987)  );
  //   var yU =  EruptionLabel[0]-  20700*(posX/w-20/w)/(34/1987) ;
  //   // var m = Math.floor((yU-Math.floor(yU)) /0.1) + 1 ;
   
  //   props.onPassData(yearDown,yU);

  // }

  const MouseDown = () =>{
    var e = window.event;
    var w = window.innerWidth;
    var posX = e.clientX;
	
   
    let dis = Math.floor(list[Math.floor((list.length)/29)+1] - list[0]) 
    
    // console.log(Math.floor(Math.floor(dis*(posX/w-(462)/w)/(33/w) + list[0] )/1000)*1000)
    setYearDown(Math.floor(Math.floor(dis*(posX/w-(462)/w)/(33/w) + list[0] )/100)*100);
      
  }

  const MouseUp = () =>{
    var e = window.event;
    var w = window.innerWidth;
    var posX = e.clientX;
    // let x = Math.floor((posX-19)/19)
    let dis = Math.floor(list[(Math.floor(list.length/29))+1] - list[0]) 
    
  
    setYearUp(Math.floor(Math.floor(dis*(posX/w-(462)/w)/(33/w) + list[0] )/100)*100)
    var yU = Math.floor(Math.floor(dis*(posX/w-(462)/w)/(33/w) + list[0] )/100)*100
    // var m = Math.floor((yU-Math.floor(yU)) /0.1) + 1 ;
    console.log(yearDown)
   console.log(yU)
   
    props.onPassData(yearDown,yU);

  }

  console.log(zoomList)


	const graphData = {
		labels: lb,
  datasets: [
    {
      label: 'Line Dataset',
      data: zoomList,
      fill: true,
      showLine: false,
      pointRadius: 0,
      backgroundColor: 'rgba(0, 100, 0,0.5)',
     


  },
  {
    position: 'Right',
    fill: false,
    lineTension: 0.5,
    backgroundColor: '#7F131B',
    pointStyle: 'rectRot',
    pointRadius: 5,
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 0,
    data: AFEDummyData,
    showLine: false,
    pointRadius: 6,
  }
],
}

	const opt = {
		maintainAspectRatio: false,
    tooltips: {
      callbacks: {
          label: function (tooltipItem, data) {
              return Number(tooltipItem.yLabel).toFixed(2);
          }
      }
  },
            scales: {
              y: {
                display:false,
              },

              x:{
                display:true,
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 30,
              
              }
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

  for(let i =0;i<zoomList.length;i++){
    if(zoomList[i].x === 1911.11){
      alert('hhhhhh')
    }
  }

	return(
<div>
      <div
      onMouseDownCapture = {MouseDown}
      onMouseUpCapture = {MouseUp}
      >
        <DragBox  ></DragBox>
      </div>

      
    <div>
		  <Line 
      
		  data={graphData}
		      height={180}
		      options={opt}
		  />
    </div>
</div>
	);
}

export default EruptionTimeLineForYearBP;