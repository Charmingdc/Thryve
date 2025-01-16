const uploadUserDp = async (file) => {
  const formData = new FormData();

  try {
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    
    if(!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (err) {
    console.error(err.message);
  }
};


export default uploadUserDp;