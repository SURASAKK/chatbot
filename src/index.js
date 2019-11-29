// เรียก config และ Product Model
import './sheets.config';
import Product from './product.model';

// ////////////////////////////ยิง Log//////////////////////////////
// const sheetId = '1zzYCYmMplzNxbgl2Zbf-RvP3DrlkSZaM_ZoR57fpnl4';
// eslint-disable-next-line no-global-assign
// Logger = BetterLog.useSpreadsheet(sheetId);
// Logger.log("That's all you need to do");
// Tamotsu.initialize();
// /////////////////////////////////////////////////////////////////

// เป็นท่ามาตรฐานในการสร้าง JSON Output ของ Apps Script ครับ
const responseJSON = jsonObject => {
  return ContentService.createTextOutput(JSON.stringify(jsonObject)).setMimeType(
    ContentService.MimeType.JSON
  );
};

const doPost = e => {
  const data = JSON.parse(e.postData.contents);
  ///ด้านลงนี้ เป็นการเก็บ Log เป็น json Data
  ///Logger.log(JSON.stringify(data));

  // ตรวจสอบ request ว่ามีข้อมูลที่ต้องการไหม
  if (!data.queryResult) {
    return responseJSON({ fulfillmentText: 'หนูว่ามีปัญหาแล้วอันนี้' });
  }
  const { intent } = data.queryResult;
  // ตรวจสอบว่า intent เป็นการถามราคาหรือเปล่า (เผื่อมีหลาย intent)
  if (intent.displayName === 'Ask for price') {
    const productName = data.queryResult.queryText;

    // query เอา product ที่มี name ตรงกับที่ dialogflow ส่งมาให้
    const product = Product.where({ name: productName }).first();

    // สร้าง fulfillment text เพื่อตอบกลับไปที่ dialoflow
    const response = { fulfillmentText: `${product.name} ราคา £${product.price} ค่ะ` };

    // ส่งคำตอบกลับไป
    return responseJSON(response);
  }

  // ในการณีที่ไม่เจอ Intent ที่เขียนเอาไว้้
  return responseJSON({ fulfillmentText: 'ไม่เข้าใจค่ะ ลองใหม่อีกทีนะคะ' });
};

global.doPost = doPost;

// ////////////////////////////////////////////////////////////////////
const helloWorld = () => {
  Logger.log('Hello World');
};

global.helloWorld = helloWorld;

// const doPost = e => {
//  const data = JSON.parse(e.postData.contents);
//  Logger.log(JSON.stringify(data));
// };

// global.doPost = doPost;
