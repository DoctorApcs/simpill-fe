import bodyParts from '../mocks/bodyParts.json';
import bodyAreas from '../mocks/bodyAreas.json';
import areaGroup from '../mocks/areaGroup.json';

const allSymptoms = [];
const symptomIdsByArea = [];

export const getBodyParts = () => {
    return bodyParts;
};

export const getBodyAreas = () => {
    return bodyAreas;
};

export const getAllSymptoms = () => {
    return allSymptoms;
};

export const findSymptomListByAreaId = (areaID) => {
    const symptomObject = symptomIdsByArea.find((areaSymptom) => areaSymptom.id === areaID);
    const symptomList = symptomObject.symptomIds.map((symptomId) =>
        allSymptoms.find((symptom) => symptom.id === symptomId),
    );
    return symptomList;
};

export const getAreaGroup = () => {
    return areaGroup;
};

export const findAreaGroupByAreaGroupId = (areaGroupId) => {
    return areaGroup.find((group) => group.id === areaGroupId);
};

export const findAreaGroupByAreaId = (areaId) => {
    return areaGroup.find((group) => group.areaIds.includes(areaId));
};

export const findAreaNameByAreaId = (areaId) => {
    return bodyAreas.find((area) => area.id === areaId).name;
};

export const findSymptomNameBySymptomId = (symptomId) => {
    return allSymptoms.find((symptom) => symptom.id === symptomId).name;
};

export const findSymptomIdsByAreaId = (areaId) => {
    return symptomIdsByArea.find((areaSymptom) => areaSymptom.id === areaId).symptomIds;
};

export const findAreaIdByBodyPartId = (bodyPartId) => {
    for (const bodyArea of bodyAreas) {
        if (bodyArea.bodyPartIds.includes(bodyPartId)) {
            return bodyArea.id;
        }
    }
    return -1;
};

export const handleAPI = (symptomList) => {
    let symptomId = 0;
    let areaId = 0;
    for( const bodyArea of bodyAreas) {
        for(const bodyPart of symptomList) {
            if(bodyArea.name === bodyPart.bodyPart) {
                const symptomIds = [];
                for(const symptom of bodyPart.symptoms) {
                   allSymptoms.push({ id: symptomId, name: symptom });
                    symptomIds.push(symptomId);
                    symptomId++;
                }
                symptomIdsByArea.push({ id: areaId, symptomIds: symptomIds });
                areaId++;
            }
        }
    }
}
