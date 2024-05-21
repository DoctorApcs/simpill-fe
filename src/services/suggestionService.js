import requests from "~/utils/routes";
import * as httpRequest from "~/utils/httpRequest";

export const suggestionList = async (q='') => {
    try {
        const query = 'effective use ' + q;
        const suggestionList = await httpRequest.get(requests.suggestions, {
            params: {
                q: query,
            }
        });
        return suggestionList;
    } catch (error) {
        console.error(error);
        return null;
    }
}