export default class ImageService {
  static convertToBase64(buffer: string, mimetype: string): string {
    const b64 = Buffer.from(buffer).toString("base64");
    let dataURI = `data:${mimetype};base64,${b64}`;
    return dataURI;
  }
}
