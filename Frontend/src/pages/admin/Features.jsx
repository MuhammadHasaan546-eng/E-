import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductImageUpload from "@/components/admin/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { 
  addFeatureImage, 
  getFeatureImages, 
  deleteFeatureImage,
  updateFeatureImage
} from "@/api/common/feature";
import { toast } from "sonner";
import { ImagePlus, Trash2, LayoutPanelTop } from "lucide-react";

const AdminFeatures = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  
  const dispatch = useDispatch();
  const { featureImageList, isLoading } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (!uploadImageUrl) {
      toast.error("Please upload an image first");
      return;
    }
    
    if (!title.trim() || !subtitle.trim()) {
      toast.error("Banner title and subtitle are required");
      return;
    }
    
    const payload = { image: uploadImageUrl, title, subtitle };
    
    if (editingId) {
      dispatch(updateFeatureImage({ id: editingId, ...payload })).then((data) => {
        if (data.payload.success) {
          dispatch(getFeatureImages());
          resetForm();
          toast.success("Banner updated successfully");
        }
      });
    } else {
      dispatch(addFeatureImage(payload)).then((data) => {
        if (data.payload.success) {
          dispatch(getFeatureImages());
          resetForm();
          toast.success("Banner added successfully");
        }
      });
    }
  }

  function resetForm() {
    setImageFile(null);
    setUploadImageUrl("");
    setTitle("");
    setSubtitle("");
    setEditingId(null);
  }

  function handleEditClick(featureItem) {
    setEditingId(featureItem._id);
    setUploadImageUrl(featureItem.image);
    setTitle(featureItem.title || "");
    setSubtitle(featureItem.subtitle || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDeleteFeatureImage(id) {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      dispatch(deleteFeatureImage(id)).then((data) => {
        if (data.payload.success) {
          dispatch(getFeatureImages());
          toast.success("Banner deleted successfully");
        }
      });
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="w-full h-full p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Banner Management
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Upload and manage images for the home page hero section.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "Update Banner Details" : "Upload New Banner"}
            </h2>
          </div>
          {editingId && (
            <Button variant="ghost" className="text-xs text-gray-400" onClick={resetForm}>
              Cancel Edit
            </Button>
          )}
        </div>
        
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadImageUrl={uploadImageUrl}
          setUploadUrl={setUploadImageUrl}
          setImageUploadLoading={setImageUploadLoading}
          ImageUploadLoading={imageUploadLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Banner Title</Label>
            <Input 
              placeholder="Enter banner title (e.g. Summer Sale)" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-700">Banner Subtitle</Label>
            <Input 
              placeholder="Enter banner description" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="rounded-xl border-gray-200 focus:border-[#d4af37] focus:ring-[#d4af37]/20"
            />
          </div>
        </div>
        
        <Button
          onClick={handleUploadFeatureImage}
          disabled={!uploadImageUrl || imageUploadLoading}
          className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {imageUploadLoading ? "Uploading..." : editingId ? "Save Changes" : "Add to Hero Section"}
        </Button>
      </div>

      {/* Current Banners Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <LayoutPanelTop className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-bold text-gray-900">Current Hero Banners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((featureItem) => (
              <div 
                key={featureItem._id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={featureItem.image}
                  alt="Banner"
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-4 border-t border-gray-50 bg-gray-50/30">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {featureItem.title || <span className="text-gray-300 italic">No Title</span>}
                  </h3>
                  <p className="text-[10px] text-gray-500 truncate mt-1">
                    {featureItem.subtitle || <span className="text-gray-300 italic">No Subtitle</span>}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                   <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white border-0 rounded-full h-10 w-10 p-0 shadow-lg transform hover:scale-110 transition-transform"
                    onClick={() => handleEditClick(featureItem)}
                   >
                     <ImagePlus className="w-4 h-4 text-gray-900" />
                   </Button>
                   <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full shadow-lg transform hover:scale-110 transition-transform h-10 w-10 p-0"
                    onClick={() => handleDeleteFeatureImage(featureItem._id)}
                   >
                     <Trash2 className="w-4 h-4" />
                   </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
              <LayoutPanelTop className="w-12 h-12 text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium text-lg">No banners found</p>
              <p className="text-gray-400 text-sm">Upload your first banner above to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeatures;

