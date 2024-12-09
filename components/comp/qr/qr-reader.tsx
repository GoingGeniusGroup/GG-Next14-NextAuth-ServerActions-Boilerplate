"use client"
import React, { useEffect, useState } from 'react';


import Image from 'next/image';
import jsQR from "jsqr";
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Session } from 'next-auth/types';


const QrReader = (session: {
    session:Session
}) => {

    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    
    const handleQRUpload = async () => {
        if (selectedFile) {
          setIsUploading(true);
          const reader = new FileReader();
          reader.onloadend = async () => {
            const img = document.createElement('img');

            img.src = reader.result as string;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = img.width;
              canvas.height = img.height;
              ctx?.drawImage(img, 0, 0, img.width, img.height);
              const imageData = ctx?.getImageData(0, 0, img.width, img.height);
              if (imageData) {
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
                if (qrCode) {
                  setScannedData(qrCode.data);
                //   alert(`QR Code scanned: ${qrCode.data}`);
                } else {
                  alert("No QR code found in the image.");
                }
              }
            };
          };
          reader.readAsDataURL(selectedFile);
          setIsUploading(false);
        }
      };


      useEffect(() => {
        const handleLogin = async () => {
          try {
            // Ensure selectedFile exists before proceeding
            if (selectedFile) {
              // await handleQRUpload();
      
              // Check if scannedData is available before making a request
              if (scannedData) {
                const response = await fetch("http://localhost:3000/api/login-qr", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    channelId: scannedData,
                    userId: session.session.user.gg_id
                  })
                });
              
                if (response.ok) {
                  const data = await response.json();
                  console.log("Login successfully", data);
                } else {
                  const errorData = await response.json();
                  console.error("Login failed:", response.status, errorData);
                }
              } else {
                console.warn("No scannedData available for login.");
              }
            }
          } catch (error) {
            console.error("Error during login process:", error);
          }
        };
      
        // Only run if selectedFile or scannedData changes
        if (selectedFile && scannedData) {
          handleLogin();
        }
      }, [selectedFile, scannedData]); 

    console.log(session.session.user.gg_id);
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-4">QR Code Upload</h1>
                <p className="text-gray-600">Upload a QR code to authenticate</p>
            </div>

            <div className="mb-4">
                <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                />
            </div>

            {previewUrl && (
                <div className="mb-4 flex justify-center">
                    <Image 
                        src={previewUrl} 
                        alt="QR Code Preview" 
                        width={250} 
                        height={250} 
                        className="object-contain rounded-lg"
                    />
                </div>
            )}


{scannedData && (
        <div className="mt-6 text-center">
          <h4 className="text-lg font-bold">Scanned QR Code Data:</h4>
          <p className="text-gray-700">{scannedData}</p>
        </div>
      )}
            <div className="space-y-4">
                <Button 
                    disabled={!selectedFile || isUploading}
                    className="w-full"
                    onClick={handleQRUpload}
                >
                    {isUploading ? 'Processing...' : 'Upload QR Code'}
                </Button>

                <Button 
                    variant="destructive"
                    className="w-full"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default QrReader;