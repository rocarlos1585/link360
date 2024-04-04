import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './index.css'
import { useLottie } from "lottie-react";
import arrastrar from "../../utils/lotties/arrastrar.json";

export const DragDropArea = ({sendFiles}) => {

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const options = {
      animationData: arrastrar,
      loop: true
    };
    const { View } = useLottie(options);

    const { getRootProps, getInputProps, images} = useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
        sendFiles(acceptedFiles)
        //console.log(acceptedFiles)
      },
    });


  return (
    <div className='dragDropMainContainer'>
    
        <div className='dragDropArea' {...getRootProps()}>
            <input {...getInputProps()}/>
            <div style={{width:'20vh'}}>
              {View}
            </div>
            <p>Arrastra y suelta tu archivo aqui.</p>
        </div>

{/*         <div className='imageGrid'>
        {uploadedFiles.map((File, index) => (
          <div className='imageItem' key={index}>
            <img src={URL.createObjectURL(File)} alt={`Image ${index}`} />
          </div>
        ))}
      </div> */}


{/*         <ul>
            {uploadedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
            ))}
        </ul> */}
    
    
    </div>
  )
}
