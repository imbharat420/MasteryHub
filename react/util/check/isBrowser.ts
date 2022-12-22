const operatingSystemEnum = {
  IOS: 'iOS',
  WindowsPhone: 'WindowsPhone',
  Android: 'Android',
};


const getMobileOperatingSystem = (os: string | null) => {
  if (os) {
    return os;
  }
  if (!IS_BROWSER || typeof window !== 'object' || !window.navigator) {
    return undefined;
  }
  const userAgent = navigator.userAgent || navigator.vendor;
  if (/windows phone/i.test(userAgent)) {
    return operatingSystemEnum.WindowsPhone;
  }

  if (/android/i.test(userAgent)) {
    return operatingSystemEnum.Android;
  }
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return operatingSystemEnum.IOS;
  }

  return undefined;
};



const IS_BROWSER = typeof window === 'object';

const isIOS = getMobileOperatingSystem(null) === operatingSystemEnum.IOS;
const isSafari = IS_BROWSER && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


const getSourceFormat = format => (isIOS || isSafari ? format : 'webp');

//const isDev = process.env.NODE_ENV === 'development';
