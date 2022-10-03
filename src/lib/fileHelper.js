import fs from "fs";
import { promisify } from "util";
import path from "path";

class FileHelper {
  constructor(baseName) {
    this._basePath = path.join(__dirname, "../../.data", baseName);
    this._baseFolder = baseName;
    this._validatePath();
  }
  /**
   * @private
   */
  _validatePath() {
    try {
      const pathExist = fs.existsSync(this._basePath);
      if (!pathExist) {
        fs.mkdirSync(this._basePath, {
          recursive: true,
        });
      }
    } catch (error) {
      console.log("error creating folder", error);
    }
  }
  async findAll() {
    try {
      const result = [];
      const dirs = await promisify(fs.readdir)(this._basePath);
      for (const dir of dirs) {
        const data = await promisify(fs.readFile)(
          path.join(this._basePath, "/", dir),
          "utf-8"
        );
        result.push(JSON.parse(data));
      }
      return result;
    } catch (err) {
      console.log("err in reading file ", err);
    }
  }
  async findById(id) {
    try {
      const filePath = path.join(this._basePath, `${id}.json`);
      const result = await promisify(fs.readFile)(filePath, {
        encoding: "utf-8",
        flag: "r+",
      });
      return JSON.parse(result);
    } catch (error) {
      throw new Error("data not found");
    }
  }
  async save(data = {}) {
    try {
      const fileName = path.join(this._basePath, `${data.id}.json`);
      const fd = await promisify(fs.open)(fileName, "w+");
      await promisify(fs.writeFile)(fd, JSON.stringify(data));
    } catch (error) {
      console.log(error);
      throw new Error("error saving your file");
    }
  }
}
export default FileHelper;
