import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contacts() {
  return (
    <div className="px-4 lg:mx-[10%] border-t border-dashed border-gray">
      <div className="py-10 text-center">
        <div
          id="contact"
          className="text-4xl lg:text-[32px] font-bold"
        >
          Contact Us
        </div>
        <div className="py-4 "
        ></div>
        
        {/* Phone Number */}
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <FaPhoneAlt className="text-xl" />
          <span className="text-sm">0964-180-5940</span>
        </div>
        
        {/* Email */}
        <div className="flex items-center justify-center space-x-2 text-gray-600 mt-4">
          <FaEnvelope className="text-xl" />
          <span className="text-sm">yukimitoilo@gmail.com</span>
        </div>
        
        {/* Address */}
        <div className="flex items-center justify-center space-x-2 text-gray-600 mt-4">
          <FaMapMarkerAlt className="text-xl" />
          <span className="text-sm">
            SWAN ROSE BUILDING (2nd floor), 63 Commission Civil Street, Jaro, Iloilo City, 5000
          </span>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
