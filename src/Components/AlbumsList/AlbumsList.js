import {useEffect, useState} from "react";
import albumStyles from "./AlbumsList.module.css";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import photos from "../../Images/photos.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import fireStore reference from frebaseInit file
import {db} from "../../firebaseinit";

//Import all the required functions from fireStore
import { collection, addDoc, onSnapshot, doc, getDoc } from 'firebase/firestore';



export default function AlbumsList(props){

    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedAlbumImages, setSelectedAlbumImages] = useState([]);
    const [selectedAlbumName, setSelectedAlbumName] = useState(null);

    async function addAlbumTodb(albumName) {
        // Add the album to the "albums" collection
        await addDoc(collection(db, 'albums'),
         { name: albumName
            
        });
        toast.success('Album added successfully!');
        
      
      }
      


    // Using useEffect hook to render all the albums on the screen on every update 
    useEffect(() => {

        // Using snapshot method of firebase to extract real time albums data from firestore
        onSnapshot(collection(db, "albums"), (snapShot) => {
            const albums = snapShot.docs.map((doc) => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            });

            setAlbums(albums);

        })


    },[])




    async function handleAlbumClick(album, albumId) {

        // Get the reference to the album document
        const albumRef = doc(db, "albums", albumId); 
        const docSnap = await getDoc(albumRef);

        

        // Get the reference to the images subcollection
        const imagesCollectionRef = collection(albumRef, "images"); 
      
        // Fetch the images from the images subcollection
        onSnapshot(imagesCollectionRef, (snapshot) => {
          const images = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          // Setting all the states and calling functions to render approprite components on the screen
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
                                    <img src={photos} alt=""></img>
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