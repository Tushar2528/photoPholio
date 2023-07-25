import { useRef} from "react";
import formStyles from "./AlbumForm.module.css";
import 'react-toastify/dist/ReactToastify.css';

export default function AlbumForm(props){

    const nameRef = useRef(null);

    //To stop the page from refeshing after every submit
    async function handleSubmit(e){
        e.preventDefault();
    }

    function handleClear(e){
        e.preventDefault();
    }

    // To create a new album - passing the current value of the input field to the addAlbumTodb function in parent
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