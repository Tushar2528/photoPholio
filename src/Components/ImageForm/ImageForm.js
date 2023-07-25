import {useEffect } from "react";
import imgformStyles from "./ImageForm.module.css";

import 'react-toastify/dist/ReactToastify.css';



export default function ImageForm(props){

    // I fthe edit button is clicked on an image, the title and URL fields will be pre-populated using this useEffect
    useEffect(() => {
        if (props.editImageToggle) {
          const { title, url } = props.toeditImage;
          props.titleRef.current.value = title;
          props.urlRef.current.value = url;
        }
      });



    return(
        <>
            <div className={imgformStyles.maindiv}>
                {props.editImageToggle ? <h2><b>Edit image of {props.selectedAlbumName}</b></h2> : <h2><b>Add image to {props.selectedAlbumName}</b></h2>}
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