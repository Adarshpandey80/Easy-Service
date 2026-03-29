import React, { useState } from 'react';
import { FaUpload, FaCheck, FaTimes, FaFilePdf, FaFileImage } from 'react-icons/fa';
import '../Style/ShopOwner/Kyc.css';

function Kyc() {
  const [documents, setDocuments] = useState({
    businessRegistration: null,
    gstCertificate: null,
    panCard: null,
    aadharCard: null,
    bankStatement: null,
    shopPhoto: null,
    addressProof: null,
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [submittedDocs, setSubmittedDocs] = useState(new Set());

  const documentRequirements = {
    businessRegistration: {
      title: 'Business Registration Certificate',
      description: 'Certificate of registration from business authority',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB',
    },
    gstCertificate: {
      title: 'GST Certificate',
      description: 'Valid GST registration certificate',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB',
    },
    panCard: {
      title: 'PAN Card',
      description: 'Business/Owner PAN card copy',
      formats: 'PDF, JPG, PNG',
      maxSize: '3MB',
    },
    aadharCard: {
      title: 'Aadhar Card',
      description: 'Owner Aadhar card (front & back)',
      formats: 'PDF, JPG, PNG',
      maxSize: '3MB',
    },
    bankStatement: {
      title: 'Bank Statement (Last 3 months)',
      description: 'Recent bank statements for verification',
      formats: 'PDF',
      maxSize: '5MB',
    },
    shopPhoto: {
      title: 'Shop Photo',
      description: 'Recent photo of your shop premises',
      formats: 'JPG, PNG',
      maxSize: '3MB',
    },
    addressProof: {
      title: 'Address Proof',
      description: 'Electricity bill, rent agreement, or utility bill',
      formats: 'PDF, JPG, PNG',
      maxSize: '5MB',
    },
  };

  const handleFileUpload = (docType, file) => {
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File size exceeds 5MB limit');
      return;
    }

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [docType]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[docType] || 0;
        if (current >= 100) {
          clearInterval(interval);
          setSubmittedDocs(prev => new Set([...prev, docType]));
          return prev;
        }
        return { ...prev, [docType]: current + Math.random() * 30 };
      });
    }, 200);

    setDocuments(prev => ({
      ...prev,
      [docType]: file
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#4f46e5';
    e.currentTarget.style.background = '#eef2ff';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#d1d5db';
    e.currentTarget.style.background = '#f9fafb';
  };

  const handleDrop = (e, docType) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#d1d5db';
    e.currentTarget.style.background = '#f9fafb';
    const file = e.dataTransfer.files[0];
    handleFileUpload(docType, file);
  };

  const removeDocument = (docType) => {
    setDocuments(prev => ({ ...prev, [docType]: null }));
    setUploadProgress(prev => ({ ...prev, [docType]: 0 }));
    setSubmittedDocs(prev => {
      const newSet = new Set(prev);
      newSet.delete(docType);
      return newSet;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allDocumentsUploaded = Object.keys(documents).every(doc => documents[doc] !== null);
    
    if (!allDocumentsUploaded) {
      alert('Please upload all required documents');
      return;
    }

    alert('KYC documents submitted successfully! We will verify them within 24-48 hours.');
    // Here you would typically send the documents to your backend
    console.log('Documents submitted:', documents);
  };

  const getFileIcon = (file) => {
    if (file.type === 'application/pdf') {
      return <FaFilePdf className="file-icon pdf-icon" />;
    }
    return <FaFileImage className="file-icon image-icon" />;
  };

  const uploadedCount = Object.values(documents).filter(doc => doc !== null).length;
  const totalDocuments = Object.keys(documents).length;

  return (
    <div className="kyc-container">
      <div className="kyc-header">
        <h1>KYC Verification</h1>
        <p>Complete your Know Your Customer (KYC) verification to unlock all features</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(uploadedCount / totalDocuments) * 100}%` }}></div>
        </div>
        <p className="progress-text">{uploadedCount} of {totalDocuments} documents uploaded</p>
      </div>

      <div className="kyc-info-banner">
        <h3>📋 Required Documents</h3>
        <p>All documents must be clear, valid, and readable. Ensure the document covers the entire frame.</p>
      </div>

      <form onSubmit={handleSubmit} className="kyc-form">
        <div className="document-grid">
          {Object.entries(documentRequirements).map(([docType, details]) => (
            <div key={docType} className="document-section">
              <div className="document-header">
                <h3>{details.title}</h3>
                {documents[docType] && (
                  <span className="document-status">
                    {uploadProgress[docType] === 100 ? (
                      <FaCheck className="status-icon success" />
                    ) : (
                      <div className="uploading">Uploading...</div>
                    )}
                  </span>
                )}
              </div>

              <p className="document-description">{details.description}</p>

              {!documents[docType] ? (
                <div
                  className="upload-area"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, docType)}
                >
                  <FaUpload className="upload-icon" />
                  <p className="upload-text">Drag and drop your file here</p>
                  <p className="upload-subtext">or</p>
                  <label className="upload-button">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileUpload(docType, e.target.files[0])}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    Browse Files
                  </label>
                  <p className="file-info">
                    {details.formats} • Max {details.maxSize}
                  </p>
                </div>
              ) : (
                <div className="document-uploaded">
                  <div className="file-preview">
                    {getFileIcon(documents[docType])}
                    <div className="file-details">
                      <p className="file-name">{documents[docType].name}</p>
                      <p className="file-size">
                        {(documents[docType].size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  {uploadProgress[docType] !== 100 && (
                    <div className="upload-progress">
                      <div className="progress-bar-small">
                        <div
                          className="progress-fill-small"
                          style={{ width: `${uploadProgress[docType]}%` }}
                        ></div>
                      </div>
                      <p className="progress-percentage">{Math.round(uploadProgress[docType])}%</p>
                    </div>
                  )}
                  {uploadProgress[docType] === 100 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeDocument(docType)}
                    >
                      <FaTimes /> Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="kyc-footer">
          <div className="terms-agreement">
            <input type="checkbox" id="terms" defaultChecked />
            <label htmlFor="terms">
              I confirm that all the documents I've submitted are genuine and valid. I understand that providing false information may result in account suspension.
            </label>
          </div>
          <button type="submit" className="submit-button">
            Submit KYC Documents
          </button>
        </div>
      </form>
    </div>
  );
}

export default Kyc;