"use client";

import React, { useState } from 'react';

interface VaccinePhoto {
  id: string;
  petName: string;
  petBreed: string;
  petAge: number;
  vaccineType: string;
  vaccineDate: string;
  photoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

const VaccineApprovalPage: React.FC = () => {
  const [photos, setPhotos] = useState<VaccinePhoto[]>([
    {
      id: '1',
      petName: 'Buddy',
      petBreed: 'Golden Retriever',
      petAge: 3,
      vaccineType: 'Rabies',
      vaccineDate: '2025-01-01',
      photoUrl: 'https://example.com/photo1.jpg',
      status: 'pending',
    },
    {
      id: '2',
      petName: 'Max',
      petBreed: 'Labrador',
      petAge: 4,
      vaccineType: 'Parvo',
      vaccineDate: '2025-02-01',
      photoUrl: 'https://example.com/photo2.jpg',
      status: 'pending',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchAttribute, setSearchAttribute] = useState<keyof VaccinePhoto>('petName');
  const [sortCriteria, setSortCriteria] = useState<keyof VaccinePhoto>('petName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, status } : photo
      )
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchAttributeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchAttribute(event.target.value as keyof VaccinePhoto);
  };

  const handleSortCriteriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as keyof VaccinePhoto);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredPhotos = photos.filter((photo) =>
    String(photo[searchAttribute]).toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortCriteria === 'petName') {
      return sortOrder === 'asc' ? a.petName.localeCompare(b.petName) : b.petName.localeCompare(a.petName);
    } else if (sortCriteria === 'petBreed') {
      return sortOrder === 'asc' ? a.petBreed.localeCompare(b.petBreed) : b.petBreed.localeCompare(a.petBreed);
    } else if (sortCriteria === 'petAge') {
      return sortOrder === 'asc' ? a.petAge - b.petAge : b.petAge - a.petAge;
    } else if (sortCriteria === 'vaccineType') {
      return sortOrder === 'asc' ? a.vaccineType.localeCompare(b.vaccineType) : b.vaccineType.localeCompare(a.vaccineType);
    } else if (sortCriteria === 'vaccineDate') {
      return sortOrder === 'asc' ? new Date(a.vaccineDate).getTime() - new Date(b.vaccineDate).getTime() : new Date(b.vaccineDate).getTime() - new Date(a.vaccineDate).getTime();
    }
    return 0;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Vaccine Approvals</h1>

      {/* Search Section */}
      <div className="mb-4 flex justify-between items-center">
        <label className="mr-2">Search by:</label>
        <select
          value={searchAttribute}
          onChange={handleSearchAttributeChange}
          className="border px-4 py-2 rounded"
        >
          <option value="petName">Pet Name</option>
          <option value="petBreed">Breed</option>
          <option value="petAge">Age</option>
          <option value="vaccineType">Vaccine Type</option>
          <option value="vaccineDate">Vaccine Date</option>
          <option value="status">Status</option>
        </select>
        <input
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 rounded w-1/2"
        />
      </div>

            {/* Sort Section */}
            <div className="mb-4 flex justify-between items-center">
        <label className="mr-2">Sort by:</label>
        <select
          value={sortCriteria}
          onChange={handleSortCriteriaChange}
          className="border px-4 py-2 rounded"
        >
          <option value="petName">Pet Name</option>
          <option value="petBreed">Breed</option>
          <option value="petAge">Age</option>
          <option value="vaccineType">Vaccine Type</option>
          <option value="vaccineDate">Vaccine Date</option>
        </select>
        <label className="mr-2">Order:</label>
        <button
          onClick={handleSortOrderChange}
          className="px-4 py-2 rounded border"
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="border p-4 rounded shadow">
            <img
              src={photo.photoUrl}
              alt={`${photo.petName}'s vaccine`}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-2">
              <h2 className="text-lg font-semibold">{photo.petName}</h2>
              <p>
                <label className="mr-2">Breed:</label>
                {photo.petBreed}
              </p>
              <p>
                <label className="mr-2">Age:</label>
                {photo.petAge} years
              </p>
              <p>
                <label className="mr-2">Vaccine:</label>
                {photo.vaccineType}
              </p>
              <p>
                <label className="mr-2">Date:</label>
                {photo.vaccineDate}
              </p>
              <p>
                <label className="mr-2">Status:</label>
                <span
                  className={
                    photo.status === 'approved'
                      ? 'text-green-500'
                      : photo.status === 'rejected'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }
                >
                  {photo.status}
                </span>
              </p>
            </div>
            <div className="mt-2 flex justify-between space-x-2">
              <button
                onClick={() => handleApproval(photo.id, 'approved')}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleApproval(photo.id, 'rejected')}
                className="flex-1 bg-red text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaccineApprovalPage;
