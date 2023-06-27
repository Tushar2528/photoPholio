import { useRef, useEffect } from "react";
import imgformStyles from "./ImageForm.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ImageForm(props){

    useEffect(() => {
        if (props.editImageToggle) {
          const { title, url } = props.toeditImage;
          props.titleRef.current.value = title;
          props.urlRef.current.value = url;
        }
      }, [props.editImageToggle]);

    // const titleRef = useRef(null);
    // const urlRef = useRef(null);


    // const handleAddImage = (e) => {
    //     e.preventDefault();
    //     // Handle the logic for adding the image
    //     const title = titleRef.current.value;
    //     const url = urlRef.current.value;
    //     props.addImageToDb({title, url});
    //     titleRef.current.value = "";
    //     urlRef.current.value = "";
    //     props.showImgForm();

    //   };
    
    //   const handleCancel = (e) => {
    //     e.preventDefault();
    //     props.showImgForm();
    //     // Handle the logic for cancelling
    //   };


    return(
        <>
            <div className={imgformStyles.maindiv}>
                {props.editImageToggle ? <h2><b>Edit image of {props.selectedAlbumName}</b></h2> : <h2><b>Add image to {props.selectedAlbumName}</b></h2>}
                {/* <h2><b>Add image to {props.selectedAlbumName}</b></h2> */}
                <form className={imgformStyles.formdiv}>
                    <div className={imgformStyles.inputdivs}>
                        <row label="Title" >
                            <input id="title" className="input" ref={props.titleRef} placeholder="Title"></input>
                        </row>
                    </div>

                    <div className={imgformStyles.inputdivs}>
                        <row label="url">
                            <input id="url" className="input" ref={props.urlRef} placeholder="Image URL"></input>
                        </row>
                    </div>
                    <div>
                        {props.editImageToggle ? <button className={imgformStyles.addbtn} onClick={props.handleAddImage}>Update</button> :
                        <button className={imgformStyles.addbtn} onClick={props.handleAddImage}>Add</button>}
                        
                        <button className={imgformStyles.cancelbtn} onClick={props.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}