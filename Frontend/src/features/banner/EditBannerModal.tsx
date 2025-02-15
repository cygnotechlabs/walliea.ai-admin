import Modal from "../../components/Modal";
import file from "../../assets/images/attachment_7515515 1.png";
import { ChangeEvent, useEffect, useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";
import useApi from "../../hooks/useApi";
import { endponits } from "../../services/apiEndpoints";
import { BannerType } from "../../types/BannerType ";
import { useBannerContext } from "../../context/BannerContext";
import toast from "react-hot-toast";

type Props = {
  page?: string;
  banner: BannerType;
};

interface InputData {
  title: string;
  image: string;
  url: string;
  subtitle:string;
}

function EditBannerModal({ page, banner }: Props) {
  const { updateBannerInState } = useBannerContext();
  const [inputData, setInputData] = useState<InputData>({
    title: "",
    image: "",
    url: "",
    subtitle:"",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const { request: updateBanner } = useApi("put");

  useEffect(() => {
    if (isModalOpen && banner) {
      setInputData({
        title: banner.title || "",
        image: banner.image || "",
        url: banner.url || "",
        subtitle: banner.subtitle || "",
      });
    }
  }, [isModalOpen, banner]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputData({
          ...inputData,
          [field]: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 5MB");
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInputData({
      title: "",
      image: "",
      url: "",
      subtitle:"",
    });
  };

  const handleSave = async () => {
    try {
      const url = `${endponits.UPDATE_BANNER}/${banner._id}`;
      const { response, error } = await updateBanner(url, inputData);
      if (!error && response) {
        toast.success(response.data.message || "Banner updated successfully!");
        updateBannerInState(response.data.banner);
        closeModal();
      } else {
        toast.error("Error updating banner.");
        console.error("Error updating banner:", error);
      }
    } catch (error) {
      toast.error("Unexpected error occurred.");
      console.error("Error in handleSave:", error);
    }
  };

  return (
    <>
      <div onClick={openModal} className="cursor-pointer">
        <EditIcon />
      </div>
      <Modal
        open={isModalOpen}
        className="p-9 rounded-[8px] w-[63.4%]"
        onClose={closeModal}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#303F58] text-xl font-bold">
              {page === "bannerTop" ? "Edit Banner Top" : "Edit Banner Bottom"}
            </p>
            <p className="text-[#818182] text-sm">
              A manual journal is a handwritten ledger entry for recording
              financial transactions.
            </p>
          </div>
          <div
            className="text-3xl font-thin cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </div>
        </div>
        <div>
          <div className="mt-6">
            <label className="block text-sm mb-2 text-textColor">Title</label>
            <input
              value={inputData.title}
              onChange={handleInputChange}
              type="text"
              name="title"
              placeholder="Flat 30% off on all plywoods"
              className=" border-[#CECECE] w-full text-sm border rounded p-2 pl-4"
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm mb-4 text-textColor">
              Upload Image
            </label>
            <div
              className="bg-white px-6 py-8 h-[8.9375rem] border-2 border-dashed border-[#818894] flex flex-col justify-center items-center rounded-lg cursor-pointer"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              {inputData.image ? (
                <div>
                  <img
                    src={inputData.image}
                    alt="Uploaded"
                    className="py-0 h-16 w-32 object-cover"
                  />
                </div>
              ) : (
                <>
                  <img src={file} className="w-8 mb-3" alt="Upload Icon" />
                  <p className="text-textColor text-sm font-semibold">
                    Upload Image
                  </p>
                </>
              )}

              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "image")}
              />
              <p className="text-[0.625rem] text-[#4B5C79] mt-1">
                Maximum File Size: 5 MB
              </p>
              <p className="text-[0.625rem] text-[#4B5C79]">
                Supported Format: JPEG, PNG
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm mb-2 text-textColor">Sub Title</label>
            <input
              value={inputData.subtitle}
              onChange={handleInputChange}
              type="text"
              name="subtitle"
              placeholder="Terms & Condition Apply"
              className=" border-[#CECECE] w-full text-sm border rounded p-2 pl-4"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm mb-2 text-textColor">URL</label>
            <input
              value={inputData.url}
              onChange={handleInputChange}
              type="text"
              name="url"
              placeholder="https://www.example.com/products/plywood"
              className=" border-[#CECECE] w-full text-sm border rounded p-2 pl-4"
            />
          </div>

          <div className="mt-6">
            <div className="space-x-7 flex justify-end">
              <button
                onClick={closeModal}
                className="text-sm text-[#565148] border border-[#565148] rounded-md h-[2.375rem] w-[7.5rem]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-sm text-[#FEFDF9] bg-[#102C21] rounded-md h-[2.375rem] w-[7.5rem]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditBannerModal;
