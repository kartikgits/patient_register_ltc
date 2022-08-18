const fs = require('fs');

const getUrlFromImage = (image) => {
    try {
        // Decoding base-64 image
        function decodeBase64Image(dataString) {
            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            var response = {};

            if (matches.length !== 3) 
            {
                throw new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = Buffer.from(matches[2], 'base64');

            return response;
        }

        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageTypeRegularExpression = /\/(.*?)$/;      

        // Generate random string
        var crypto = require('crypto');
        var seed = crypto.randomBytes(20);

        var base64Data = image;

        var imageBuffer = decodeBase64Image(base64Data);

        // This variable is actually an array which has 5 values,
        // The [1] value is the real image extension
        var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

        // If imageTypeDetected[1] is not an image extension, throw error
        if (!imageTypeDetected || imageTypeDetected[1] !== 'jpeg' && imageTypeDetected[1] !== 'png' && imageTypeDetected[1] !== 'jpg') {
            throw new Error('Invalid image type: Only JPEG, PNG and JPG images are accepted');
        }

        // Check image size, if bigger than 2MB or smaller than 1KB, throw error
        if (imageBuffer.data.length > 2000000 || imageBuffer.data.length < 1000) {
            throw new Error('Image size should not be bigger than 2MB or smaller than 1KB');
        }

        var uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');

        var patientProfileImagesLocation = 'public/uploads/profiles/';

        var uniqueRandomImageName = 'image-' + uniqueSHA1String;


        var userUploadedImagePath = patientProfileImagesLocation + 
                                        uniqueRandomImageName +
                                        '.' + 
                                        imageTypeDetected[1];

        // Save decoded binary image to disk
        try {
            // Create userUploadedImagePath directory if doesn't exist
            if (!fs.existsSync(patientProfileImagesLocation)) {
                fs.mkdirSync('public/uploads/profiles');
            }
            fs.writeFileSync(userUploadedImagePath, imageBuffer.data);
            return userUploadedImagePath;
        } catch(error) {
            throw new Error('Error occurred while writing image to disk');
        }

    } catch(error) {
        throw new Error('Error occurred while decoding base64 image');
    }
}

module.exports = {
    getUrlFromImage: getUrlFromImage
}