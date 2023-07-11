import { readFiles } from 'h3-formidable';
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
    const { files: { photo } } = await readFiles(event, {
        includeFields: true
    });

    const file = photo[0];
    const { filepath, mimetype } = file;
    const name = file.originalFilename;

    // let image = String(Date.now()) + String(Math.round(Math.random() * 10000000));
    let newPath = `${path.join("public", "uploads", name)}`;
    fs.copyFileSync(filepath, newPath);


    return { success: true };
});
