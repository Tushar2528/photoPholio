import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from "./Components/Navbar/Navbar";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import fireStore reference from frebaseInit file
import {db} from "./firebaseinit";

//Import all the required functions from fireStore
import { collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';



function App() {

  const [albumform, setAlbumForm] = useState(false);
  const [albumformcom, setAlbumAddCom] = useState(true);
  const [imagelist, setImageList] = useState(false);
  const [imgform , setImageForm] = useState(false);

  function showAlbumForm(){
    setAlbumForm(!albumform);
  }

  function showImgForm(){
    setImageForm(!imgform);
  }

  function showImageList(){
    setImageList(!imagelist);
  }
  


  return (
    <div className="App">
      <Navigation/>
      <AlbumsList showAlbumForm={showAlbumForm} 
                  albumform={albumform} 
                  albumformcom={albumformcom}
                  imagelist={imagelist}
                  showImageList={showImageList}
                  imgform={imgform}
                  showImgForm={showImgForm}/>
      <ToastContainer/>
     
    </div>
  );
}

export default App;
