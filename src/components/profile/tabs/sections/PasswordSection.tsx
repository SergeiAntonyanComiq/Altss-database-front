import React from "react";

interface PasswordSectionProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="w-full max-w-[1095px] mt-12 px-4 max-md:max-w-full max-md:mt-10">
      <h2 className="min-h-11 w-[810px] max-w-full text-xl text-[rgba(17,25,40,1)] font-bold whitespace-nowrap">
        Password
      </h2>
      <div className="flex w-full gap-[40px_48px] text-base mt-2 max-md:max-w-full">
        <div className="flex min-w-60 w-full flex-col flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="flex min-h-[38px] items-center gap-8 text-[rgba(99,115,129,1)] max-md:max-w-full">
            <label className="font-medium leading-none self-stretch w-[180px] my-auto">
              Current password
            </label>
            <div className="self-stretch min-w-60 font-normal whitespace-nowrap w-[250px] my-auto">
              <input
                placeholder="********"
                className="bg-white border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex min-h-[38px] items-center gap-8 text-[rgba(99,115,129,1)] mt-6 max-md:max-w-full">
            <label className="font-medium leading-none self-stretch w-[180px] my-auto">
              New password
            </label>
            <div className="self-stretch min-w-60 font-normal whitespace-nowrap w-[250px] my-auto">
              <input
                placeholder="********"
                className="bg-white border flex min-h-[38px] w-full items-center text-[#111928] gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex min-h-[38px] items-center gap-8 mt-6 max-md:max-w-full">
            <label className="text-[rgba(99,115,129,1)] font-medium leading-none self-stretch w-[180px] my-auto">
              Re-type new pass.
            </label>
            <div className="self-stretch min-w-60 text-gray-400 font-normal w-[250px] my-auto">
              <input
                className="bg-white border flex min-h-[38px] w-full items-center text-gray-400 gap-2.5 pl-5 pr-4 py-[7px] rounded-md border-[rgba(223,228,234,1)] border-solid"
                type="password"
                name="confirmPassword"
                placeholder="type here..."
                value={formData.confirmPassword}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PasswordSection };
