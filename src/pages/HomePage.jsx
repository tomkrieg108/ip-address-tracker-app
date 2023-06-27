import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ipRegex from "ip-regex";
import urlRegex from "url-regex";
import Map from "../components/Map";
import Spinner from "../components/Spinner";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [ipData, setIpData] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadInfo(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`
    );
  }, []);

  const loadInfo = async function (url) {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Problem fetching data");
      }
      const data = await response.json();
      setIpData(data);
      setIsLoading(false);
      // toast.success('Success ');
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      toast.error("Domain does not exist");
    }
  };

  const handleInput = function (e) {
    e.preventDefault();
    const input = inputRef.current.value;
    if (input.length === 0) return;
    const isDomain = urlRegex({ exact: true, strict: false }).test(input);
    const isIP = ipRegex({ exact: true }).test(input);
    let val = "";
    if (isDomain) {
      val = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&domain=${inputRef.current.value}`;
    } else if (isIP) {
      val = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&domain=${inputRef.current.value}`;
    }
    if (val !== "") {
      loadInfo(val);
    } else {
      console.error("Invalid input");
      toast.error("Invalid domain or IP address", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      inputRef.current.value = "";
    }
  };

  // const {ip,isp} = ipData;
  // const {country, region, city, timezone, lat, lng} = ipData.location;

  const ip = ipData?.ip;
  const isp = ipData?.isp;
  const country = ipData?.location?.country;
  const region = ipData?.location?.region;
  const city = ipData?.location?.city;
  const timezone = ipData?.location?.timezone;
  const lat = ipData?.location?.lat;
  const lng = ipData?.location?.lng;

  return (
    <div className="bg-gray-300 h-screen flex flex-col justify-center items-center">
      {/* content box */}
      <div className="flex flex-col justify-between h-full w-full shadow-2xl ipat-max-width md:full md:h-full ">
        {/* Banner */}
        <div className="ipat-banner relative flex flex-col justify-start items-center">
          <h1 className="text-3xl text-white font-bold mt-8">
            IP Address Tracker
          </h1>

          {/* Search input */}
          <div className="mt-6 flex">
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              className="py-3 px-6 w-96 rounded-l-lg bg-white outline-none ipat-input-text hover:opacity-90"
              ref={inputRef}
            />
            <button
              onClick={handleInput}
              className="flex justify-center items-center w-12 bg-black rounded-r-lg hover:opacity-70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="3"
                  d="M2 1l6 6-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Info Box */}
          <div className="w-96 md:w-11/12 md:max-w-5xl p-6 absolute flex flex-col justify-center items-center space-y-4 bg-white rounded-lg bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 z-10 shadow-xl md:flex-row md:space-y-0 md:space-x-8 md:divide-x md:divide-gray-300">
            <div className="text-center md:text-left">
              <p className="uppercase text-DarkGray text-xs font-bold tracking-widest">
                IP Address
              </p>
              {/* <h3 className=" text-VeryDarkGray font-medium mt-1">{ip}</h3> */}
              <h3 className=" text-VeryDarkGray font-medium mt-1">
                {ip ? ip : "----------"}
              </h3>
            </div>

            <div className="pl-3 text-center md:text-left">
              <p className="uppercase text-DarkGray text-xs font-bold tracking-widest">
                Location
              </p>
              {/* <h3 className=" text-VeryDarkGray font-medium mt-1">{`${city}, ${region}, ${country}`}</h3> */}
              <h3 className=" text-VeryDarkGray font-medium mt-1">{`${
                city ? city : "----------"
              }, ${region ? region : ""}, ${country ? country : ""}`}</h3>
            </div>

            <div className="pl-3 text-center md:text-left">
              <p className="uppercase text-DarkGray text-xs font-bold tracking-widest">
                Timezone
              </p>
              {/* <h3 className=" text-VeryDarkGray font-medium mt-1">{`UTC ${timezone}`}</h3> */}
              <h3 className=" text-VeryDarkGray font-medium mt-1">{`UTC ${
                timezone ? timezone : "----------"
              }`}</h3>
            </div>

            <div className="pl-3 text-center md:text-left">
              <p className="uppercase text-DarkGray text-xs font-bold tracking-widest">
                ISP
              </p>
              {/* <h3 className=" text-VeryDarkGray font-medium mt-1">{isp}</h3> */}
              <h3 className=" text-VeryDarkGray font-medium mt-1">
                {isp ? isp : "----------"}
              </h3>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="grow z-0 relative">
          {isLoading ? <Spinner /> : <Map lat={lat} lng={lng} />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomePage;
