import { MMKV } from 'react-native-mmkv';

const localStorage = new MMKV();

const debugStorage = () => {
  let ret = '\n-------START OF MMKV DUMP-------\n';
  const obj: Record<string, string | number | boolean | undefined> = {};
  for (const key of localStorage.getAllKeys()) {
    const stringValue = localStorage.getString(key);
    if (typeof stringValue === 'string' && stringValue.length) {
      obj[key] = stringValue;
      continue;
    }
    const numberValue = localStorage.getNumber(key);
    if (typeof numberValue === 'number') {
      obj[key] = numberValue;
      continue;
    }
    obj[key] = localStorage.getBoolean(key);
  }
  ret += JSON.stringify(obj);
  ret += '\n-------END OF MMKV DUMP-------';
  console.log(ret);
};

export { debugStorage, localStorage };
