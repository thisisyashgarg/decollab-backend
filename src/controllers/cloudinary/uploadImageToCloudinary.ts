import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";

export default async function uploadImageToCloudinary(
  req: Request,
  res: Response
) {
  try {
    const { fileString, userId } = req.body;
    const uploadedResponse = await cloudinary.uploader.upload(fileString, {
      //   folder: "decollab",
      resource_type: "auto",
      // public_id: `${userId}`,
      upload_preset: "decollab",
    });
    // console.log(req.body);
    console.log("done");
    console.log(uploadedResponse.secure_url);
  } catch (error) {
    res.status(400).json({ err: error });
  }
}
