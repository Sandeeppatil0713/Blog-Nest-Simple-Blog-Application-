const ImageKit = require('@imagekit/nodejs');
const imagekit = new ImageKit({
    privateKey:"private_iEMVPV+QI/HHQTznHqIY4VLtPEE="
})

async function uploadFile(buffer){
    const result= await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName:"image.jpg"
    })
    return result;
}

module.exports= uploadFile;