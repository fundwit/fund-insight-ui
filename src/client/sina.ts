import client from "./client";

class FinanceClient {
   getDataByDay(code: string): Promise<any> {
        return client.get(`quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=${code}&scale=240&ma=no&datalen=1023`)
   }
}

export default new FinanceClient();
