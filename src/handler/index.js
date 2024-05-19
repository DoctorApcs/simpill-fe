import bodyParts from '../mocks/bodyParts.json';
import bodyAreas from '../mocks/bodyAreas.json';
import areaGroup from '../mocks/areaGroup.json';

const saveToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

const loadFromSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));

}

export const getBodyParts = () => {
    return bodyParts;
};

export const getBodyAreas = () => {
    return bodyAreas;
};

export const getAllSymptoms = () => {
    return loadFromSessionStorage('allSymptoms');
};

export const findSymptomListByAreaId = (areaID) => {
    const allSymptoms = loadFromSessionStorage('allSymptoms');
    const symptomIdsByArea = loadFromSessionStorage('symptomIdsByArea');
    const symptomObject = symptomIdsByArea?.find((areaSymptom) => areaSymptom.id === areaID);
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
    const allSymptoms = loadFromSessionStorage('allSymptoms');
    return allSymptoms.find((symptom) => symptom.id === symptomId).name;
};

export const findSymptomListBySymptomIds = (symptomIds) => {
    let symptomsName = '';
    symptomIds.map((symptomId) => {
        const name = findSymptomNameBySymptomId(symptomId);
        symptomsName=symptomsName.concat(" ", name.toLowerCase());
    })
    return symptomsName
}

export const findSymptomIdsByAreaId = (areaId) => {
    const symptomIdsByArea = loadFromSessionStorage('symptomIdsByArea');
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
    const allSymptoms = [];
    const symptomIdsByArea = [];
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
    saveToSessionStorage('allSymptoms', allSymptoms);
    saveToSessionStorage('symptomIdsByArea', symptomIdsByArea);
}
