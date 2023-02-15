import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "./newProduct.css"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { addProduct } from "../../redux/apiCalls"
import { useDispatch } from 'react-redux';

const NewProduct = () => {
  const [inputs, setInputs] = useState({inStock: true})
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [preview, setPreview] = useState(null)
  const dispatch = useDispatch()

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(prevState => {
      return (
        {
          ...prevState,
          [name]: value
        }
      )
    })
  }

  const handleCategories = (e) => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
    setCategories(valueWithoutSpaces.split(","))
  }

  const handleSizes = (e) => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
    setSizes(valueWithoutSpaces.split(","))
  }

  const handleColors = (e) => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
    setColors(valueWithoutSpaces.split(","))
  }

  const handleClick = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.floor(progress))
        console.log('Upload is ' + progress + '% done');
        console.log(uploadPercentage)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          // console.log({...inputs, img: downloadURL, categories: categories, color: colors, size: sizes})$
          const createdProduct = {...inputs, img: downloadURL, categories: categories, color: colors, size: sizes}
          addProduct(createdProduct, dispatch)
        });
      }
    );
  }

  // console.log(categories, colors, sizes)

  return (
    <>
      <Sidebar active="products" />
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="formLeft">
            <div className="addProductItem">
              <label>Title</label>
              <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <textarea name="desc" placeholder="Description..." onChange={handleChange}/>
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input name="price" type="number" placeholder="100" onChange={handleChange}/>
            </div>
          </div>
          <div className="formRight">
            <div className="addProductItem">
              <label>Categories</label>
              <input name="categories" type="text" placeholder="jeans,shirts" onChange={handleCategories}/>
            </div>
            <div className="addProductItem">
              <label>Sizes</label>
              <input name="size" type="text" placeholder="S,M" onChange={handleSizes}/>
            </div>
            <div className="addProductItem">
              <label>Colors</label>
              <input name="color" type="text" placeholder="yellow,blue" onChange={handleColors}/>
            </div>
            <div className="addProductItem">
              <label>In Stock</label>
              <select name="inStock" value={inputs.inStock} onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Image</label>
              <input type="file" id="file" onChange={handleFileInputChange}/>
              <div className="imagePreviewContainer">
                {preview && <img className='imagePreview' src={preview} alt="Preview" />}
                {uploadPercentage !== 0 && <span className='uploadProgress'>Upload is {uploadPercentage}% done.</span> }
              </div>
            </div>
          </div>  
        </form>
        <button onClick={handleClick} className="addProductButton">Create</button>
        {uploadPercentage === 100 && <span className="uploadSuccesMessage">Your product has successfully been added!</span>}
      </div>
    </>
  )
}

export default NewProduct
