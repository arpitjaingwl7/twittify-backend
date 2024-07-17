import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
    cloud_name: 'drvte6vah', 
    api_key: '149152169691185', 
    api_secret: 'xMtc8fP9vHvti0zG5kFDQQ_g0kA' // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary=async(localFilePath)=>{

    try {

    const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})

      console.log("photo has been uploaded "+ response.url)
        return response
    } catch (error) {
       fs.unlinkSync(localFilePath)   
    }

}

export default uploadOnCloudinary