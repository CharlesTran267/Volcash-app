import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VolcanoTimeLine from './VolcanoeTimeLine';

const VolcanoDetailPage = (props)=> {


    

    const params = useParams()
    let volc = props.onGetVolcano()


    

    console.log(volc[0].volc_name)
    return (
        <VolcanoTimeLine vol = {volc[0].volc_name}/>
    )
}

export default VolcanoDetailPage