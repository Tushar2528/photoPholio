import { useEffect, useState } from "react";
import { useRef } from "react";
import imagelistStyles from "./ImageList.module.css";
import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/carousel";
import { db } from "../../firebaseinit";
import { collection, addDoc, onSnapshot, deleteDoc, doc , updateDoc} from 'firebase/firestore';
import edit from "../../Images/pen.png";
import del from "../../Images/delete.png";
import back from "../../Images/back.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageList(props) {
  const [images, setImages] = useState([]);
  const [carouselImage, setCarouselImage] = useState(null);
  const [toeditImage, settoeditImage] = useState(null);
  const [editImageToggle, seteditImageToggle] = useState(false);



  const titleRef = useRef(null);
  const urlRef = useRef(null);

  const handleAddImage = async (e) => {
    e.preventDefault();
  
    const title = titleRef.current.value;
    const url = urlRef.current.value;
  
    if (editImageToggle && toeditImage) {
      // Update existing image
      const imageDocRef = doc(db, `albums/${props.selectedAlbum}/images`, toeditImage.id);
      await updateDoc(imageDocRef, { title, url });
      toast.success('Image updated successfully!');
    } else {
      // Add new image
      await addImageToDb({ title, url });
      toast.success('Image added successfully!');
    }
    
    titleRef.current.value = "";
    urlRef.current.value = "";
    seteditImageToggle(false);
    props.showImgForm();
  };
  

//   const handleAddImage = (e) => {
//     e.preventDefault();
//     // Handle the logic for adding the image
//     const title = titleRef.current.value;
//     const url = urlRef.current.value;
//     addImageToDb({title, url});
//     titleRef.current.value = "";
//     urlRef.current.value = "";
//     props.showImgForm();

//   };

  const handleCancel = (e) => {
    e.preventDefault();
    props.showImgForm();
    // Handle the logic for cancelling
  };










  async function addImageToDb(imageData) {
    // Add the image to the "images" collection of the selected album
    const imageDocRef = await addDoc(collection(db, `albums/${props.selectedAlbum}/images`),{
      title: imageData.title,
      url: imageData.url
    });
    console.log("Executing!!");
  }

  function showhideCarousel(image) {
    setCarouselImage(image);
    console.log("It works!!");
  }

  function closeCarousel() {
    console.log("Close carousel!!");
    setCarouselImage(null);
  }

  async function editImage(e, data){
    e.stopPropagation();
    
    seteditImageToggle(!editImageToggle);
    settoeditImage(data);
    
    console.log("Image data: ", data);
    props.showImgForm();

    

  }

  async function removeImage(e,id){
    e.stopPropagation();
    const docRef = doc(db, `albums/${props.selectedAlbum}/images`,id);
    await deleteDoc(docRef);
    setCarouselImage(null);
    toast.success('Image deleted successfully!');
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, `albums/${props.selectedAlbum}/images`), (snapshot) => {
      const images = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      setImages(images);
    });

    return () => unsub(); // Clean up the snapshot listener when the component unmounts
  }, [props.selectedAlbum]);

  return (
    <>

        {carouselImage && <Carousel selectedAlbumImage={[carouselImage]} selectedAlbumImages={props.selectedAlbumImages} closeCarousel={closeCarousel}/>}
      {/* <div className={imagelistStyles.mainDiv}> */}

      <div className={`${imagelistStyles.mainDiv} ${carouselImage ? imagelistStyles.carouselOpen : ""}`}>
        <h1>Images in {props.selectedAlbumName}</h1>
        
        <button className={imagelistStyles.backbtn} onClick={props.showImageList}><img src={back}></img></button>
        {props.imgform ? <ImageForm showImgForm={props.showImgForm} 
                                    addImageToDb={addImageToDb} 
                                    selectedAlbumName={props.selectedAlbumName}     
                                    titleRef={titleRef} 
                                    urlRef={urlRef}
                                    handleAddImage={handleAddImage} 
                                    handleCancel={handleCancel}
                                    editImageToggle={editImageToggle} 
                                    toeditImage ={toeditImage}/> 
                                    : <button onClick={props.showImgForm} className={imagelistStyles.addbtn}>Add Image</button>}


        <div className={imagelistStyles.container}>
          {images.map((image) => {
            return (
                <>
                    
                    <div className={imagelistStyles.imagediv} onClick={() => showhideCarousel(image)}>
                        <div className={imagelistStyles.editicon} onClick={(e) => editImage(e, image)}>
                            <img src={edit} />
                        </div>
                        <div className={imagelistStyles.delicon} onClick={(e) => removeImage(e,image.id)}>
                            <img src={del} />
                        </div>
                        
                        <img src={image.url} alt={image.title} />
                        <p>{image.title}</p>
                    </div>
              </>
            )
          })}
        </div>
       
      </div>
    </>
  )
}





















// import { useEffect, useState } from "react";
// import imagelistStyles from "./ImageList.module.css";
// import ImageForm from "../ImageForm/ImageForm";
// import Carousel from "../Carousel/carousel";
// import { db } from "../../firebaseinit";
// import { collection, addDoc, onSnapshot } from 'firebase/firestore';

// export default  function ImageList(props){


//     const [images, setImages] = useState([]);
//     const [carousel, setCarousel] = useState(false);
//     // const [selectedImage, setSelectedImage] = useState(null);

//     async function addImageToDb(imageData) {
//         // Add the image to the "images" collection of the selected album
//         const imageDocRef = await addDoc(collection(db, `albums/${props.selectedAlbum}/images`),{
//             title : imageData.title,
//             url : imageData.url
//         });
//         console.log("Executing!!");
//     }

//     function showhideCarousel() {
//         // setSelectedImage(image);
//         setCarousel(!carousel);
//         console.log("It works!!");
//       }
    

//     useEffect(() => {
//         const unsub = onSnapshot(collection(db, `albums/${props.selectedAlbum}/images`), (snapshot) => {
//         const images = snapshot.docs.map((doc) => {
//             return {
//             id: doc.id,
//             ...doc.data()
//             };
//         });

//         setImages(images);
//         });

//         return () => unsub(); // Clean up the snapshot listener when the component unmounts
//     }, [props.selectedAlbum]);


//     return (
//         <>
//             <div className={imagelistStyles.mainDiv}>
//                 {props.imgform ? <ImageForm showImgForm={props.showImgForm} addImageToDb={addImageToDb}/> : <button onClick={props.showImgForm}>Add Image</button>}
//                 <div className={imagelistStyles.container}>
//                     {images.map((image) => {
//                         return(
//                             <div className={imagelistStyles.imagediv} onClick={showhideCarousel}>
//                                 <img src={image.url}></img>
//                                 <p>{image.title}</p>
//                             </div>
//                         )
//                     })}
                
//                 </div>

//                 {carousel ? <Carousel selectedAlbumImages={props.selectedAlbumImages}/> : null}
//                 {/* {carousel && <Carousel selectedImage={selectedImage} />} */}
                
                


//             </div>
//         </>
//     )
// }