import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDropzone } from 'react-dropzone'
import { DragDropArea } from './components/dragDropArea'
import { app } from './utils/firebase'
import DicomViewer from './components/dicomViewer'
import { useLottie } from "lottie-react";
import previo from "./utils/lotties/previo.json";
import finalizado from "./utils/lotties/finalizado.json";
import logo from './assets/logoSalud.png'
import finalizadoGif from './assets/finalizado.gif'
import errorGif from './assets/error.gif'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/* import fileDicom from '../src/assets/0009.dcm'
 */
function App() {
  const [count, setCount] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [patientWhatsapp, setPatientWhatsapp] = useState('+52')
  const [inputValue, setInputValue] = useState('')
  const [dateFolio, setDateFolio] = useState('')

  const incializeFirebase = app

  const options = {
    animationData: previo,
    loop: true
  };

  const optionsFinalizado = {
    animationData: finalizado,
    loop: true
  };

  const lottiePrevio = useLottie(options).View
  const lottieFinalizado = useLottie(options).View
  

  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const asignarValorDesdeDragDropArea = (valor) => {
    // Aquí puedes hacer lo que necesites con el valor
    setUploadedFiles(valor)
    console.log('Valor asignado desde DragDropArea:', valor);
  }

  const showSwal = (dateFolio) => {
    console.log('dateFolioSwal', dateFolio)
    withReactContent(Swal).fire({
      title: <i>Archivo enviado</i>,
      html: `
      <p>Tu folio es: ${dateFolio}</p>
      <img style={{width:'20vh'}} src='${finalizadoGif}'/>`,
      background:'#FFEED6',
    })
  }

  const showSwalError = () => {
    withReactContent(Swal).fire({
      title: <i>Ocurrio un error</i>,
      html: `
      <img style={{width:'20vh'}} src='${errorGif}'/>`,
      background:'#FFEED6',
    })
  }

  function generateNumericId() {
    // Genera un número aleatorio entre 0 y 99999999999
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    // Convierte el número en una cadena y devuelve el ID generado
    return randomNumber.toString();
  }


    // Función para enviar los datos a la API utilizando Axios
    const enviarDatosAPI = async () => {

      var dateFolioLocal = generateNumericId()



      console.log('orderId: ', dateFolioLocal)
      console.log('phone: ', patientWhatsapp)
      //console.log('dicomFile: ', uploadedFiles[0])
      
      if(uploadedFiles === null) alert('debes de subir un archivo dcm')
      if(patientWhatsapp === '') alert('escribe el whatsapp del paciente')
      //showSwal(dateFolioLocal)


      try {
        setDateFolio(dateFolioLocal)
        const apiUrl = 'https://server.omaka.mx/saluddigna/upload-dicom'; // Reemplaza esto con la URL de tu API
        const formData = new FormData();
        formData.append('orderNumber', dateFolioLocal)
        formData.append('phone', patientWhatsapp);
        formData.append('dicomFile', uploadedFiles[0]); // Suponiendo que solo se envía un archivo
  
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        

        console.log('Respuesta de la API:', response.data);
        showSwal(dateFolioLocal)
        // Aquí podrías realizar acciones adicionales según la respuesta de la API
      } catch (error) {
        console.error('Error al enviar los datos a la API:', error);
        showSwalError()
      }
    
    };
    
    //Función para limpiar el campo del file 


  return (
    <div className='mainContainer'>

      <div className='formFileAndNumber'>

        <div >
          <img style={{width:'30vh', marginBottom:'3vh'}} src={logo}/>
        </div>

        <div className="input-with-label-above">
          <label htmlFor={'1'}>Whatsapp del paciente</label>
          <input type="text" id={'1'} value={patientWhatsapp} onChange={e=>setPatientWhatsapp(e.target.value)}/>
        </div>

        <div className='buttonUploadFile'>
          <p>Subir archivo</p>
          <span id='iconAdd' class="material-symbols-outlined">add_circle</span>
        </div>


        <DragDropArea sendFiles={asignarValorDesdeDragDropArea}/>


      </div>

      <div className='formFileUploaded'>



        {uploadedFiles === null ?
          <>
            <div style={{width:'20vh'}}>{useLottie(options).View}</div>
            <p>Ningun archivo seleccionado</p>
          </>

          :

          <>
            <div style={{width:'20vh'}}>{useLottie(optionsFinalizado).View}</div>
            <p>{uploadedFiles[0].name}</p>
          </>      
        }


          <div onClick={enviarDatosAPI} className='buttonSendFile'>
            <p>Enviar al paciente</p>
            <span id='iconSend' class="material-symbols-outlined"> arrow_circle_right</span>        
          </div>


        <div onClick={()=>setUploadedFiles(null)} className='buttonRestartUpload'>
          <p>Reiniciar subida</p>
          <span id='iconRestart' class="material-symbols-outlined"> refresh</span>        
        </div>

      </div>

{/*       <div className='formCaptureData'>
        <h1>Datos del paciente</h1>
        <InputText placeholder={'Nombre'}/>
        <InputText placeholder={'Telefono'}/>
        <InputText placeholder={'No. de orden'}/>
      </div> */}



   </div>
  )
}

export default App
