import { useState } from 'react';

import './App.css';
import Navigation from "./Components/Navbar/Navbar";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  const [albumform, setAlbumForm] = useState(false);
  const [albumformcom] = useState(true);
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
