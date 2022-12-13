import React from 'react';
import { useState, useEffect } from 'react';
import DropDownForMainType from './DropDownForMainType'
import DropDownAttribute2 from './DropDownAttribute2';
import DropDownAttribute1 from './DropDownAttribute1'
import PieChart from './PieChart';
import * as constants from "../../Constants"
import SunBurst from './SunBurst';
import DropDownForEssentialVariable from '../NewAnalyticPlots/DropDownForEssentialVariable';
import DropDownForSubType from './DropDownSubType';
import TernaryPlot from './TernaryPlot';
import Histogram from './Histogram';
import ComparativePieChart from './ComparativePieChart';
import BigComparativePieChart from './BigComparativePieChart';
import DropDownForTernary from './DropDownForTernary';
import PCA from './PCA';
const axios = require('axios')

// import './NewDashBoardStyling.css'
var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];
let sample = ['CV_DB1','KEL_DB2','KEL_DB3','MEA_DB1','MEA_DB2','SOG_DB1','SOG_DB2','CIN_DB15','CIN_DB2','ONT_DB1','PIN_DB1','STH_DB1','LAP_DB1']
let dict = {}
let MagmaCompos = {}
for(let i=0;i<sample.length;i++){
	dict[sample[i]] = 1;
	if(sample[i] === 'PIN_DB1' || sample[i] === 'STH_DB1')
		MagmaCompos[sample[i]] = "Silicic"
	else if(sample[i] === 'LAP_2_DB1')
		MagmaCompos[sample[i]] = 'Mafic'
	else
		MagmaCompos[sample[i]] = "Intermediate"
}


const Dashboard = () =>{

	const proxy = constants.PROXY
	const [t,setT] = useState(1)
	const [parArray,setParArray] = useState([])
	const [volTable,setVolTable] = useState({})
	const [histogramVariable,setHistogramVariable] = useState("red_std")
	const [ParAttributeList,setParAttributeList] = useState([])
	const [TernaryVariable,setTernaryVariable] = useState()
	const [TernaryFinalVariable,setTernaryFinalVariable] = useState([{value:1, label:"red_std"},{value:2,label:"blue_std"},{value:3,label:"green_std"}])
	const [xAxis,setXAxis] = useState("red_std");
  	const [yAxis,setYAxis] = useState("blue_std");
  	const [choice,setChoice] = useState(0);
	const [essentialVariable,setEssentialVariable] = useState('volc_name')
	const [pieChartVariable,setPieChartVariable] = useState('volc_name')
	const [histogramMode,setHistogramMode] = useState('Overview')
	const [volcToCompare1,setVolcToCompare1] = useState('Pinatubo')
	const [volToComapre2,setVolcToCompare2] = useState('Taal')
	const [SunBurstVariable,setSunBurstVariable] = useState()
	const [SunBurstFinalVariable,setSunBurstFinalVariable] = useState([{value:1,label:"juvenile"},{value:2,label:"lithic"},{value:3,label:"free crystal"}])
	const [side,setSide] = useState([600,500])
	const [legendSize,setLegendSize] = useState(12)
	const [essential,setEssential] = useState('volc_name')
	const [mainType,setMainType] = useState('main_type')
	const [subType,setSubType] = useState('sub_type')
	const [attribute1,setAttribute1] = useState('crystallinity')
	const [attribute2,setAttribute2] = useState('color')
	const [AFE,setAFE] = useState([])
	const [ternary,setTernary] = useState('volc_name')

	let w = (25/100)*window.screen.width

	useEffect(() =>{
		
		axios.get(`${proxy}/volcanoes/getAFE`)
		.then(data =>{
		  setAFE(data.data.afes)
		  console.log(data.data.afes)
		}).catch(err=> console.log(err))

		axios.get(`${proxy}/volcanoes/getParticles`)
		.then(data =>{
			setParArray(data.data['particles']) 
			console.log(data.data['particles'])
		})

		axios.get(`${proxy}/volcanoes/getSample`)
		.then(data=>{
			console.log(data)
		})
		axios.get(`${proxy}/volcanoes/getVolcanoes`)
		.then(data =>{
			let vols = data.data.volcanoes
			// let volT = {}
			console.log(data.data.volcanoes)
			// for(let i=0;i < vols.length;i++){
			// 	volT[vols[i]['vd_num']] = vols[i]['vd_name']
			// }
			// console.log(volT)
			setVolTable(vols)
		})

		axios.get('http://127.0.0.1:5000/plots').then(
			data =>{
				console.log(data)
			}
		)

	},[])

	const onPassAttribute1 = (a) =>{
		setAttribute2(a)
	}

	const onPassAttribute2= (a) =>{
		setAttribute2(a)
	}

	const onPassEssential = (a)=>{
		setEssential(a)
	}

	const onPassMainType = (a) =>{
		setMainType(a)
}

	const onPassSubType = (a) =>{
		setSubType(a)
	}

	const getEssential = () =>{
		return essential
	}

	const getMainType = () =>{
		return mainType
	}

	const getSubType = () =>{
		return subType
	}

	const getAttribute1 = () =>{
		return attribute1
	}

	const getAttribute2 = () =>{
		return attribute2
	}

	const PassTernary = (a) =>{
		
		setTernary(a);
	}

	let volType = {}
	for(let i = 0; i < volTable.length;i++){
		volType[volTable[i]['volc_name']] = volTable[i]['volc_type']
	}

	

	let a = []

	for(let i =0;i<parArray.length;i++ ){
		let splitS = parArray[i]['afe_code'].split("_");
		let s = splitS[0]+'_'+splitS[2];
		console.log(s)
		if(dict[s] === 1  ){
			parArray[i]['volc_type'] = volType[parArray[i]['volc_name']]
			parArray[i]['MagmaCompos'] = MagmaCompos[s]
			a.push(parArray[i]);

		}
	}
	console.log(a)	

	const getData = () =>{
		return a;
	}

	const getAFE= () =>{
		return AFE;
	}

	const getPieChartVariable = () =>{
		return 'volc_name'
	}
	
	return(
		<div>

		<div style ={{backgroundColor:'white'}}>

		<div style = {{textAlign:'center',paddingTop:'10px',paddingBottom:'0px'}}>
			<h1>Whole Database</h1>
		</div>
				{/* <div style={{display:"flex",justifyContent:"center"}}>
					<SwitchBar style={{marginTop:"50px"}} onPassMode = {PassMode}/>
				</div> */}
			

			<div className = 'pieChart' style ={{ display: 'flex' }}>
				<div style = {{border:'2px solid #0c4aad'}}>
				<PieChart onGetLegendSize = {() =>{return legendSize }} onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={ () => {return 'volc_name'} } />
				</div>

				<div style = {{border:'2px solid #0c4aad'}}>
				<PieChart onGetLegendSize = {() =>{return legendSize }} onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={ () => {return 'main_type'} } />
				</div>

				<div style = {{border:'2px solid #0c4aad'}}>
				<PieChart onGetLegendSize = {() =>{return legendSize }} onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={ () => {return 'eruptive_style'} } />
				</div>
			</div>

			<div style = {{display:'flex', marginTop:'20px'}}>

			
			<div style = {{margin:'auto',border:'2px solid #0c4aad'}}>
				<TernaryPlot onGetSide = {() => {return [600,800]} } onGetData = {getData} onGetVariable = {() =>{return ternary}} />
			</div>

			<div style = {{width: (4.5/10)*window.screen.width, margin:'auto', border:'2px solid #0c4aad' }}>
				<PCA/>
			</div>

			

			</div>

		</div>

			<div style={{textAlign:"center",paddingTop:'50px',paddingBottom:'50px',backgroundColor:'white'}}>
				<h1>Comparative Histogram Plots</h1>
			</div>

		

			<div style = {{backgroundColor:'white'}} >

			<div>
				<div>
					<h2>Compare Volcano</h2>
				</div>

				
				<Histogram  onGetSide = {() =>{return [600,800] }} onGetAFE = {getAFE} onGetData = {getData} onGetVariable = { () => {return 'volc_name'}  } />
			
			</div>

			<div>
				<div>
					<h2>Compare AFE Code</h2>
				</div>
				<Histogram  onGetSide = {() =>{return [600,800] }} onGetAFE = {getAFE} onGetData = {getData} onGetVariable = { () => {return 'afe_code'}  } />

			</div>

			<div>
				<div>
					<h2>Compare Eruptive Style</h2>
				</div>
				<Histogram  onGetSide = {() =>{return [600,800] }} onGetAFE = {getAFE} onGetData = {getData} onGetVariable = { () => {return 'eruptive_style'}  } />

			</div>
{/* 
			<div style = {{textAlign:'center' , paddingTop:'50px', paddingBottom:'50px'}} >
				<h1>Comparative Pie Charts</h1>
			</div>

			<div>
				<BigComparativePieChart  onGetLegendSize = {() =>{return legendSize }} onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={getPieChartVariable} />
			</div>	

			<div>
				<ComparativePieChart onGetLegendSize = {() =>{return legendSize }} onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={getPieChartVariable} />
			</div> */}



				{/* <div style = {{ display: 'flex', padding:'20px' }}>
					<div style = {{ paddingLeft:'25px' }}>
		
					<DropDownForEssentialVariable onPassEssential = {onPassEssential}/>
					</div> 
					<div style = {{paddingLeft:'25px'}}>
					<DropDownForMainType onPassMainType = {onPassMainType}/>
					</div>
					<div style = {{paddingLeft:'25px'}}>
					<DropDownForSubType onPassSubType ={onPassSubType}/>
					</div>
					<div style = {{paddingLeft:'25px'}}>
					<DropDownAttribute1 onPassAttribute1 = {onPassAttribute1}/>
					</div>
					<div style = {{paddingLeft:'25px'}}>
					<DropDownAttribute2 onPassAttribute2 = {onPassAttribute2}/>
					</div> 
				</div>

				<div> 
					<SunBurst onGetLegendSize = {() =>{return legendSize }} onGetSide = {() =>{return side }} onGetData={getData} onGetPieChartVariable={getPieChartVariable} onGetEssential ={getEssential} onGetMainType={getMainType} onGetSubType={getSubType} onGetAttribute1={getAttribute1} onGetAttribute2={getAttribute2}/>
				</div> */}
				
			</div>
		</div>
	);
}

export default Dashboard