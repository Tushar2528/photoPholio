import { useState , useRef} from "react";
import formStyles from "./AlbumForm.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import fireStore reference from frebaseInit file
import {db} from "../../firebaseinit";

//Import all the required functions from fireStore
import { collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function AlbumForm(props){

    const [display, setDisplay] = useState(true);
    const nameRef = useRef(null);

    async function handleSubmit(e){
        e.preventDefault();
    }

    function handleClear(e){
        e.preventDefault();
    }

    function handleCreate(e){
        e.preventDefault();
        const albumName = nameRef.current.value;

        props.addAlbumTodb(albumName);
        nameRef.current.value = "";
        props.showAlbumForm();
    }

    function handleCancel(e){
        e.preventDefault();
        props.showAlbumForm();
    }



    
    return(

        <>
        
            <div>
                <form className={formStyles.formbody} onSubmit={(e) => handleSubmit}>
                    <h2><b>Create an album</b></h2>
                    
                        <row label="Name" className={formStyles.row}>
                            <input placeholder="Album Name" className="input" ref={nameRef}></input>
                            <button className={formStyles.clearbtn} onClick={handleClear}>Clear</button>
                            <button className={formStyles.createbtn} onClick={handleCreate}>Create</button>
                        </row>
                        <button className={formStyles.cancelbtn} onClick={ handleCancel}>Cancel</button>
                


                </form>
            </div> 
        

        </>
    )
}