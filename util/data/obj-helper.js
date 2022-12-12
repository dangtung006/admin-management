function cloneObject(obj) {
    if (obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    return null;
}

function setObjectValue(obj, depthKey, value) {
    try {
        let keys = depthKey.split(".");
        if (keys.length>1) {
            let tempObj = obj;
            for (let idx=0; idx<keys.length-1; idx++) {
                tempObj = tempObj[keys[idx]];
                if (value==null) return false;
            }
            tempObj[keys[keys.length-1]] = value;
            return true;
        } else {
            obj[depthKey] = value;
            return true;
        }
    } catch (error) {
        logger.error("Unable to set value of key", depthKey, error);
    }
    return false;
}

function getObjectValue(obj, depthKey) {
    try {
        let keys = depthKey.split(".");
        if (keys.length>1) {
            let value = obj;
            for (let idx=0; idx<keys.length; idx++) {
                value = value[keys[idx]];
                if (value==null) return null;
            }
            return value;
        } else {
            return obj[depthKey];
        }
    } catch (error) {
        logger.error("Unable to get value of key", depthKey, error);
    }
    return null;
}

function encryptValuesByCharacter(obj, objOpt, character="*", numRepeat=5) {
    try {
        let keys = Object.keys(obj);
        for(let i=0; i<keys.length; i++) {
            if (objOpt.hasOwnProperty(keys[i]) && typeof obj[keys[i]] != "object") {
                obj[keys[i]] = character.repeat(numRepeat);
            } else if (typeof obj[keys[i]] == "object") {
                encryptValuesByCharacter(obj[keys[i]], objOpt, character, numRepeat);
            }
        }
        return true;

    } catch (error) {
        logger.error("encryptOptionValues() has err: ", error);
    }
    return null;
}

function decryptValuesByCharacter(obj, objOpt) {
    try {
        let keys = Object.keys(obj);
        for(let i=0; i<keys.length; i++) {
            if (objOpt.hasOwnProperty(keys[i]) && typeof obj[keys[i]] != "object") {
                obj[keys[i]] = objOpt[keys[i]];
                if (objOpt[keys[i]] === 'undefined') { 
                    logger.debug(`decryptValuesByCharacter(): ${keys[i]} = undefined`);
                }
            } else if (typeof obj[keys[i]] == "object") {
                decryptValuesByCharacter(obj[keys[i]], objOpt);
            }
        }
        return true;

    } catch (error) {
        logger.error("decryptValuesByCharacter() has err: ", error);
    }
    return null;
}

exports.cloneObject    = cloneObject;
exports.setObjectValue = setObjectValue;
exports.getObjectValue = getObjectValue;

exports.encryptValuesByCharacter = encryptValuesByCharacter;
exports.decryptValuesByCharacter = decryptValuesByCharacter;