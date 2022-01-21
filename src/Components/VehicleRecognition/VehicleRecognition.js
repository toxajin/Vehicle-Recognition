import React from 'react';
import './VehicleRecognition.css'
let i=0;
const VehicleRecognition =({imageUrl, boxes})=>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id = 'inputImage' src={imageUrl} alt = {''} width={'500px'} height={'auto'}/>
                {boxes.length>0? 
                    boxes.map(region =>{
                        i++;
                        return <div key={`VehicleRecogniton ${i}`} className='bounding-box' style={{top: region.topRow, right: region.rightCol, bottom: region.bottomRow, left: region.leftCol}}></div>
                })
                    :<p></p>
                }
            </div>
        </div>
    );
}

export default VehicleRecognition;