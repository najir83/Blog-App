// components/Loading.jsx
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Loading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Spinner.json") 
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading Lottie JSON:", err));
  }, []);

  if (!animationData) return null; 

  return (
    <div className="flex items-center justify-center h-[84vh]">
      <div className="w-20 h-20  lg:w-40 lg:h-40" >
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Loading;
