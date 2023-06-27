import { useState, useEffect } from "react";
import carouselStyles from "./carousel.module.css";

export default function Carousel({ selectedAlbumImage, selectedAlbumImages, closeCarousel }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log("Selected Album Images", selectedAlbumImages);

  // const currentIndex = (prevIndex) =>{
  //   const index = (prevIndex + 1)% selectedAlbumImages.length;
  //   return index;
  // }
  const handleNextImage = (id) => {
    const currentImageIndex = selectedAlbumImages.findIndex((album) => album.id == id );
    const nextImageIndex = (currentImageIndex + 1)% selectedAlbumImages.length;
    setCurrentImageIndex(nextImageIndex);
    console.log("Current index", currentImageIndex);
    console.log("Next index", nextImageIndex);
    // console.log("ID", id);
    // console.log("Selected album images", selectedAlbumImages);
    // console.log("Current image index", currentImageIndex);
    // const index = currentIndex()
    // setCurrentImageIndex((prevIndex) => {
    //   const nextIndex = (prevIndex + 1) % selectedAlbumImages.length;
    //   console.log("Next image");
    //   console.log("Current Image Index:", nextIndex);
    //   return nextIndex;
    // });
  };
  
  const handlePreviousImage = (id) => {
    const currentImageIndex = selectedAlbumImages.findIndex((album) => album.id == id );
    const prevImageIndex = (currentImageIndex - 1 + selectedAlbumImages.length)% selectedAlbumImages.length;
    setCurrentImageIndex(prevImageIndex);
    // setCurrentImageIndex((prevIndex) => {
    //   const prevIndexNormalized = (prevIndex - 1 + selectedAlbumImages.length) % selectedAlbumImages.length;
    //   // console.log("Previous image");
    //   // console.log("Current Image Index:", prevIndexNormalized);
    //   return prevIndexNormalized;
    // });
  };

  // useEffect(() => {
  //   console.log("Current Image Index:", currentImageIndex);
  // }, [currentImageIndex]);

  useEffect(() => {
    const index = selectedAlbumImages.findIndex((album) => album.id == selectedAlbumImage[0].id);
    // console.log("Index :", index);
    setCurrentImageIndex(index);
    // console.log("Selected image :", selectedAlbumImage);
    // console.log("Selected album images :", selectedAlbumImages);
  },[]);

  if (selectedAlbumImages.length === 0) {
    return <div>No images available</div>;
  }

  const currentImage = selectedAlbumImages[currentImageIndex];

  console.log("Current Image:", currentImage);

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






// import { useState , useEffect} from "react";
// import carouselStyles from "./carousel.module.css";

// export default function Carousel({ selectedAlbumImages , closeCarousel}) {

//     useEffect(() => {
//         console.log("selectedAlbumImages inside Carousel:", selectedAlbumImages);
//       }, [selectedAlbumImages]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       (prevIndex + 1) % selectedAlbumImages.length
//     );
//     console.log("Next image");
//   };

//   const handlePreviousImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       (prevIndex - 1 + selectedAlbumImages.length) % selectedAlbumImages.length
//     );
//     console.log("Previous image");
//   };

//   if (selectedAlbumImages.length === 0) {
//     return <div>No images available</div>;
//   }

//   const currentImage = selectedAlbumImages[currentImageIndex];

//   console.log(selectedAlbumImages[currentImageIndex]); // Check the value of selectedAlbumImages[currentImageIndex]

//   return (
//     <div className={carouselStyles.carousel}>
//         <button onClick={closeCarousel}><b>X</b></button>
//       <div className={carouselStyles.imageContainer}>
//         <img
//           src={currentImage.url}
//           alt={currentImage.title}
//           className={carouselStyles.image}
//         />
//       </div>
//       <div className={carouselStyles.navigation}>
//         <button onClick={handlePreviousImage} className={carouselStyles.button}>
//           Previous
//         </button>
//         <button onClick={handleNextImage} className={carouselStyles.button}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }









// import { useState } from "react";
// import carouselStyles from "./carousel.module.css";

// export default function Carousel({ selectedAlbumImages }) {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     // console.log(selectedAlbumImages[currentImageIndex]);
  
//     const handleNextImage = () => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedAlbumImages.length);
//     };
  
//     const handlePreviousImage = () => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? selectedAlbumImages.length - 1 : prevIndex - 1
//       );
//     };

//     console.log(selectedAlbumImages[currentImageIndex]); // Check the value of selectedAlbumImages[currentImageIndex]

  
//     return (
//       <div className={carouselStyles.carousel}>
//         <div className={carouselStyles.imageContainer}>
//           <img
//             src={selectedAlbumImages[currentImageIndex].url}
//             alt={selectedAlbumImages[currentImageIndex].title}
//             className={carouselStyles.image}
//           />
//         </div>
//         <div className={carouselStyles.navigation}>
//           <button onClick={handlePreviousImage} className={carouselStyles.button}>
//             Previous
//           </button>
//           <button onClick={handleNextImage} className={carouselStyles.button}>
//             Next
//           </button>
//         </div>
//       </div>
//     );
//   }
