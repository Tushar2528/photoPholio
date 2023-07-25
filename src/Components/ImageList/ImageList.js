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
import { toast } from 'react-toastify';
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
  

  // Handle the logic for cancelling
  const handleCancel = (e) => {
    e.preventDefault();
    props.showImgForm();
    
  };


  async function addImageToDb(imageData) {
    // Add the image to the "images" collection of the selected album
    await addDoc(collection(db, `albums/${props.selectedAlbum}/images`),{
      title: imageData.title,
      url: imageData.url
    });
    
  }

  
  function showhideCarousel(image) {
    setCarouselImage(image);
    
  }


  // Function to close carousel
  function closeCarousel() {
   
    setCarouselImage(null);
  }

  // Function to open the edit input fields on clicking the edit button
  async function editImage(e, data){
    e.stopPropagation();
    
    seteditImageToggle(!editImageToggle);
    settoeditImage(data);
    
    
    props.showImgForm();

  }

  // Function to delete image from the firestore DB

  async function removeImage(e,id){
    e.stopPropagation();
    const docRef = doc(db, `albums/${props.selectedAlbum}/images`,id);
    await deleteDoc(docRef);
    setCarouselImage(null);
    toast.success('Image deleted successfully!');
  }

  // Using snapshot method of firebase to get the real time data of images to render on screen
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
     

      <div className={`${imagelistStyles.mainDiv} ${carouselImage ? imagelistStyles.carouselOpen : ""}`}>
        <h1>Images in {props.selectedAlbumName}</h1>
        
        <button className={imagelistStyles.backbtn} onClick={props.showImageList}><img src={back} alt=""></img></button>
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
                            <img src={edit} alt=""/>
                        </div>
                        <div className={imagelistStyles.delicon} onClick={(e) => removeImage(e,image.id)}>
                            <img src={del} alt=""/>
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





















