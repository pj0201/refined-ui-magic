import type { LocationInfo } from './types';

export const getLocationInfo = async (): Promise<LocationInfo | null> => {
  console.log('Getting location info...');
  
  try {
    // ipapi.coから位置情報を取得
    try {
      console.log('Trying ipapi.co...');
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('ipapi.co response:', data);
        
        if (data.ip) {
          // 日本の場合は都道府県情報を使用、その他は国名
          let displayCountry = data.country_name || data.country || '不明';
          let displayCity = data.city || data.region || '不明';
          
          // 日本の場合は都道府県を優先
          if (data.country_code === 'JP') {
            displayCountry = data.region || data.city || '日本';
            displayCity = data.city || '不明';
          }
          
          return {
            ip: data.ip,
            country: displayCountry,
            city: displayCity
          };
        }
      }
    } catch (err) {
      console.log('ipapi.co failed:', err);
    }

    // 位置情報取得に失敗した場合は記録しない
    console.log('位置情報の取得に失敗したため、ログ記録をスキップします');
    return null;
    
  } catch (error) {
    console.error('Location info error:', error);
    return null;
  }
};