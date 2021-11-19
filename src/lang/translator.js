import EngTranslations from "./en/translations";

const translator = (key, options = {}) => {
    const trnaslatoFn = EngTranslations[key];
    if (!trnaslatoFn) {
        console.warn(
            `Warning the tarnslation key ${key} is missing in the Translation Object`
        );
        return key;
    }

    return trnaslatoFn(options);
};

export default translator;
