export function uploadImage(req, res) {
  res.json({
    message: "Uploaded successfully",
    file: req.file
  });
}
