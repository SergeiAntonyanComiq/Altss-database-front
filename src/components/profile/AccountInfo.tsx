import React, { useRef, useState } from "react";

interface AccountInfoProps {
  formData: {
    firstName: string;
    secondName: string;
    email: string;
    website: string;
    companyName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarUrl?: string;
  onAvatarUpload: (file: File) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ 
  formData, 
  onChange, 
  avatarUrl, 
  onAvatarUpload 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type client-side as well
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPEG, PNG, or GIF image.");
      return;
    }
    
    // Call parent handler
    onAvatarUpload(file);
    
    // Reset input value to allow re-uploading the same file if needed
    event.target.value = '';
  };

  return (
    <div className="flex w-full gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
      <div className="flex min-w-60 flex-col items-stretch px-4 max-md:max-w-full">
        <h2 className="min-h-11 text-xl text-[rgba(17,25,40,1)] font-bold">Account Information</h2>
        <div className="flex gap-[40px_48px] text-base text-[rgba(99,115,129,1)] mt-2 max-md:max-w-full">
          <div className="min-w-60 pt-2 max-md:max-w-full">
            <div className="flex min-h-[38px] items-center gap-8 max-md:max-w-full">
              <label className="font-medium leading-none self-stretch w-[180px] my-auto">First Name</label>
              <div className="self-stretch min-w-60 font-normal whitespace-nowrap w-[250px] my-auto">
                <input 
                  className="bg-white border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChange}
                />
              </div>
            </div>
            
            <div className="flex min-h-[38px] items-center gap-8 mt-6 max-md:max-w-full">
              <label className="font-medium leading-none self-stretch w-[180px] my-auto">Second Name</label>
              <div className="self-stretch min-w-60 font-normal whitespace-nowrap w-[250px] my-auto">
                <input 
                  className="bg-white border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                  name="secondName"
                  value={formData.secondName}
                  onChange={onChange}
                />
              </div>
            </div>
            
            <div className="flex min-h-[38px] items-center gap-8 whitespace-nowrap mt-6 max-md:max-w-full">
              <div className="self-stretch flex items-center gap-1.5 overflow-hidden font-medium leading-none w-[180px] my-auto">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54?placeholderIfAbsent=true" 
                  alt="Email icon" 
                  className="aspect-[1.33] object-contain w-4 fill-[#0145C7] stroke-[0.025px] stroke-[#4745E4] self-stretch shrink-0 my-auto"
                />
                <label>Email</label>
              </div>
              <div className="self-stretch min-w-60 font-normal w-[250px] my-auto">
                <input 
                  className="bg-gray-100 border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid cursor-not-allowed"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onChange}
                  readOnly
                />
              </div>
            </div>
            
            <div className="flex min-h-[38px] items-center gap-8 whitespace-nowrap mt-6 max-md:max-w-full">
              <div className="self-stretch flex items-center gap-1.5 overflow-hidden font-medium leading-none w-[180px] my-auto">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/cd92f920e97cacc9ab10b6334ee3ca5a3c84c154?placeholderIfAbsent=true" 
                  alt="Website icon" 
                  className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                />
                <label>Website</label>
              </div>
              <div className="self-stretch min-w-60 font-normal w-[250px] my-auto">
                <input 
                  className="bg-white border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={onChange}
                />
              </div>
            </div>
            
            <div className="flex min-h-[38px] items-center gap-8 mt-6 max-md:max-w-full">
              <label className="font-medium leading-none self-stretch w-[180px] my-auto">Company Name</label>
              <div className="self-stretch min-w-60 font-normal w-[250px] my-auto">
                <input 
                  className="bg-white border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                  name="companyName"
                  value={formData.companyName}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/gif"
          style={{ display: 'none' }}
        />
        <div className="relative">
          <img 
            src={avatarUrl || "https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/446c16c3e646ab75dd4138e42502eb4358eb6fbe?placeholderIfAbsent=true"}
            alt="Profile Avatar" 
            className={`aspect-[0.99] object-cover w-[282px] h-[282px] min-w-60 rounded-lg cursor-pointer ${isHovering ? 'opacity-70' : ''} transition-opacity`}
            onClick={handlePhotoClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
          {isHovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white bg-opacity-70 px-3 py-2 rounded-md text-gray-800 font-medium">
                Change profile photo
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo; 