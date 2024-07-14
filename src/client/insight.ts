import client from "./client";

class InsightClient {
   getDataByDay(code: string): Promise<any> {
        return client.get(`/v1/series?code=${code}`)
   }
}

export default new InsightClient();
