import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import Map from './components/Map';
import { useQuery } from '@tanstack/react-query';
import Loading from './components/Loading';
import Notification from './components/Notification';

function App() {
  const [inputValue, setInputValue] = useState('');
  const isIpAddress = (input) => {
    if (input && !isNaN(input[0])) return true;
  }
  const getData = async (input) => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      let res;
      if (isIpAddress(input)) {
        res = await axios.get(`${URL}&ipAddress=${input}`);
      } else {
        res = await axios.get(`${URL}&domain=${input}`);
      }
      console.log('res is - ', res, res.data);

      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log('error while fetching ip details :/')
    }

    throw new Error('error occurred');
  }
  const { error, data, isFetching, refetch } = useQuery({
    queryKey: ['details'],
    queryFn: () => getData(inputValue),
    retry: false,
  })

  const trackIP = () => {
    refetch();
  }

  useEffect(() => {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        console.log('enter key pressed')
        trackIP();
      }
    });

    return () => {
      document.body.removeEventListener('enter');
    }
  }, [])


  return (
    <div className="relative w-screen h-screen bg-blue-50">
      <div className="absolute z-20 h-[30%] bg-purple-900 bg-mobile-pattern xs:bg-desktop-pattern w-full flex flex-col items-center gap-4 sm:gap-6 overflow-visible">
        <h1 className='text-white font-[500] text-2xl pt-5'>IP Address Tracker</h1>
        <div className="input-container min-h-12 sm:w-2/5 overflow-hidden flex rounded-lg cursor-pointer">
          <input
            type="text"
            name="ip"
            id="ip"
            disabled={isFetching}
            placeholder='Search for any IP address or domain'
            className='appearance-none h-full w-full px-4 text-sm md:text-md lg:text-lg cursor-pointer'
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value) }}
          />
          <button
            disabled={isFetching}
            className="img-container h-full w-12 bg-black md:hover:bg-slate-600 flex justify-center items-center px-1"
            onClick={() => { trackIP(inputValue) }}
          >
            <img className='h-1/4 w-1/4' src="/icon-arrow.svg" alt=""

            />
          </button>
        </div>
        <div className="result bg-white w-[83%] grid sm:grid-cols-4 p-6 gap-4 rounded-lg overflow-wrap-anywhere">
          <div className="ip-address sm:border-r-2 flex flex-col items-center sm:block">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">IP/MAC ADDRESS</h3>
            <h4 className="data font-bold text-lg">{data?.ip}</h4>
          </div>
          <div className="location sm:border-r-2 flex flex-col items-center sm:block">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">LOCATION</h3>
            <h4 className="data font-bold text-lg text-balance">{data?.location?.city}
              {data?.location?.city && data?.location?.country && (
                ','
              )}
              {data?.location?.country}
              <br />
              {data?.location?.postalCode}
            </h4>
          </div>
          <div className="timezone sm:border-r-2 flex flex-col items-center sm:block">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">TIMEZONE</h3>
            <h4 className="data font-bold text-lg">{data?.location?.timezone}</h4>
          </div>
          <div className="isp flex flex-col items-center sm:block">
            <h3 className="title text-xs font-semibold text-slate-400 tracking-widest">ISP</h3>
            <h4 className="data font-bold text-lg">
              {data?.isp}
              <br />
              {data?.as?.name}
            </h4>
          </div>
        </div>
      </div>
      <Map styles={'absolute bottom-0 h-[70%] z-10 w-full map-offset sm:map-center'} coordinates={{ lat: data?.lat ? data?.lat : 45, long: data?.lng ? data?.lng : 89 }} />


      <Loading styles={`${isFetching == false ? 'hidden' : ''} fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-white/60`} />

      {
        error && (
          <Notification message="Invalid IP/Domain" />
        )
      }

    </div>
  )
}

export default App
