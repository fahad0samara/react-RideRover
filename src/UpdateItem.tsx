import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload, AiOutlineReload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdClose } from 'react-icons/md';
import { useDarkMode } from './hooks/useDarkMode';
import API_URL from './apiConfig';

interface UpdateMenuItemFormProps {
  itemId: string;
  initialValues: {
    name?: string;
    price?: string;
    description?: string;
    image?: string; // Add image property
  };
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateMenuItemForm: React.FC<UpdateMenuItemFormProps> = ({
  itemId,
  initialValues,
  onClose,
  onUpdate,
}) => {
  const isDarkMode = useDarkMode();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(initialValues.image || null);

  useEffect(() => {
    if (initialValues) {
      const {
        name,
        price,
        description,
        image // Add image here
      } = initialValues;
      setName(name || '');
      setPrice(price || '');
      setDescription(description || '');
    }
  }, [initialValues]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!price) {
      errors.price = 'Price is required';
    } else if (isNaN(parseFloat(price))) {
      errors.price = 'Price must be a number';
    }
    if (!description.trim()) {
      errors.description = 'Description is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/bikes/${itemId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      toast.success('Menu Item Updated Successfully');
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="fixed transition-all duration-300 inset-0 flex items-center justify-center z-50">
      <div
        className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-50`}
      ></div>
      <div
        className={`rounded-lg shadow-lg relative flex flex-col w-full max-w-xl mx-auto px-4 py-6 z-50 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
        }`}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-600 focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4 items-center flex flex-col">
            <label className="block font-medium mb-2 cursor-pointer" htmlFor="image">
              Image:
            </label>
            <label
              htmlFor="image"
              className="relative cursor-pointer border-dashed border-2 border-gray-400 rounded-full h-20 w-20 overflow-hidden inline-block"
            >
              <input
                key={image ? image.name : ''}
                className="h-full w-full opacity-0 text-sm cursor-pointer"
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <div className="absolute top-0 left-0 w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Selected image preview"
                    className="h-full w-full object-center rounded-full"
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-full"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute w-14 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center justify-center">
                    <AiOutlineCloudUpload className="w-12 h-12 text-gray-600" />
                  </div>
                </div>
              )}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`
                  w-full
                  px-4
                  py-2
                  border
                  rounded-md
                  ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}
                  mt-2
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}
                  rounded-lg
                  shadow-sm
                  focus:border-blue-500
                  focus:outline-none
                  focus:ring-blue-500
                `}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
              price
              </label>
              <input
                id="name"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`
                  w-full
                  px-4
                  py-2
                  border
                  rounded-md
                  ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}
                  mt-2
                  ${errors.price ? 'border-red-500' : 'border-gray-300'}
                  rounded-lg
                  shadow-sm
                  focus:border-blue-500
                  focus:outline-none
                  focus:ring-blue-500
                `}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`
                w-full
                px-4
                py-2
                border
                rounded-md
                ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}
                mt-2
                ${errors.description ? 'border-red-500' : 'border-gray-300'}
                rounded-lg
                shadow-sm
                focus:border-blue-500
                focus:outline-none
                focus:ring-blue-500
              `}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
      
          <button
            type="submit"
            className="mt-2 w-full  py-2 bg-green-400 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-i[#caacfb]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <AiOutlineReload className="animate-spin h-5 w-5 mr-3" />
                <span>Updating...</span>
              </div>
            ) : (
              'Update'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuItemForm;
