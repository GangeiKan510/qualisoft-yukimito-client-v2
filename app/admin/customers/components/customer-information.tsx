import React from 'react';

interface CustomerInformationProps {
  onDelete: (customer: any) => void;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ onDelete }) => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: 'Jaro' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: 'Lapaz' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-789-1234', address: 'Villa' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Customer ID</th>
            <th className="p-4 font-semibold text-gray-600">Name</th>
            <th className="p-4 font-semibold text-gray-600">Email</th>
            <th className="p-4 font-semibold text-gray-600">Phone Number</th>
            <th className="p-4 font-semibold text-gray-600">Address</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}
            >
              <td className="p-4 text-gray-800">{customer.id}</td>
              <td className="p-4 text-gray-800">{customer.name}</td>
              <td className="p-4 text-gray-800">{customer.email}</td>
              <td className="p-4 text-gray-800">{customer.phone}</td>
              <td className="p-4 text-gray-800">{customer.address}</td>
              <td className="p-4">
                <button
                  className=" text-red hover:underline mr-3"
                  onClick={() => onDelete(customer)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerInformation;
