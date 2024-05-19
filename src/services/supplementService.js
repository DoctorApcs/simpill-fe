import requests from "~/utils/routes";
import * as httpRequest from "~/utils/httpRequest";

export const supplement = async (name='') => {
    try {
        const supplement = await httpRequest.get(requests.supplements+name);
        return supplement;
    } catch (error) {
        console.error(error);
        return null;

    }
}