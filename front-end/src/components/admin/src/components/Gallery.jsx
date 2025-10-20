import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Upload, Trash2, ImageIcon, Plus } from "lucide-react";

export default function GalleryAdmin() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleries, setGalleries] = useState([]);
   const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  // Fetch gallery data
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/gallery`);
      setGalleries(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Preview image before upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  // Upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !category || !file)
      return Swal.fire("Error", "Please fill all fields", "warning");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", file);

      const res = await axios.post(`${SERVER_URL}/gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Image uploaded successfully!", "success");
      console.log("Uploaded:", res.data);

      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      fetchGallery();
    } catch (err) {
      console.error("Upload error:", err);
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (id, title) => {
    Swal.fire({
      title: `Delete "${title}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${SERVER_URL}/gallery/${id}`);
          setGalleries((prev) => prev.filter((g) => g.id !== id));
          Swal.fire("Deleted!", `"${title}" removed successfully.`, "success");
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire("Error", "Failed to delete image", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            Gallery Management
          </h1>
          <p className="text-slate-600 mt-2">Upload and manage gallery images</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Image
          </h2>

          <form onSubmit={handleUpload}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter image title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Nature, Real Estate, Architecture"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="gallery-upload"
                    />
                    <label
                      htmlFor="gallery-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                      <Upload className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-600">
                        {file ? file.name : "Choose an image file"}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? "Uploading..." : "Upload Image"}
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Section */}
              <div className="flex items-center justify-center">
                {preview ? (
                  <div className="w-full">
                    <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-500">Image preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Gallery Display Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Uploaded Gallery ({galleries.length})
          </h2>

          {galleries.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-lg">No images uploaded yet</p>
              <p className="text-slate-400 text-sm">Upload your first image above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((g) => (
                <div
                  key={g.id}
                  className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={`${SERVER_URL}${g.image}`}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 truncate">{g.title}</h3>
                    <p className="text-slate-500 text-sm mb-3">{g.category}</p>
                    <button
                      onClick={() => handleDelete(g.id, g.title)}
                      className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
