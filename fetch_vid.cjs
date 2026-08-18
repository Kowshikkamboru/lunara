const https = require('https');

https.get('https://videos.sproutvideo.com/embed/799fdab71e1be6c6f0/2e07ad296a240f16?playerTheme=dark&playerColor=af3fd3&ambient=true', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/[^"']*\.mp4[^"']*/g);
    if (matches) {
      console.log('Found MP4s:', [...new Set(matches)]);
    } else {
      console.log('No MP4s found. Data length:', data.length);
      const m3u8 = data.match(/https:\/\/[^"']*\.m3u8[^"']*/g);
      if (m3u8) console.log('Found m3u8:', [...new Set(m3u8)]);
    }
  });
});
