import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Devloper = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full min-h-screen px-6 py-16 bg-gradient-to-r from-cyan-700 to-indigo-800">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Meet the Developers</h2>
      
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className="px-4">
              <div className="bg-white h-[420px] rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <div className="rounded-t-2xl bg-indigo-500 flex justify-center items-center p-6">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-3 p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{d.name}</h3>
                  <p className="text-sm text-gray-600">{d.review}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const data = [
  {
    name: `Amiya Ghosh`,
    img: `amiya.jpeg`,
    review: `Hi, I am Amiya Ghosh, student of IIT Guwahati M.Tech Data Science (2024–2026 batch). I love to train machine learning and deep learning models.`,
  },
  {
    name: `Prateek Goel`,
    img: `prateek.jpeg`,
    review: `Hi, Myself Prateek Goel, student of IIT Guwahati M.Tech Data Science (2024–2026 batch). I like to explore new technologies in AI and data science domain.`,
  },
  {
    name: `Tsering Wangchu`,
    img: `tsering.jpeg`,
    review: `Hello, I’m Tsering Wangchu,currently pursuing M.Tech in Data Science at IIT Guwahati. I enjoy exploring innovative solutions to complex problems and am passionate about pushing the boundaries of AI research and its real-world applications`,
  },
  {
    name: `Bishal Sarkar`,
    img: `bishal.jpeg`,
    review: `Myself, Bishal Sarkar currently pursuing M.Tech in Data Science from IIT Guwahati. I am interested in Machine Learning, Deep Learning, Data Analysis.`,
  },
  {
    name: `Krishnapal Yadav`,
    img: `krishna.jpeg`,
    review: `Hello, I'm Krishnapal Yadav, pursuing M.Tech in Data Science at IIT Guwahati. I'm passionate about Generative AI, NLP, and leveraging data science to solve real-world problems.`,
  },
];

export default Devloper;
