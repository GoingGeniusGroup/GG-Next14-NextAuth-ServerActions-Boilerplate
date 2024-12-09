"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import QRCode from "react-qr-code";

import Pusher from "pusher-js";
import { loginAction } from "@/actions/loginqr";
import { toast } from "sonner";


const initPusher = () => {
  Pusher.logToConsole = false;
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    // Specify the Pusher cluster (in this case, Asia Pacific 2)
    cluster: "mt1",
    // Configure channel authorization
    // channelAuthorization: {
    //     // Specify an endpoint for authorizing private/presence channels
    //     endpoint:
    // },
  });
};

type qrdata = {
  channel: string;
};

const QRPage = () => {
  const [qr_data, setQrData] = useState<qrdata>();
  const [isLoading, setLoading] = useState(false);

  const getQRCode = async () => {
    try {
      let res = await axios.get("/api/generate-qr");
      setQrData(res.data.data);
      console.log(res.data.data, "");

      return res.data.data;
    } catch (e) {
      alert("Cannot fetch QR Data");
    }
    return null;
  };

  const handleLogin = async (data: any) => {
    // const user_id = data.user_id
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (data.success) {
      try {
        // Use server action instead of signIn directly
        const result = await loginAction(data.userId as string);
        
        if (result?.success) {
          toast.success("Login successful! Redirecting...");
          setTimeout(() => {
            
            window.location.reload();

            window.location.href = "/";
          }, 1000);
         
          console.log("User logged in via QR");
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Login error", error);
      }
      console.log("User logged in via QR");
    } else {
      console.error("Authentication failed");
    }
  };

  const showQrCode = () => {
    let pusher = initPusher();
    getQRCode().then((res) => {
      setLoading(false);
      if (res) {
        const channel = pusher.subscribe( res.channel);
        console.log("CHANNEL=", res.channel);
        channel.bind("login-event", function (data: any) {
          handleLogin(data);
        });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    showQrCode();
    setInterval(() => {
      showQrCode();
    }, 100000);
  }, []);
  if (isLoading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Please Scan Login Authenticate
        </h1>
        <div className="mt-12 p-4 bg-white rounded-lg shadow-md">
          {qr_data ? (
            <>
              <QRCode value={qr_data.channel} size={320} />
            </>
          ) : (
            <p className="text-gray-500">Loading QR Code...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default QRPage;
