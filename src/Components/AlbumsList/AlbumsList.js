import {useEffect, useState} from "react";
import albumStyles from "./AlbumsList.module.css";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import photos from "../../Images/photos.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import fireStore reference from frebaseInit file
import {db} from "../../firebaseinit";

//Import all the required functions from fireStore
import { collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, getDoc } from 'firebase/firestore';



export default function AlbumsList(props){

    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedAlbumImages, setSelectedAlbumImages] = useState([]);
    const [selectedAlbumName, setSelectedAlbumName] = useState(null);

    async function addAlbumTodb(albumName) {
        // Add the album to the "albums" collection
        const albumDocRef = await addDoc(collection(db, 'albums'),
         { name: albumName
            
        });
        toast.success('Album added successfully!');
        console.log("Executing!!");
      
      }
      



    useEffect(() => {
        const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
            const albums = snapShot.docs.map((doc) => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            });

            setAlbums(albums);

        })


    },[])



    function handleprint(){
        console.log("It works!!");
        props.showImageList();

    }

    async function handleAlbumClick(album, albumId) {
        const albumRef = doc(db, "albums", albumId); // Get the reference to the album document
        const docSnap = await getDoc(albumRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data().name);
        //   }

        
        const imagesCollectionRef = collection(albumRef, "images"); // Get the reference to the images subcollection
      
        // Fetch the images from the images subcollection
        onSnapshot(imagesCollectionRef, (snapshot) => {
          const images = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          setSelectedAlbumImages(images);
          setSelectedAlbum(albumId);
          setSelectedAlbumName(docSnap.data().name);
          props.showImageList();
        });
      }
      
    return(
        <>
        {props.imagelist ? <ImageList   imgform={props.imgform} 
                                        showImgForm={props.showImgForm} 
                                        selectedAlbum={selectedAlbum}
                                        selectedAlbumImages={selectedAlbumImages} 
                                        selectedAlbumName={selectedAlbumName}
                                        showImageList={props.showImageList}/> :         
        <>
            {props.albumformcom ?  

                <div>
                    {props.albumform ? <AlbumForm showAlbumForm={props.showAlbumForm} addAlbumTodb={addAlbumTodb}/> :  <button onClick={props.showAlbumForm} className={albumStyles.Addbtn}>Add Album</button>}
                </div>

                : null}

                <div className={albumStyles.main}>

                    {albums.map((album) => {
                        return(
                        <div className={albumStyles.innerdiv} key = {album.id} onClick={() => handleAlbumClick(album,album.id)}>
                            <div className={albumStyles.icon}>
                                <div>
                                    <img src={photos}></img>
                                </div>
                            </div>
                            <div>
                                <p>{album.name}</p>
                            </div>
                        </div>
                        );
                    })}
                    
                  

                </div>
        </>}

        </>
    )
}