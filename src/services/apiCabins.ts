import { TCabin, TCabinFormData } from "../features/cabins/cabin.types";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(cabinData: TCabinFormData, id?: number) {
  const isImageString =
    typeof cabinData.image === "string" &&
    cabinData.image?.startsWith(supabaseUrl);
  const isEditMode = !!id;

  const { name } = cabinData.image as File;
  const imageName = isImageString
    ? ""
    : `${Math.random()}-${name}`.replaceAll("/", "");

  const imagePath = isImageString
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const payload = { ...cabinData, image: imagePath };

  const query = isEditMode
    ? supabase.from("cabins").update(payload).eq("id", id)
    : supabase.from("cabins").insert([payload]);

  const { data, error } = await query.select().single<TCabin>();

  const action = isEditMode ? "updated" : "created";

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${action}`);
  }

  if (isImageString) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  if (storageError) {
    await deleteCabin(data.id);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
