import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    // Generate a random token
    const token = crypto.randomBytes(64).toString('hex');

    // Create channel data using current date components
    const currentDate = new Date();
    const channelData = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getMinutes()}`;
    
    // Create a hash using channel data and token
    const channelDataHash = crypto
      .createHash('md5')
      .update(`${channelData}||${token}`)
      .digest('hex');

    // Return successful response
    return NextResponse.json({
      success: true,
      msg: "QR DATA Created",
      data: {
        channel: channelDataHash
      }
    }, { status: 200 });
  } catch (error) {
    // Handle any potential errors
    return NextResponse.json({
      success: false,
      msg: "Error generating QR data",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}