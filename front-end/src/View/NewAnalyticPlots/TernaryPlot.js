import React from 'react';
import Plot from 'react-plotly.js';
import Selection from '../AnalyticPlots/SelectWithCheckBox';
import Button from '../AnalyticPlots/SubmitButton'
import {useState,useEffect} from 'react'
import * as constants from "../../Constants"
const axios = require('axios')
const proxy = constants.PROXY

let volcColor = {
	'Pinatubo':'red',
	'Taal':'yellow',
	'Kelut':'blue',
	'Toba': 'orange',
	'Alid': 'green'
}

// var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];
var volc_name = ["La Palma","Kelut","Merapi","Soufrière Guadaloupe","Chillán, Nevasdos de","On-take","Pinatubo","St. Helens"]
let sample = ['CV_DB1','KEL_DB2','KEL_DB3','MEA_DB1','MEA_DB2','SOG_DB1','SOG_DB2','CIN_DB15','CIN_DB2','ONT_DB1','PIN_DB1','STH_DB1','LAP_DB1']

var main_type = ['juvenile','free crystal','lithic','altered material']

var eruptive_style = ['Subplinian','Dome explosion','Lava fountaining','Phreatic','Plinian']


const TernaryPlot = (props) =>{

	const [TernaryVariable,setTernaryVariable] = useState()
	const [TernaryFinalVariable,setTernaryFinalVariable] = useState([{value:1, label:"juvenile"},{value:2,label:"lithic"},{value:3,label:"altered material"}])
	const [parArray,setParArray] = useState([])
	const [volTable,setVolTable] = useState({})

	// let legendSize = props.onGetLegendSize();

	useEffect(() =>{
		axios.get(`${proxy}/volcanoes/getParticles`)
		.then(data =>{
			setParArray(data.data['particles']) 
			console.log(data.data['particles'])
		

		})

	},[])

	
	let Data = props.onGetData();
	let volT ={}
	let variable = props.onGetVariable();

	for(let i=0;i < eruptive_style.length;i++){
		volT[eruptive_style[i]] = {total:0, volc:{}}
	}

	for(let i=0;i<Data.length;i++){
		volT[Data[i]['eruptive_style']].volc[Data[i]['volc_name']] = {'juvenile':0,'lithic':0,'altered material':0,'total':0}

	}

	for(let i=0;i<Data.length;i++){
		volT[Data[i]['eruptive_style']].volc[Data[i]['volc_name']][Data[i]['main_type']] += 1;
		volT[Data[i]['eruptive_style']].total +=1;
	}

	

	
	console.log(volT)
	// console.log(variable)

	

	let side = props.onGetSide()
	

	const PassTernaryVariable = (a) => {
		console.log(a)
	
		setTernaryVariable(a);
	}

	const submitVariable = () =>
{
	setTernaryFinalVariable(TernaryVariable)
}

	let d= []
	
	let f =[]
	let t = {}

	for(let i=0;i < Data.length;i++){
		t[Data[i]['volc_name']] = {total:0, erup:{}}
	}

	for(let i=0;i<Data.length;i++){
		t[Data[i]['volc_name']].erup[Data[i]['eruptive_style']] = {'juvenile':0,'lithic':0,'altered material':0,'total':0}

	}

	for(let i=0;i<Data.length;i++){
		t[Data[i]['volc_name']].erup[Data[i]['eruptive_style']][Data[i]['main_type']] += 1;
		t[Data[i]['volc_name']].erup[Data[i]['eruptive_style']]['total'] = volT[Data[i]['eruptive_style']].total;
	}


	
	let ternaryData = []
	for(const[key,value] of Object.entries(t)){
		let j = []
		let l = []
		let a = []
		for(const[k,vl] of Object.entries(value.erup)){
			j.push(vl['juvenile']/vl.total);
			l.push(vl['lithic']/vl.total);
			a.push(vl['altered material']/vl.total)
		}

		ternaryData.push({
			type: 'scatterternary',
			mode: 'markers',
			a: j,
			b: l,
			c: a,
			name:key,
			showlegend:true,
			marker: {
			    line: { width: 2 },
			    size:30
			}	
		})
	}

	console.log(ternaryData)
	console.log(t)
	
	// const doubleClick = () =>{
		
	// 	props.onPassZoomMode(TernaryFinalVariable,"ternaryPlot");
	// }

	return(

	<div>

		<div >
		<Plot 
			data = {
			ternaryData
		}

			layout={ {width: (50/100)*window.screen.width,colorway : ['#00395E','#FBAB18','#F05729','#7F131B','#B51C7D','#3B180D','#646765'],legend:{orientation:'h'}, height: side[1], title: 'Ternary',autosize:true,uirevision:'true',ternary:
			{
			sum:1,
			aaxis:{title: 'juvenile', min: 0,
					ticklen: 3, autorange:true,
					    linewidth:2, tick0:0.2,dtick:0.2,ntick:3,
					    tickmode:'auto',tickvals:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
					},
					    
			baxis:{title: 'lithic', min: 0, autorange:true,
				ticklen:3, tick0:0.2,dtick:0.2,ntick:3,
				 linewidth:2,
				 tickmode:'auto',tickvals:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
				},
				
			caxis:{title: 'altered material', min: 0, 
				ticklen:3,tick0:0.2,dtick:0.2,ntick:3,
				 linewidth:2, ticks:'outside',
				tickmode:'auto',tickvals:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
				 autorange:true,
				}}
						    
				    }
				 }
			
		/>
	</div>
	</div>
	);
}

export default TernaryPlot;