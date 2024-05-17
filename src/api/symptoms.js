import api from ".";

const TTL = 1000 * 60 * 60; // 1 hour

export const getAllSymptoms = async () => {
    let symptomsLocal = JSON.parse(sessionStorage.getItem("symptoms"));
    if (!symptomsLocal || Date.now() > symptomsLocal.expiration) {
        try {
            const response = await api.get("/symptoms");
            sessionStorage.setItem("symptoms", JSON.stringify({
                data: response.data,
                expiration: Date.now() + TTL
            }));
            return response.data;
        }
        catch (error) {
            console.error(error);
            return null
        }
    }
    return symptomsLocal.data;
}