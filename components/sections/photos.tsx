function Photos() {
    return (
      <div id="photos" className="px-4 lg:mx-[10%] border-t border-dashed border-gray">
        <div className="py-10 text-center">
          <div
            
            className="text-4xl lg:text-[64px] font-bold"
          >
            <div className="text-secondary">Capturing the Joy </div>
            <div className="leading-tight">Of Your Pets</div>
          </div>
  
          {/* 3x3 grid of photos */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1449-1.jpg"
              alt="Pet Photo 1"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1453-1.jpg"
              alt="Pet Photo 2"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1446-1.jpg"
              alt="Pet Photo 3"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1440-1.jpg"
              alt="Pet Photo 4"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1438-1.jpg"
              alt="Pet Photo 5"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1445-1.jpg"
              alt="Pet Photo 6"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1436-1.jpg"
              alt="Pet Photo 7"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1457-1.jpg"
              alt="Pet Photo 8"
              className="w-full h-60 object-cover"
            />
            <img
              src="https://yukimito.wordpress.com/wp-content/uploads/2024/12/img_1452-1.jpg"
              alt="Pet Photo 9"
              className="w-full h-60 object-cover"
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default Photos;
  