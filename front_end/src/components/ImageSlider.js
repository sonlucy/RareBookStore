import React, { useState, useEffect } from 'react';
import "../styled/ImageSlider.css"

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const updateImages = () => {
      const isTablet = window.innerWidth <= 768 && window.innerWidth > 425;
      const isMobile = window.innerWidth <= 425;

      if (isTablet) {
        setImages(['img/img5.png', 'img/img2.png', 'img/img6.png']);
      } else if (isMobile) {
        setImages(['img/img7.png', 'img/img8.png', 'img/img9.png']);
      } else { // 랩탑
        setImages(['img/img2.png', 'img/img3.png', 'img/img1.png']);
      }
    };

    updateImages();

    const handleResize = () => {
      updateImages();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="sbk-slider-container">
      <div className="sbk-slider" style={{ width: `${images.length * 100}vw`, transform: `translateX(-${currentIndex * 100}vw)` }}>
        {images.map((image, index) => (
          <img key={index} className="sbk-slide" src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <span className="sbk-arrow sbk-prev-arrow" onClick={prevSlide}>&lt;</span>
      <span className="sbk-arrow sbk-next-arrow" onClick={nextSlide}>&gt;</span>
      <div className="sbk-page-indicator-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`sbk-page-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
