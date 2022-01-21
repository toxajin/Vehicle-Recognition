import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm =({OnChange,OnClick})=>{
    return(
        <div>
            <p className='f3'>
                {'This Magic Brain will detect vehicles on your pictures so give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={OnChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-new' onClick={OnClick}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;