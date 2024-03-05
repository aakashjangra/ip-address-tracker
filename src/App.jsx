import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import Map from './components/Map';

function App() {

  const [ipDetails, setIpDetails] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 51.505, long: -0.09 });

  const trackIP = (userInput = '') => {
    const baseURL = import.meta.env.VITE_IPIFY_BASE_URL;

    // http://ip-api.com/json/{query}?fields=status,message,country,city,zip,lat,lon,timezone,isp,org,hosting,query

    const query = userInput; //add userInput in this

    //one of the two, not both
    //if ipAddress given add in url
    //if domain given add in url
    const url = `${baseURL}${query}?fields=status,message,country,city,zip,lat,lon,timezone,isp,org,query`;
    axios.get(url).then(response => {
      console.log(response)
      if(response?.data?.status === "success"){
        const data = response.data;
        setIpDetails(data);
        setCoordinates({lat: data.lat, long: data.lon})
        console.log(response, data);
        //render map with current lat, long / location
      } else {
        alert("Invalid query!");
      }
    }).catch(err => {
      alert('some error occured when fetching!');
      console.log(err);
    }
    )
    console.log(url);
  }

  useEffect(() => {
    //run on initial load
    trackIP()
  }, [])

  return (
    <div className="relative w-screen h-screen bg-blue-50">
      <div className="absolute z-20 h-[30%] bg-desktop-pattern w-full flex flex-col items-center gap-6 overflow-visible">
        <h1 className='text-white font-[500] text-2xl pt-5'>IP Address Tracker</h1>
        <div className="input-container min-h-12 w-2/5 overflow-hidden flex rounded-lg cursor-pointer">
          <input
            type="text"
            name="ip"
            id="ip"
            placeholder='Search for any IP address or domain'
            className='appearance-none h-full w-full px-4 text-[18px] cursor-pointer'
            onClick={(e) => {setInputValue(e.target.value)}}
          />
          <div className="img-container h-full w-12 bg-black md:hover:bg-slate-600 flex justify-center items-center px-1"
            onClick={() => { trackIP(inputValue) }}
          >
            <img className='h-1/4 w-1/4' src="/icon-arrow.svg" alt="" 
              
            />
          </div>
        </div>
        <div className="result bg-white w-[83%] grid grid-cols-4 p-6 gap-4 rounded-lg">
          <div className="ip-address border-r-2 ">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">IP ADDRESS</h3>
            <h4 className="data font-bold text-lg">{ipDetails.query}</h4>
          </div>
          <div className="location border-r-2">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">LOCATION</h3>
            <h4 className="data font-bold text-lg">{ipDetails.city}, {ipDetails.country}
            <br />
            {ipDetails.zip}
            </h4>
          </div>
          <div className="timezone border-r-2">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">TIMEZONE</h3>
            <h4 className="data font-bold text-lg">{ipDetails.timezone}</h4>
          </div>
          <div className="isp">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">ISP</h3>
            <h4 className="data font-bold text-lg">
              {ipDetails.isp}
            </h4>
          </div>
        </div>
      </div>
      <Map styles={'absolute bottom-0 h-[70%] z-10 w-full'} coordinates={coordinates}/>

      {/* add offset value dynamically using the API */}

    </div>
  )
}

export default App
