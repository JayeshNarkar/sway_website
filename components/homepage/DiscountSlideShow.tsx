"use client";
export default function DiscountSlideShow() {
  return (
    <>
      <div className="h-[78.8px] bg-gradient-to-t from-rose-300 via-pink-400 to-purple-500" />
      <div className="relative h-16 py-2 border-y-2 border-gray-500 bg-gradient-to-r from-rose-300 via-pink-400 to-purple-500 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full flex items-center">
          <div className="animate-slide whitespace-nowrap text-2xl font-bold">
            <span className="text-black bg-white px-4 py-2 mx-2 rounded-lg">
              HOT DEAL!
            </span>
            <span className="text-white bg-gray-800 px-4 py-2 mx-2 rounded-lg">
              LIMITED TIME OFFER
            </span>
            <span className="text-rose-600 bg-white px-4 py-2 mx-2 rounded-lg">
              UPTO 15% DISCOUNT
            </span>
            <span className="text-white bg-black px-4 py-2 mx-2 rounded-lg">
              ONLY FOR LIMITED TIME
            </span>

            <span className="text-black bg-white px-4 py-2 mx-2 rounded-lg">
              HOT DEAL!
            </span>
            <span className="text-white bg-gray-800 px-4 py-2 mx-2 rounded-lg">
              LIMITED TIME OFFER
            </span>
            <span className="text-rose-600 bg-white px-4 py-2 mx-2 rounded-lg">
              UPTO 15% DISCOUNT
            </span>
            <span className="text-white bg-black px-4 py-2 mx-2 rounded-lg">
              ONLY FOR LIMITED TIME
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
