import React, { useEffect, useMemo, useState } from 'react'
import "./product.css"
import { Link, useLocation } from "react-router-dom"
import Chart from "../../components/charts/Chart"
// import { productData } from '../../dummyData'
import { Publish } from "@mui/icons-material"
import Sidebar from '../../components/sidebar/Sidebar'
import { useSelector } from "react-redux"
import { userRequest } from '../../requestMethods'
import { useDispatch } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { updateProduct } from '../../redux/apiCalls'

const Product = () => {
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
  // console.log(location.pathname + "    " + productId)
  const [productStats, setProductStats] = useState([])
  const [totalProductSales, setTotalProductSales] = useState(null)
  
  const product = useSelector(state => state.product.products.find(product => product._id === productId))

  const [inputs, setInputs] = useState({title: product.title, desc: product.desc, price: product.price, inStock: product.inStock})
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState(product.categories)
  const [sizes, setSizes] = useState(product.size)
  const [colors, setColors] = useState(product.color)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [preview, setPreview] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const dispatch = useDispatch()
  const defaultInputs = {title: product.title, desc: product.desc, price: product.price, inStock: product.inStock, categories: product.categories, size: product.size, color: product.color, img: product.img}

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ], [])

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await userRequest.get(`orders/sales/${productId}`)
        res.data.map(item => 
          setProductStats(prevState => [
            ...prevState,
            {name: MONTHS[item._id - 1], Sales: item.totalSales }
          ])
        )
      } catch (err) {
        
      }
    }
    getProductStats()
  }, [productId, MONTHS])

  useEffect(() => {
    const getTotalProductSales = async () => {
      try {
        const res = await userRequest.get(`orders/products/${productId}/total-sales`)
        setTotalProductSales(res.data)
      } catch (err) {
        
      }
    }
    getTotalProductSales()
  }, [productId])

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(prevState => {
      return(
        {
          ...prevState,
          [name]: value
        }
      )
    })
  } 

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

  const handleCategoriesChange = (e) => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
    setCategories(valueWithoutSpaces.split(","))
  }

  const handleSizeChange = (e) => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
    setSizes(valueWithoutSpaces.split(","))
  }

  const handleColorChange = (e) => {
    const valuesWithoutSpaces = e.target.value.replace(/\s/g, "")
    setColors(valuesWithoutSpaces.split(","))
  }
  
  const handleClick = (e) => {
    e.preventDefault()
    setIsClicked(true)
    if(file){
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
            // console.log(inputs)
            // console.log({...inputs, img: downloadURL, categories: categories, color: colors, size: sizes})
            // console.log("download " + downloadURL)
            // console.log("imgUrl " + imgUrl)
            const updatedProduct = {...inputs, img: downloadURL, categories: categories, color: colors, size: sizes}
            let hasEmptyValue = false;

            for (const [key, value] of Object.entries(updatedProduct)) {
              if (Array.isArray(value)) {
                if (value.length === 0 || (value.length === 1 && value[0] === "")) {
                  updatedProduct[key] = defaultInputs[key];
                }
              } else if (typeof value === "string" && value === "") {
                updatedProduct[key] = defaultInputs[key];
              }
              hasEmptyValue = hasEmptyValue || (Array.isArray(value) ? value.length === 0 : value === "");
            }

            if (hasEmptyValue) {
              // At least one value in inputs is an empty string or empty array
              // Set it back to the default value
              setInputs(defaultInputs);
              return;
            }
            updateProduct(productId, updatedProduct, dispatch)
          });
        }
      );
    } else {
      const updatedProduct = {...inputs, img: product.img, categories: categories, color: colors, size: sizes}
      let hasEmptyValue = false;

      for (const [key, value] of Object.entries(updatedProduct)) {
        if (Array.isArray(value)) {
          if (value.length === 0 || (value.length === 1 && value[0] === "")) {
            updatedProduct[key] = defaultInputs[key];
          }
        } else if (typeof value === "string" && value === "") {
          updatedProduct[key] = defaultInputs[key];
        }
        hasEmptyValue = hasEmptyValue || (Array.isArray(value) ? value.length === 0 : value === "");
      }

      if (hasEmptyValue) {
        // At least one value in inputs is an empty string or empty array
        // Set it back to the default value
        setInputs(defaultInputs);
        return;
      }
      updateProduct(productId, updatedProduct, dispatch)
    }
  }

  return (
    <>
      <Sidebar active="products" />
      <div className='product'>
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <Link to="/newProduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product.img} alt="" className="productInfoImg" />
              <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">Id:</span>
                <span className="productInfoValue">{product._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Sales:</span>
                <span className="productInfoValue">{totalProductSales?.totalSales}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Number Sold:</span>
                <span className="productInfoValue">{totalProductSales?.count}</span>
              </div>
              {/* <div className="productInfoItem">
                <span className="productInfoKey">Active:</span>
                <span className="productInfoValue">Yes</span>
              </div> */}
              <div className="productInfoItem">
                <span className="productInfoKey">In Stock:</span>
                <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Title</label>
              <input name='title' type="text" onChange={handleChange} placeholder={product.title}/>
              <label>Description</label>
              <textarea name='desc' onChange={handleChange} placeholder={product.desc} />
              <label>Price</label>
              <input name='price' type="text" onChange={handleChange} placeholder={product.price}/>
            </div>  
            <div className="productFormMiddle">
            <label>Categories</label>
              <input name='categories' type="text" onChange={handleCategoriesChange} placeholder={product.categories}/>
              <label>Colors</label>
              <input name='color' type="text" onChange={handleColorChange} placeholder={product.color}/>
              <label>Sizes</label>
              <input name='size' type="text" onChange={handleSizeChange} placeholder={product.size}/>
              <label>In Stock</label>
              <select onChange={handleChange} defaultValue="Is the product currently in stock?" name="inStock" id="inStock">
                <option disabled>Is the product currently in stock?</option>
                <option value="true">Yes</option>  
                <option value="false">No</option>  
              </select>
              {/* <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>  
                <option value="no">No</option>  
              </select> */}
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={preview ? preview : product.img} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <Publish style={{cursor: "pointer"}}/>  
                </label>
                <input type="file" id='file' onChange={handleFileInputChange} style={{display: "none"}} />
              </div>
              {uploadPercentage !== 0 && <span className='uploadProgress'>Upload is {uploadPercentage}% done.</span> }
              <button className='productButton' onClick={handleClick}>Update</button>
              {(uploadPercentage === 100 || (!file && isClicked)) && <span className="updateSuccesMessage">Your product has successfully been updated!</span>}
            </div>  
          </form>
        </div>
      </div>
    </>
  )
}
export default Product