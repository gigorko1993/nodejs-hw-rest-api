const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class UploadFileAvatar {
  constructor(destination) {
    this.destination = destination;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async save(filePath, idUser) {
    const { public_id: returnIdAvatarUser, secure_url: avatarUrl } =
      await this.uploadCloud(filePath, {
        public_id: idUserCloud,
        folder: this.destination,
        transformation: { width: 250, height: 250, crop: "pad" },
      });
    return {
      avatarUrl: avatarUrl,
      returnIdAvatarUser: returnIdAvatarUser.replace(
        `${this.destination}/`,
        ""
      ),
    };
  }
}

module.exports = UploadFileAvatar;
