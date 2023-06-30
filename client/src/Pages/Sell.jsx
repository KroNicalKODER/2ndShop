import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import SellData from '../Data/Sell.json'
import ClothBrand from '../Data/ClothingCompanies.json'
import ShoesBrand from '../Data/ShoesCompanies.json'

import './sell.css'
import app from '../Firebase';

const Sell = () => {

    const history = useNavigate();

    const [showBrandInput, setShowBrandInput] = useState(true)
    const [isRedesigned, setIsRedesigned] = useState(true)
    const [subCategory, setSubCategory] = useState([{ "name": "select option", "subCategory": "select option" }])
    const [sizeArray, setSizeArray] = useState(["select option"])
    const [subbCategory, setSubbCategory] = useState('-')
    const [genderState, setGender] = useState('-')
    const [category, setCategory] = useState('-')
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [brandName, setBrandName] = useState('-');
    const [size, setSize] = useState('-');
    const [age, setAge] = useState('-');
    const [address, setAddress] = useState('-');
    const [newPrice, setNewPrice] = useState('-');
    const [oldPrice, setOldPrice] = useState('0');
    const [productLink, setProductLink] = useState('-');
    const [noteBuyer, setNoteBuyer] = useState('-');

    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [fileCnt, setFileCnt] = useState(0)

    const [allIsWell, setAllIsWell] = useState(false);


    const handleSizeChange = (e) => {
        setSize(e.target.value)
    }
    const checkAllFilled = () => {
        if (images.size() > 3 && images.size() < 8 && genderState !== '-' && category !== '-' && subbCategory !== '-' && brandName !== '-' && size !== '-' && age !== '-' && newPrice !== '-' && address !== '-') {
            if (!isRedesigned && oldPrice === '-') return false;
            setAllIsWell(true);
        }
    }

    const handleBrandName = (e) => {
        setBrandName(e.target.value)
    }

    const handleImageChange = (acceptedFiles) => {
        const updatedImages = [...images, ...acceptedFiles];
        const updatedPreviewUrls = updatedImages.map((file) => URL.createObjectURL(file));
        setImages(updatedImages);
        setPreviewUrls(updatedPreviewUrls);
    };
    const handleUpload = () => {
        let imgurls = [];
        let called = false;
        setFileCnt(images.length)
        images.forEach(file => {
            let i = 0
            const storage = getStorage(app)
            const filename = new Date().getTime() + file.name
            const storageRef = ref(storage, 'images/' + filename)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setUploadPercentage(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        imgurls.push(downloadURL)
                        setImgUrl(imgurls);
                        console.log(imgUrl.length)
                    });
                })
        });
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const updatedPreviewUrls = [...previewUrls];

        updatedImages.splice(index, 1);
        updatedPreviewUrls.splice(index, 1);

        setImages(updatedImages);
        setPreviewUrls(updatedPreviewUrls);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleImageChange });

    const handleBrandInput = (e) => {
        if (e.target.value !== 'Others') {
            setShowBrandInput(false)
            handleBrandName(e)
        }
        else setShowBrandInput(true)
    }
    const handleRedesigned = (e) => {
        if (e.target.value === 'Redesigned') setIsRedesigned(true);
        else setIsRedesigned(false);
    }
    const setGenderforSub = (e) => {

        setGender(e.target.value)
        const subDataArray = SellData.filter(
            data => data.gender === e.target.value
        )
        const subData = subDataArray[0].category
        const subCategory = subData.filter(
            data => data.name === category
        )
        if (subCategory.length > 0) setSubCategory(subCategory[0].subCategory)
        // console.log(subCategory[0].subCategory)
    }
    const setCatForSub = (e) => {
        const subDataArray = SellData.filter(
            data => data.gender === genderState
        )
        setCategory(e.target.value)
        if (subDataArray.length > 0) {

            const subData = subDataArray[0].category
            const subCategory = subData.filter(
                data => data.name === e.target.value
            )
            setSubCategory(subCategory[0].subCategory)
            // console.log(subCategory[0].subCategory)
        }
    }

    const handleSetSubbCategory = (e) => {
        setSubbCategory(e.target.value)
        const sizes = subCategory.filter(data => data.name === e.target.value)
        setSizeArray(sizes[0].size)
        // console.log(sizes[0].size)
    }

    const handleOldPrice = (e) => {
        setOldPrice(e.target.value)

    }

    const handleSubmit = async (e) => {
        let param = ''
        if (category === 'FootWear') param = 'shoes'
        else if (category === 'Clothing') param = 'cloths'
        else if (category === 'Accessories') param = 'access'
        try {
            const data = {
                resale: !isRedesigned,
                gender: genderState,
                subCategory: subbCategory,
                type: category,
                brandName: brandName,
                size: size,
                age: age,
                orgLink: productLink,
                oldCost: oldPrice,
                newCost: newPrice,
                pickupAddress: address,
                noteForBuyer: noteBuyer,
                images: imgUrl
            }

            const res = await axios.post("/item/" + param, data)
            console.log('result', res.data)

            history('/sell-success')
        } catch (error) {
            console.log(error)
            history('/sell-error')
        }

    }


    return (
        <div className='flex justify-center items-center css-sell-col'>
            <div className='flex-[2] px-3 mx-2 bg-white rounded-md mt-3 font-inter shadow-md'>
                <div className='mt-3'>
                    FORM -
                </div>
                <hr className="w-full mb-4 " />
                <div className='mt-3'>
                    <input type="radio" name="red" value='Redesigned' onChange={handleRedesigned} className='peer/redesign' id="sell-redesign" hidden />
                    <label htmlFor="sell-redesign" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/redesign:border-blue-500 peer-checked/redesign:text-blue-500'> Redesigned </label>
                    <input type="radio" name="red" value='Resell' onChange={handleRedesigned} className='peer/resale' id="sell-resale" hidden />
                    <label htmlFor="sell-resale" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/resale:border-blue-500 peer-checked/resale:text-blue-500'> Resell </label>
                </div>
                <div className='mt-3 justify-between flex items-center'>
                    <span>Gender : </span>
                    <div className="flex">
                        <input type="radio" name="gender" value='Male' onChange={setGenderforSub} className='peer/male' id="sell-gender-male" hidden />
                        <label htmlFor="sell-gender-male" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/male:border-blue-500 peer-checked/male:text-blue-500'> Male </label>
                        <input type="radio" name="gender" value='Female' onChange={setGenderforSub} className='peer/female' id="sell-gender-female" hidden />
                        <label htmlFor="sell-gender-female" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/female:border-blue-500 peer-checked/female:text-blue-500'> Female </label>
                    </div>
                </div>
                <hr className="w-full mt-2" />
                <div className='mt-2 flex justify-between' >
                    <span>Category : </span>
                    <div className="flex">
                        <input type="radio" name="category" value='Clothing' onChange={setCatForSub} className='peer/clothing' id="sell-category-clothing" hidden />
                        <label htmlFor="sell-category-clothing" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/clothing:border-blue-500 peer-checked/clothing:text-blue-500'> Cloths </label>
                        <input type="radio" name="category" value='FootWear' onChange={setCatForSub} className='peer/footwear' id="sell-category-footwear" hidden />
                        <label htmlFor="sell-category-footwear" className='border py-1 text-sm px-3 border-black peer-checked/footwear:border-blue-500 peer-checked/footwear:text-blue-500'> Footwear </label>
                        <input type="radio" name="category" value='Accessories' onChange={setCatForSub} className='peer/access' id="sell-category-access" hidden />
                        <label htmlFor="sell-category-access" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/access:border-blue-500 peer-checked/access:text-blue-500'> Accessories </label>
                    </div>
                </div>
                <hr className="w-full mt-2" />
                <div className="mt-2 flex justify-between">
                    <span>Sub Category : </span>
                    <select onChange={handleSetSubbCategory} name="sub-category" className='text-sm border border-black rounded-md py-1' id="">
                        {
                            subCategory.map((data, index) => {
                                return (
                                    <option value={data.name} key={index}>{data.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <hr className="w-full mt-2" />
                <div class="relative mt-2 min-h-6 h-fit items-center w-full justify-between flex">
                    <label className="">
                        Brand Name :
                    </label>
                    <div className='h-full'>
                        {
                            (category == 'Clothing' && (
                                <select onChange={handleBrandInput} name="brand-name" className='border border-black rounded-md px-2 h-full text-sm' id="sell-brand-name-file">
                                    {
                                        ClothBrand.map((data, index) => {
                                            return (
                                                <option value={data} key={index}>{data}</option>
                                            )
                                        })
                                    }
                                </select>
                            ))
                        }
                        {
                            (category == 'FootWear' && (
                                <select onChange={handleBrandInput} name="brand-name" className='border border-black rounded-md px-2 h-full text-sm' id="sell-brand-name-file">
                                    {
                                        ShoesBrand.map((data, index) => {
                                            return (
                                                <option value={data} key={index}>{data}</option>
                                            )
                                        })
                                    }
                                </select>
                            ))
                        }
                    </div>
                </div>
                <hr className="w-full mt-2" />
                <div className="mt-2 flex justify-between">
                    <span>Size : </span>
                    <select onChange={handleSizeChange} className='border border-black rounded-md px-2 py-1 text-sm' name="size" id="">
                        {
                            sizeArray.map((data, index) => {
                                return (
                                    <option value={data} key={index}>{data}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <hr className="w-full mt-2" />
                <div className="mt-2 h-6 items-center justify-between w-full min-w-[200px] flex">
                    <label htmlFor="sell-age">Age: </label>
                    <input onChange={e => setAge(e.target.value)} type="text" name="sell-age" id="sell-age" placeholder='Enter Age' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                </div>
                <hr className="w-full mt-2" />
                <div className="mt-2 h-fit items-center justify-between w-full min-w-[200px] flex">
                    <label htmlFor="sell-link">Link (org product - if any): </label>
                    <input type="text" onChange={e => setProductLink(e.target.value)} name="sell-link" id="sell-link" placeholder='Enter Link' className='h-full border border-black rounded-md ml-2 pl-2 py-1 text-sm' />
                </div>

                {
                    !isRedesigned
                        ?
                        <>
                            <hr className="w-full mt-2" />
                            <div className="mt-2 h-6 items-center w-full justify-between flex">
                                <label htmlFor="sell-old-price">OldPrice: </label>
                                <input onChange={handleOldPrice} type="text" name="sell-old-price" id="sell-old-price" placeholder='Enter Old Price' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                            </div>
                        </>
                        :
                        <>
                            <hr className="w-full mt-2" />
                            <div className="mt-2 h-6 items-center w-full justify-between flex">
                                <label htmlFor="sell-old-price">OldPrice: </label>
                                <input disabled type="text" name="sell-old-price" id="sell-old-price" placeholder='Enter Old Price' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                            </div>
                        </>
                }
                <hr className="w-full mt-2" />
                <div className="mt-2 h-6 items-center w-full justify-between flex">
                    <label htmlFor="sell-new-price">Sell At : </label>
                    <input onChange={e => setNewPrice(e.target.value)} type="text" name="sell-new-price" id="sell-new-price" placeholder='Enter New Price' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                </div>
                <hr className="w-full mt-2" />
                <div className="mt-3 h-6 items-center w-full justify-between flex">
                    <label htmlFor="sell-address">Address : </label>
                    <input onChange={e => setAddress(e.target.value)} type="text" name="sell-address" id="sell-address" placeholder='Enter Address' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                </div>
                <div className="my-3 h-6 items-center w-full justify-between flex">
                    <label htmlFor="sell-note">Note for buyer : </label>
                    <textarea onChange={e => setNoteBuyer(e.target.value)} name="sell-note" id="sell-note" placeholder='Enter note' className='h-full border border-black rounded-md py-2 ml-2 pl-2 text-sm' />
                </div>

            </div>
            <div className='flex-[1] rounded-md bg-white mx-3 px-3 mt-3 py-3 h-fit'>

                <h2>Image Uploader</h2>
                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                    <input type='file' {...getInputProps()} accept="image/*" />
                    {isDragActive ? (
                        <p>Drop the files here...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click here to select files</p>
                    )}
                </div>

                {previewUrls.length > 0 && (
                    <div>
                        <h3>Preview:</h3>
                        {previewUrls.map((url, index) => (
                            <div key={index} className='flex my-2 rounded-md w-full justify-between border border-black px-3 py-2 items-center'>
                                <img src={url} alt={`Preview ${index}`} style={{ width: '40px' }} />
                                <button onClick={() => handleRemoveImage(index)} className='text-white bg-red-600 font-inter text-sm px-2 py-1 rounded-md'>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
                {images.length < 3 && <p className='font-inter text-red-500 text-xs mt-2'>Add atleast 3 images</p>}
                {images.length >= 3 && images.length <= 8 && <button className='text-white bg-purple-600 font-inter text-xs px-2 py-1 rounded-md border border-black' onClick={handleUpload}>Upload</button>}
                {images.length > 8 && <p className='font-inter text-red-500 text-xs mt-2 '>You have reached the maximum limit of 8 images.</p>}

                <button className='text-white bg-purple-600 font-inter text-xs px-2 py-1 rounded-md border border-black' onClick={handleSubmit}>Submit</button>
                {uploadPercentage > 0 && <div className='font-inter text-xs mt-3'>Uploading ({fileCnt} files) : {uploadPercentage} %</div>}
            </div>
        </div>
    )
}

export default Sell