import { useState, useEffect } from "react";
import carouselStyles from "./carousel.module.css";

export default function Carousel({ selectedAlbumImage, selectedAlbumImages, closeCarousel }) {

  // Declaring currentImageIndex to store the index of the current image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // Function to move to the next image on button click
  const handleNextImage = (id) => {
    const currentImageIndex = selectedAlbumImages.findIndex((album) => album.id === id );
    const nextImageIndex = (currentImageIndex + 1)% selectedAlbumImages.length;
    setCurrentImageIndex(nextImageIndex);

  };
  

  // Function to move to the previous image on button click
  const handlePreviousImage = (id) => {
    const currentImageIndex = selectedAlbumImages.findIndex((album) => album.id === id );
    const prevImageIndex = (currentImageIndex - 1 + selectedAlbumImages.length)% selectedAlbumImages.length;
    setCurrentImageIndex(prevImageIndex);
    
  };

 
  // With useEffect hook we are rendering the carousel component as soon as any image is clicked
  useEffect(() => {
    const index = selectedAlbumImages.findIndex((album) => album.id === selectedAlbumImage[0].id);
    setCurrentImageIndex(index);
   
  },[selectedAlbumImages, selectedAlbumImage]);

  if (selectedAlbumImages.length === 0) {
    return <div>No images available</div>;
  }

  const currentImage = selectedAlbumImages[currentImageIndex];


  return (
    <div className={carouselStyles.carousel}>
      <button onClick={closeCarousel} className={carouselStyles.cancel}>
        <b>X</b>
      </button>
      <div className={carouselStyles.imageContainer}>
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className={carouselStyles.image}
        />
      </div>
      <div className={carouselStyles.navigation}>
        <button
          onClick={() => handlePreviousImage(currentImage.id)}
          className={carouselStyles.button}
        >
          Previous
        </button>
        <button onClick={() => handleNextImage(currentImage.id)} className={carouselStyles.button}>
          Next
        </button>
      </div>
    </div>
  );
}






