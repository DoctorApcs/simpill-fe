import requests  from "~/utils/routes";
import * as httpRequest from "~/utils/httpRequest";

export const search = async (q='') => {
    try {
        const search = await httpRequest.get(requests.search, {
            params: {
                q,
            }
        });
        return search;
    } catch (error) {
        console.error(error);
        return null;
    }
}