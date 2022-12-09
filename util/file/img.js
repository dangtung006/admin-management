const {info, convert, thumbnail } = require("easyimage");

class ImgLib {

    constructor(){

    }

    async getImgInfo(){
        try {
            const imageInfo = await info("/path/to/image.jpg");
            return imageInfo;
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async convertImg(){
        try {
            await convert({
                src: "/path/to/source.jpg",
                dst: "/path/to/dest.png",
            });

        } catch (e) {
            console.log("Error: ", e);
        }
    }

    async getThumnailImg(){
        
        try {
            const thumbnailInfo = await thumbnail({
                src: "/path/to/source.jpg",
                width: 100,
                height: 100,
            });

            console.log("Thumbnail is at: " + thumbnailInfo.path);
            return thumbnailInfo; 
            
        } catch (e) {
            console.log("Error: ", e);
        }
    }

}

module.exports = ImgLib
