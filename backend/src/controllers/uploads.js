import ImageModel from "../model/Images.js";

export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Provide Image First" });
  }

  try {
    const newImage = new ImageModel({
      path: req.file.path,
      fileName: req.file.filename   // use `filename`, not `fileName`
    });

    await newImage.save();

    res.json({
      message: "Uploaded successfully",
      file: {
        url: `/uploads/${req.file.filename}`, // frontend can use this URL
        fileName: req.file.filename
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving image", error });
  }
}
