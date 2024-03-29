"use client";
import Image from "next/image";
import { Rubik } from "next/font/google";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";
import { Suspense } from "react";
import Map from "@/components/Map/Map";

const rubik = Rubik({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const getDetails = async (ip = "") => {
  const data = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
  );

  return data.json();
};

const Home = () => {
  const [details, setDetails] = useState({
    ip: "",
    location: {
      region: "",
      country: "",
      city: "",
      timezone: "",
      lat: 0,
      lng: 0,
    },
    isp: "",
  });

  const [ip, setIp] = useState(details.ip);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDetails();
        console.log(result);
        setDetails({
          ip: result.ip,
          location: {
            region: result.location.region || "",
            timezone: result.location.timezone,
            country: result.location.country,
            city: result.location.city,
            lat: parseFloat(result.location.lat),
            lng: parseFloat(result.location.lng),
          },
          isp: result.isp,
        });
      } catch (error: any) {
        setError(`Error fetching data ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    const result = await getDetails(ip);
    setDetails(result);
  };

  return (
    <main className="h-[100vh]">
      <div className="w-[100%] h-[50vh] bg-[url('/assets/pattern-bg-mobile.png')] bg-no-repeat bg-cover absolute flex flex-col items-center py-10 gap-4 md:bg-[url('/assets/pattern-bg-desktop.png')] lg:h-[40vh]">
        <h1
          className={`${rubik.className} antialiased font-medium text-3xl text-white`}
        >
          IP Address Tracker
        </h1>

        <div className="flex items-center justify-center w-[100%] mt-4">
          <input
            type="text"
            name="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-[70%] px-4 py-3 rounded-l-xl outline-none"
            placeholder="Search for any IP address or domain"
          />
          <button
            className="bg-black px-4 py-[1.1rem] rounded-r-xl"
            onClick={handleSearch}
          >
            <Image
              src="/assets/icon-arrow.svg"
              width={10}
              height={10}
              alt="arrow"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-[80%] py-10 m-auto relative bottom-[-25vh] z-40 bg-white rounded-2xl shadow-md lg:flex-row lg:justify-between lg:p-[3rem] lg:bottom-[-30vh]">
        <div className="flex flex-col items-center">
          <h1 className="text-[10px] text-gray-400">IP ADDRESS</h1>
          <Suspense fallback={<Loading />}>
            <h2 className="text-[1.5rem] font-bold">{details.ip}</h2>
          </Suspense>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[10px] text-gray-400">LOCATION</h1>
          <Suspense fallback={<Loading />}>
            <h2 className="text-[1.5rem] font-bold">
              {details?.location?.region}
            </h2>
          </Suspense>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[10px] text-gray-400">TIMEZONE</h1>
          <h2 className="text-[1.5rem] font-bold">
            <Suspense fallback={<Loading />}>
              {details?.location?.timezone}
            </Suspense>
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[10px] text-gray-400">ISP</h1>
          <Suspense fallback={<Loading />}>
            <h2 className="text-[1.5rem] font-bold">{details.isp}</h2>
          </Suspense>
        </div>
      </div>

      {error ? (
        <p>{error}. There's a problem with the API</p>
      ) : (
        <Map details={details} />
      )}
    </main>
  );
};

export default Home;
