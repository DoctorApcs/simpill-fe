import bodyParts from '../mocks/bodyParts.json';
import bodyAreas from '../mocks/bodyAreas.json';
import allSymptoms from '../mocks/allSymptoms.json';
import symptomIdsByArea from '../mocks/symptomIdsByArea.json';
import areaGroup from '../mocks/areaGroup.json';

export const getBodyParts = () => {
    return bodyParts;
};

export const getBodyAreas = () => {
    return bodyAreas;
};

export const getAllSymptoms = () => {
    return allSymptoms;
};

export const getSymptomIdsByArea = () => {
    return symptomIdsByArea;
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

export const findNameByAreaId = (areaId) => {
    return bodyAreas.find((area) => area.id === areaId).name;
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
