import { SwipeableDrawer } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Legend, Title } from 'chart.js';
import React from 'react';
import {Line} from 'react-chartjs-2'; 
import App from './VolcanoeTimeLine';
import { useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import * as constants from '../../Constants'
const axios = require('axios')
const AFEtimeGraph = (props) =>{
	const navigate = useNavigate()
	const proxy = constants.PROXY
	const [eruptions,setEruptions] = useState([])
	const [volcanoes,setVolcanoes] = useState([])
	const [AFE,setAFE] = useState([])
	const [AFEData,setAFEData] = useState([])

	let volc_num = props.onGetVolcNum();
      

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

		let a = []
		  if(AFE.length != 0){
		  for(let i =0;i<12;i++){
		    if(AFE[i]['volc_num'] === volc_num){
		    let s = AFE[i]['afe_date'].substr(0,4) + '.' + AFE[i]['afe_date'].substr(5,7);
		    a.push({x: parseFloat(s),y:5});
		    }
		}
		  }
	     
	      
	    

	// let AFEDummyData = AFEData;
	
	let list = props.ll();
	let graphData = props.dt();
	//let TaalEruptionEndYear = props.onGetTaalEruptionEndYear();


	let TaalData = [];
		  console.log(list)

var pathArray = window.location.pathname.split('/');
let vol =props.onGetVolcName();
// for(let i =0;i<volcanoes.length;i++){
// 	if(parseInt(pathArray[2]) === volcanoes[i].id ){
// 	  vol = volcanoes[i].volc_name;
// 	  break;
// 	}
//       }


    
let Vol = []

for(let i=0;i<eruptions.length;i++){
	if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_stime'] && eruptions[i]['ed_etime'] ){
	let s = eruptions[i]['ed_stime'].substr(0,4) + '.' + eruptions[i]['ed_stime'].substr(5,7);
	let e = eruptions[i]['ed_etime'].substr(0,4) + '.' + eruptions[i]['ed_etime'].substr(5,7);
      
	  if(parseFloat(s) !== parseFloat(e)){
	  Vol.push({s:parseFloat(s),e:parseFloat(e)})
	  }
	  else{
	    Vol.push({s:parseFloat(s),e:parseFloat(e)+1})
	  }

	}
      }



let TaalEruptionEndYear=[]
// for(let i=0;i<eruptions.length;i++){
//   if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_etime']){
//     let s = eruptions[i]['ed_etime'].substr(0,4);
//     if(parseInt(s)>=1521  && parseInt(s) <= 2022){
//     TaalEruptionEndYear.push({x:parseInt(s),y:10})
//   }
//   } 
// }

for(let i=0;i<Vol.length;i++){
	TaalData.push(Vol[i].s)
	TaalEruptionEndYear.push(Vol[i].e)
      }

// let intervals = []
// for(let i=0;i<TaalData.length;i++){
// 	intervals.push({s:TaalData[i],e:TaalEruptionEndYear[i]})	
// }

// intervals.sort(function(a,b){return a.s.x<b.s.x})
// if(intervals.length>0){

// let q =[]
// let b = intervals[intervals.length-1].s.x
// let k = intervals[intervals.length-1].e.x
// for(let i=intervals.length-2;i>=0;i--){		
// 	if(intervals[i].s.x<=k){
// 		k = intervals[i].e.x
// 	}
// 	else{
// 		q.push({s:b,e:k})
// 		b=intervals[i].s.x
// 		k=intervals[i].e.x
// 	}


// }
// q.push({s:b,e:k})
// }


	let fillList = TaalData.filter(n => list.includes(n));

	let EndYear = TaalEruptionEndYear.filter(n => list.includes(n));


	const routeChange = () =>{
		let path = `/par_gral/par_gralDetailPage`;
		navigate(path)
	}


	// for(let i=0;i<fillList.length;i++){
	// 	fillList[i].y = 10;
	// }




	for(let i =0;i<EndYear.length;i++){
		fillList.push(EndYear[i]);
	}

	fillList.sort()

	let fList = []
	for(let i=0;i<fillList.length;i++){
		fList.push({x:fillList[i],y:10})
	}


	let AFEFilteredData = a.filter(n => list.includes(n.x));
// 	if(p.length>0 && EndYear.length>0){
// 		if(p[0]>EndYear[0]){
// 			fillList.unshift({x:list[0],y:10})
// 			alert('3')
// 		}

// 		if(p[p.length-1] > EndYear[EndYear.length - 1] ){
// 			fillList.push({x:list[list.length-1],y:10})
// 		}
// 	}

// 	for(let i =1;i<fillList.length;i++){
// 		for(let j = i;j>0;j--){
// 			if(fillList[j].x < fillList[j-1].x){
// 			let temp = fillList[j].x;
// 			fillList[j].x = fillList[j-1].x;
// 			fillList[j-1].x = temp;
			
// 			}
// 		}
// 	}


	

	let zoomList = []
	for(let i=0;i<fList.length;i++){
		zoomList.push(fList[i]);
		if(zoomList.length %2 === 0){
			zoomList.push({
				x:zoomList[zoomList.length - 1].x,
				y:0
			});
			if(i< fList.length - 1){
			zoomList.push({
				x:fList[i+1].x,
				y:0
			});
			}
		}
	}


	

		
	const AFEdata = {
		labels: list,
  datasets: [

	{
	label: 'Line Dataset',
	data: zoomList,
	fill: true,
	showLine: false,
	pointRadius: 0,
	backgroundColor: 'rgba(0, 100, 0, 0.4)',

    },
    {
      position: 'Right',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#7F131B',
      pointStyle: 'rectRot',
      
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 0,
      data: AFEFilteredData,
      showLine: false,
      pointRadius: 6,
    }
  ],
	}
	const opt = {maintainAspectRatio: false,
		scales: {
			y: {
			  display:false,
		
			},
	  
			x:{
			  display:true,
			  ticks: {
				autoSkip: true,
				maxTicksLimit: 55
			    },
	

			}
		      },

		      plugins: {
			title: {
			    display: true,
			    text: 'Zoom In',
			    font: {
			      size: 25
			    }
			},
	  
			legend:{
			  display: false,
			}
	  
			
		    },
		    onClick: function(evt, ele){
			    if(ele.length >0)
			    	routeChange();
		    }
	
	};

	const BackToEruption = (event) =>{
		props.onBack(event);
	}


	return(
	<div>
		<div>
		<Line 
		data={AFEdata}

		height={180}
		
		options ={opt}
		/>
		</div>
		
	</div>


		
	);
}
export default AFEtimeGraph;