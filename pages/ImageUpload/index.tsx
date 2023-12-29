import React, { useState } from "react";
import Image from 'next/image'

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.NEXT_CLOUDINARY_UPLOAD_PRESET||"ec2bnqhl"
      
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setUrl(res.public_id);
      console.log('----- seturl',res.public_id)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
    const obj = document.getElementById("hidden-input");
    obj.value = "";
  };

  return (
    <div className="sm:py-4">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border border-gray-400 rounded-lg py-12 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center dark:text-white">
            <span>Choose a File to Upload</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          {!preview &&<label htmlFor="hidden-input" className="cursor-pointer">
            <div  className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4" > 
              Upload a file
            </div>
          </label>}

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" className="w-full" />}
          </div>
          <div className="flex justify-end pb-8 pt-6 gap-4">
{preview&&<> <button
            onClick={uploadImage}
            className="pointer z-10 mt-6 rounded-lg border border-blue-700 bg-blue-700 text-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
            disabled={!image}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="pointer z-10 mt-6 rounded-lg border border-red-700 bg-red-700 hover:bg-red-500 text-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
          >
            Reset
          </button></>}
         

        </div>
        </header>

      </div>
    </div>
  );
};

export default ImageUpload;
