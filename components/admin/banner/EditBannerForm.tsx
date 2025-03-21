"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Editbanner, RemoveBanner } from "./EditBanner";

interface Banner {
  image: {
    url: string;
  };
  url: string;
  id: number;
}

interface EditBannerFormProps {
  banner: Banner;
  cldName: string;
}

function EditBannerForm({ banner, cldName }: EditBannerFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bannerUrl: banner.url,
  });
  const router = useRouter();

  const handleUpdateBanner = async () => {
    setLoading(true);
    try {
      const response = await Editbanner(banner.id, formData.bannerUrl);

      if (response.status === 200) {
        router.refresh();
        setSuccessMessage("Banner updated successfully!");
      } else {
        setErrorMessage("Failed to update banner");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while updating the banner");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBanner = async () => {
    setLoading(true);
    try {
      const response = await RemoveBanner(banner.id);
      if (response.status === 200) {
        router.refresh();
      } else {
        setErrorMessage("Failed to remove banner");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while removing the banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[300px] p-4 border rounded-lg shadow-md bg-white flex flex-col">
      <div className="mb-2">
        <p>Banner Redirect URL:</p>
        <Input
          value={formData.bannerUrl}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bannerUrl: e.target.value }))
          }
          disabled={loading}
        />
      </div>
      <div className="">
        <p>Current Banner Image:</p>
        <img
          src={`https://res.cloudinary.com/${cldName}/image/upload/q_auto/f_auto/${banner.image.url}`}
          alt="Banner Image"
          className="w-full h-auto object-cover mb-2"
        />
      </div>

      <Button
        onClick={handleUpdateBanner}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white m-2"
      >
        Update Banner
      </Button>
      <Button
        onClick={handleRemoveBanner}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white m-2"
      >
        Remove Banner
      </Button>
      {errorMessage && (
        <p className="text-center text-red-500 mt-2">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-center text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
}

export default EditBannerForm;
