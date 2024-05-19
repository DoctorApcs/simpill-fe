import requests from "~/utils/routes";
import * as httpRequest from "../utils/httpRequest";

const TTL=60*60*1000; // 1 hour

export const symptomList = async () => {
    let symptomListLocal=JSON.parse(sessionStorage.getItem("symptomList"));
    if(!symptomListLocal || Date.now() > symptomListLocal.expiration) {
        try {
            const symptomList = await httpRequest.get(requests.symptomList);
            sessionStorage.setItem("symptomList", JSON.stringify({
                data: symptomList.data,
                expiration: Date.now() + TTL
            }));
            return symptomList;
        }   
        catch (error) {
            console.error(error);
            return null;
        }
    }
    return symptomListLocal.data;
}