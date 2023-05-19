import Minio from "minio";

const minioClient = new Minio.Client({
    endPoint: "localhost",
    port: 9090,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY as unknown as string,
    secretKey: process.env.MINIO_SECRET_KEY as unknown as string
})

console.log(minioClient);