import { useState } from "react"


const WheatherApp = () => {

    //deberia ir en un helper
    const urlBase = 'http://api.weatherstack.com/current'
    const API_KEY = '221585799ba03098172b9f98ee40d67d'

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }
    
    const onHandleSubmit = (e)=>{
        e.preventDefault()
        if(ciudad.length>0) fetchClima()
    }

    //deberia ir en un hook
    const fetchClima = async()=>{
        try{ //http://api.weatherstack.com/current?access_key=221585799ba03098172b9f98ee40d67d&query=New York
            const respuesta= await fetch(`${urlBase}?access_key=${API_KEY}&query=${ciudad}`)
            const data=await respuesta.json()
            setDataClima(data)
            //console.log(dataClima)
        }catch(error){
            console.error(error)
        }
    }

  return (
    <div className="container">
        <h1>Aplicacion del clima</h1>

        <form onSubmit={onHandleSubmit}>
            <input
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <h2>{dataClima.location.name}</h2>
                    <p>Temperatura: {dataClima?.current.temperature}°C</p>
                    <p>Condición meteorlógica: {dataClima?.current.weather_descriptions[0]}</p>
                    <img src={dataClima?.current.weather_icons}/>
                </div>
            )
        }
     
    </div>
  )
}

export default WheatherApp
