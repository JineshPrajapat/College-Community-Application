const url = `https://api.cloudinary.com/v1_1/dqvkis3qg/auto/upload`;
console.log('Cloudinary URL:', url);

const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","chat-app-file")

    const response = await fetch(url,{
        method : 'post',
        body : formData
    })
    const responseData = await response.json()


    return responseData
}

export default uploadFile