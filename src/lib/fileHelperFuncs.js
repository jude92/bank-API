import fs from "fs";
import { promisify } from "util";
import path from "path";

const fileHelper = (folderPath) => {
  const _basePath = path.join(__dirname, "../../.data", folderPath);
  const _baseFolder = folderPath;
  const validatePath = () => {
    try {
      let internalPath = path.join(_basePath);

      const pathExist = fs.existsSync(internalPath);
      if (!pathExist) {
        fs.mkdirSync(internalPath, {
          recursive: true,
        });
      }
    } catch (error) {
      console.log("error creating folder", error);
    }
  };

  const findAll = async () => {
    try {
      const result = [];
      const dirs = await promisify(fs.readdir)(_basePath);
      for (const dir of dirs) {
        const data = await promisify(fs.readFile)(
          path.join(_basePath, "/", dir),
          "utf-8"
        );
        result.push(JSON.parse(data));
      }
      return result;
    } catch (err) {
      console.log("err in reading file ", err);
    }
  };
  const findById = async (id) => {
    try {
      const filePath = path.join(_basePath, `${id}.json`);
      const result = await promisify(fs.readFile)(filePath, {
        encoding: "utf-8",
        flag: "r+",
      });
      return JSON.parse(result);
    } catch (error) {
      throw new Error("data not found");
    }
  };
  const save = async (data = {}) => {
    try {
      const fileName = path.join(_basePath, `${data.id}.json`);
      const fd = await promisify(fs.open)(fileName, "w+");
      await promisify(fs.writeFile)(fd, JSON.stringify(data));
    } catch (error) {
      console.log(error);
      throw error("error saving your file");
    }
  };
  validatePath();
  return { save, findAll, findById };
};

export default fileHelper;
