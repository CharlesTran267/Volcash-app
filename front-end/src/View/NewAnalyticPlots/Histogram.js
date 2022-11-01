import React from 'react';
import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import Plot from 'react-plotly.js';
import DropDownBar from '../AnalyticPlots/DropDownForBinaryGraph';
import DropDownForHistogramMode from '../AnalyticPlots/DropDownForHistogramMode';
import DropDownForHistogramCompare from '../AnalyticPlots/DropDownForHistogramCompare';
import DropDownForHistogramEsential from '../AnalyticPlots/DropDownForHistogramEsential';
import DropDownForHistogramCompareEruptive from '../AnalyticPlots/DropDownForHistogramCompareEruptive';
import SwitchBoxForHistogram from './SwitchBoxForHistogram';
import DropDownForHistogram from './DropDownForHistogram';

var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];
var volc_name = ["Kelut","Merapi","Soufrière Guadaloupe","Chillán, Nevados de","On-take","Pinatubo","St. Helens"]
let sample = ['KEL_DB2','KEL_DB3','MEA_DB1','MEA_DB2','SOG_DB1','SOG_DB2','CIN_DB15','CIN_DB2','ONT_DB1','PIN_DB1','STH_DB1','LAP_DB1']

var main_type = ['juvenile','free crystal','lithic','altered material']

var eruptive_style = ['Subplinian','Dome explosion','Lava fountaining','Phreatic','Plinian']

var color_match = {
	'juvenile':'#7F131B',
	'lithic':'#004A2D',
	'altered material':'#F58830',
	'free crystal':'#006CB7'
}

const Histogram = (props) =>{
	// let mesurement = []
	// mesurement = require("/Users/vinhkhaitruong/Desktop/EOS Project /front-end/src/sample.json");
	// console.log(mesurement)
	Chart.register(...registerables);
	const [parArray,setParArray] = useState([])
	const [volTable,setVolTable] = useState({})
	const [histogramData,setHistogramData] = useState([])
	const [histogramVariable1,setHistogramVariable1] = useState('Pinatubo') 
	const [histogramVariable2,setHistogramVariable2] = useState('Merapi')
	const [histogramMode,setHistogramMode] = useState('Overview')
	const [volcToCompare1,setVolcToCompare1] = useState('Toba')
	const [volcToCompare2,setVolcToCompare2] = useState('Soufrière Guadeloupe')
	const [histogramEsential,setHistogramEsential] = useState('Volcanoes')
	const[mode,setMode] = useState('Main Type');


	const PassMode = (a) =>{
		setMode(a)
	}

	const PassHistogramVariable1 =(a) =>{
		setHistogramVariable1(a)
	}

	const PassHistogramVariable2 = (a) =>{
		setHistogramVariable2(a)
	}

	function GetVariableData(){
		return variableData
	}

	
	
	let Data = props.onGetData()
	let AFE = props.onGetAFE()

	for(let i=0;i<Data.length;i++){
		for(let j=0;j<AFE.length;j++){
			if(Data[i]['afe_code'] === AFE[j]['afe_code']){
				Data[i]['eruptive_style'] = AFE[j]['eruptive_style']
			}
		}
	}
	console.log(Data)

	
	// let variable = histogramVariable1;
	let pData1 = []
	let pData2 = []
	// let volcToCompare = [volcToCompare1,volcToCompare2];
	let side = props.onGetSide();
	let va = props.onGetVariable();
	let varData = []

	useEffect( () =>
	{
	if(va === 'volc_name'){
		varData = volc_name
		// setHistogramVariable1('Pinatubo')
		// setHistogramVariable2('Merapi')
	}
	else if (va === 'afe_code'){
		varData = sample
		// setHistogramVariable1('KEL_DB2')
		// setHistogramVariable2('KEL_DB3')
	}
	else{
		varData = eruptive_style
		// setHistogramVariable1('Subplinian')
		// setHistogramVariable2('Lava fountaining')
	}

},[])

if(va === 'volc_name'){
	varData = volc_name

}
else if (va === 'afe_code'){
	varData = sample

}
else{
	varData = eruptive_style

}

	const PassHistogramMode = (a) => {
		setHistogramMode(a)
	}

	const PassVolcToCompare1 = (a) =>{
		setVolcToCompare1(a)
	}
	
	const PassVolcToCompare2 = (a) =>{
		setVolcToCompare2(a)
	}

	const PassHistogramEsential = (a) =>{
		setHistogramEsential(a)
	}

	const getVar = () =>{
		return histogramEsential;
	}

	
	console.log(Data)
	if(mode === 'Main Type'){
		for(let j =0; j<main_type.length;j++){
		let t = main_type[j]
		let d = [];


		for(let i=0;i<Data.length;i++){
			let s = ""
		if(va === 'afe_code'){
			let splitS = Data[i]['afe_code'].split("_");
			s = splitS[0]+'_'+splitS[2];
		}	
			if(Data[i]['main_type'] === t &&(Data[i][va] === histogramVariable1 || s === histogramVariable1 )){
				d.push(Data[i]['convexity'])
			}
		}
		d.sort(function(a, b){return a - b})
		let max=0;
		let min =99999
		for(let i=0;i<d.length;i++){
			if(d[i] > max){
				max =d[i]
			}
			if(d[i] < min){
				min = d[i]
			}
		}
		let bin = (max-min)/29
		let dict ={}
		let temp = min
		while(temp<=max-bin){
			let w = (2*temp+bin)/2
			dict[parseFloat(w.toFixed(8))] = 0
			temp += bin 
		}
		for(let i=0;i<d.length;i++){
			let a = Math.floor((d[i] - min)/bin) 
			let q = (min+(a*bin) + min + (a+1)*bin)/2

			dict[parseFloat(q.toFixed(8))] +=1
		}

		let arr_X = []
		let arr_Y = [] 

		let m = 0;
		for(const[key,value] of Object.entries(dict)){
			arr_X.push(key)
			arr_Y.push(value)
			if(value > m){
				m = value
			}
		}

		for(let i=0;i<arr_Y.length;i++){
			
			arr_Y[i]*=(100/m)*(Math.abs(100-m)/8)
		}

		console.log(dict)

		// pData.push({
		// 	x: d,
		// 	type: 'histogram',
		// 	mode: 'lines',
		// 	name: variable,
		// 	xbins: {
		// 		size: bin, 
		// 		},
			
		// })
		pData1.push({
			
			x: arr_X,
			y: arr_Y,
			mode: 'lines',
			name: t,
			text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
			line: {shape: 'spline',
			color: color_match[t],
		
		},
			type: 'scatter'
			      
		})
	}
// 		var gaussian = require('gaussian');
// var distribution = gaussian(mean, variance);
// // Take a random sample using inverse transform sampling method.
// var sample = distribution.ppf(d);

for(let j =0; j<main_type.length;j++){
	let t = main_type[j]
	let d = [];


	for(let i=0;i<Data.length;i++){
		let s = ""
	if(va === 'afe_code'){
		let splitS = Data[i]['afe_code'].split("_");
		s = splitS[0]+'_'+splitS[2];
	}	
		if(Data[i]['main_type'] === t &&(Data[i][va] === histogramVariable2 || s === histogramVariable2 )){
			d.push(Data[i]['convexity'])
		}
	}
	d.sort(function(a, b){return a - b})
	let max=0;
	let min =99999
	for(let i=0;i<d.length;i++){
		if(d[i] > max){
			max =d[i]
		}
		if(d[i] < min){
			min = d[i]
		}
	}
	let bin = (max-min)/29
	let dict ={}
	let temp = min
	while(temp<=max-bin){
		let w = (2*temp+bin)/2
		dict[parseFloat(w.toFixed(8))] = 0
		temp += bin 
	}
	for(let i=0;i<d.length;i++){
		let a = Math.floor((d[i] - min)/bin) 
		let q = (min+(a*bin) + min + (a+1)*bin)/2

		dict[parseFloat(q.toFixed(8))] +=1
	}

	let arr_X = []
	let arr_Y = [] 
	let m = 0;
	for(const[key,value] of Object.entries(dict)){
		arr_X.push(key)
		arr_Y.push(value)
		if(value > m)
			m = value
	}

	for(let i=0;i<arr_Y.length;i++){
			
		arr_Y[i]*=(100/m)*(Math.abs(100-m)/8)
	}

	console.log(dict)

	// pData.push({
	// 	x: d,
	// 	type: 'histogram',
	// 	mode: 'lines',
	// 	name: variable,
	// 	xbins: {
	// 		size: bin, 
	// 		},
		
	// })
	pData2.push({
		
		x: arr_X,
		y: arr_Y,
		mode: 'lines',
		name: t,
		text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
		line: {shape: 'spline',
		color: color_match[t],
	
	},
		type: 'scatter'
		      
	})
}

	}
	else{
		for(let j =0; j<eruptive_style.length;j++){
			let t = eruptive_style[j]
			

			let d = [];
			for(let i=0;i<Data.length;i++){
				if(Data[i]['eruptive_style'] === t && Data[i][va] === histogramVariable1){
					d.push(Data[i]['convexity'])
				}
			}
			d.sort(function(a, b){return a - b})
			let max=0;
			let min =99999
			for(let i=0;i<d.length;i++){
				if(d[i] > max){
					max =d[i]
				}
				if(d[i] < min){
					min = d[i]
				}
			}
			let bin = (max-min)/29
			let dict ={}
			let temp = min
			while(temp<=max-bin){
				let w = (2*temp+bin)/2
				dict[parseFloat(w.toFixed(8))] = 0
				temp += bin 
			}
			for(let i=0;i<d.length;i++){
				let a = Math.floor((d[i] - min)/bin) 
				let q = (min+(a*bin) + min + (a+1)*bin)/2
	
				dict[parseFloat(q.toFixed(8))] +=1
			}
	
			let arr_X = []
			let arr_Y = [] 
			for(const[key,value] of Object.entries(dict)){
				arr_X.push(key)
				arr_Y.push(value)
			}
	
	
			console.log(dict)
	
			// pData.push({
			// 	x: d,
			// 	type: 'histogram',
			// 	mode: 'lines',
			// 	name: variable,
			// 	xbins: {
			// 		size: bin, 
			// 		},
				
			// })
			pData1.push({
				
				x: arr_X,
				y: arr_Y,
				mode: 'lines',
				name: t,
				text: t,
				line: {shape: 'spline',
				// color: 'rgb(55, 128, 191)',
			
			},
				type: 'scatter'
				      
			})	

	}

	for(let j =0; j<eruptive_style.length;j++){
		let t = eruptive_style[j]
		

		let d = [];
		for(let i=0;i<Data.length;i++){
			if(Data[i]['eruptive_style'] === t && Data[i][va] === histogramVariable2){
				d.push(Data[i]['convexity'])
			}
		}
		d.sort(function(a, b){return a - b})
		let max=0;
		let min =99999
		for(let i=0;i<d.length;i++){
			if(d[i] > max){
				max =d[i]
			}
			if(d[i] < min){
				min = d[i]
			}
		}
		let bin = (max-min)/29
		let dict ={}
		let temp = min
		while(temp<=max-bin){
			let w = (2*temp+bin)/2
			dict[parseFloat(w.toFixed(8))] = 0
			temp += bin 
		}
		for(let i=0;i<d.length;i++){
			let a = Math.floor((d[i] - min)/bin) 
			let q = (min+(a*bin) + min + (a+1)*bin)/2

			dict[parseFloat(q.toFixed(8))] +=1
		}

		let arr_X = []
		let arr_Y = [] 
		for(const[key,value] of Object.entries(dict)){
			arr_X.push(key)
			arr_Y.push(value)
		}


		console.log(dict)

		// pData.push({
		// 	x: d,
		// 	type: 'histogram',
		// 	mode: 'lines',
		// 	name: variable,
		// 	xbins: {
		// 		size: bin, 
		// 		},
			
		// })
		pData2.push({
			
			x: arr_X,
			y: arr_Y,
			mode: 'lines',
			name: t,
			text: t,
			line: {shape: 'spline',
			// color: 'rgb(55, 128, 191)',
		
		},
			type: 'scatter'
			      
		})	

}




}
	//console.log(pData)
	// const doubleClick = () =>{
	// 	// props.onPassZoomInBinaryPlot([xAxis,yAxis,essentialVariable]);
	// 	 props.onPassZoomMode([mode,histogramVariable],"histogramPlot");
	// }

	console.log(histogramVariable2)
	
	return(
		<div>

<div style={{display:"flex", justifyContent:"space-between"}}>

			<div style={{marginBottom:"30px"}}>

					<div>
						<SwitchBoxForHistogram style={{marginTop:"50px"}} onPassMode = {PassMode} />
					</div>	

					{/* {(histogramMode === 'Compare')?(
						<div style={{display:"flex", marginTop:"10px"}}>



							<div style={{marginRight:"50px"}}>  
							<DropDownForHistogramEsential onPassHistogramEsential = {PassHistogramEsential} />
							</div>
							{(histogramEsential === 'Volcanoes')?(
							<div className = 'eleToCompare'>
								<div style={{marginRight:"20px"}}>
									<DropDownForHistogramCompare onPassVolcToCompare1 = {PassVolcToCompare1} onGetVar = {getVar} />
								</div>
								<DropDownForHistogramCompare onPassVolcToCompare2 = {PassVolcToCompare2} onGetVar = {getVar} />
							</div>
							):(
							<div className = 'eleToCompare'>
								<div style={{marginRight:"20px"}}>
									<DropDownForHistogramCompareEruptive onPassVolcToCompare1 = {PassVolcToCompare1} />
								</div>
								<DropDownForHistogramCompareEruptive onPassVolcToCompare2 = {PassVolcToCompare2} />
							</div>
							)}
						</div>
					):null
	} */}

			</div>
	
		</div>	
<div style ={{ display:'flex' }}  >
	
<div>

<div>
	<DropDownForHistogram  onPassHistogramVariable1 = {PassHistogramVariable1} onGetVariableData={() => {return varData}}/>
</div>

<Plot
data={pData1}
layout={ {width: (50/100)*window.screen.width,colorway: ['#00395E','#FBAB18','#F05729','#7F131B','#B51C7D','#3B180D','#646765'], height: side[1], title: histogramVariable1,barmode: 'overlay',
xaxis: {
	title: {
	  text: histogramVariable1 + ' frequency',
	  font: {
	    family: 'Courier New, monospace',
	    size: 18,
	    color: '#7f7f7f'
	  }
	},
      },
      yaxis: {
	title: {
	  text: 'count',
	  font: {
	    family: 'Courier New, monospace',
	    size: 18,
	    color: '#7f7f7f'
	  }
	}
      }
    
} }
/>
</div>

<div>

<div>

	<DropDownForHistogram  onPassHistogramVariable2 = {PassHistogramVariable2} onGetVariableData={() => {return varData}}/>
</div>

	<Plot
	data={pData2}
	layout={ {width: (50/100)*window.screen.width ,colorway: ['#00395E','#FBAB18','#F05729','#7F131B','#B51C7D','#3B180D','#646765'], height: side[1], title: histogramVariable2,barmode: 'overlay',
	xaxis: {
		title: {
		  text: histogramVariable2 + ' frequency',
		  font: {
		    family: 'Courier New, monospace',
		    size: 18,
		    color: '#7f7f7f'
		  }
		},
	      },
	      yaxis: {
		title: {
		  text: 'count',
		  font: {
		    family: 'Courier New, monospace',
		    size: 18,
		    color: '#7f7f7f'
		  }
		}
	      }
	    
	} }
	/>


</div>

</div>
</div>
	
);
}

export default Histogram;
