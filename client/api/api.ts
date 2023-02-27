import axios from "axios";
// import S3 from "aws-sdk/client/s3";
// axios.get(encodeURI("https://musicplatform.s3.eu-central-1.amazonaws.com/picture/1fe53805-cdec-4093-ba5e-67f517adf331.png"),{
//     responseType: 'arraybuffer',
// })
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: process.env.REGION,
    signatureVersion: "v4",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});

export default async function getInitialProps(file: File) {
    try {
        const fileParams = {
            Bucket: process.env.BUCKET,
            Key: file.name,
            ContentType: file.type,
        }
        const url = await s3.getSignedUrlPromise("getObject", fileParams);

        // await axios.get("https://musicplatform.s3.eu-central-1.amazonaws.com/picture/54e9def8-e08b-450e-87cf-ab489d3b0990.jpg");

        // please note that the responseType is stream
        const res = await axios.get(url, {
            responseType: 'stream',
        });

        // receive the data as a read stream
        const istream = res.data;

        // create a write stream with the path including file name and its extension that you want to store the file in your directory.
        const ostream = fs.createWriteStream(file.type);

        // using node.js pipe method to pipe the writestream
        istream.pipe(ostream);
    }
    catch (err){
        throw err;
    }

    //
    // // The id from the route (e.g. /img/abc123987)
    // let filename = "7d2f1c98-5b99-49e8-8fb4-0630df1f1cf3.jpg";
    //
    // const params = {
    //     Bucket: process.env.BUCKET,
    //     Key: "picture/7d2f1c98-5b99-49e8-8fb4-0630df1f1cf3.jpg" + filename,
    // };
    //
    // const res = await new Promise((resolve, reject) => {
    //     s3.getObject(params, (err, data) => {
    //         if (err) reject(err);
    //         let imgData = 'data:image/jpeg;base64,' + data.Body.toString('base64');
    //         resolve(imgData);
    //     });
    // });


}

// const instance = axios.create({
//     baseURL: "http://localhost:5000/",
//     withCredentials: true,
//     headers: {
//         "API-KEY": "8ae06c9d-040e-448f-b487-fe6bad0de921"
//     }
// })