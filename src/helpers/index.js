export const parseObjectToArray = (data, props) => {
    return Object.keys(data).map((prop) => {
        const newItem = {
            id: prop
        }
        props.forEach(customProp => newItem[customProp] = data[prop][customProp])
        return newItem
    });
};

export const isStringEmpty = data => data.trim() === ''
export const isStringLength = (data, length) => data.trim().length === length