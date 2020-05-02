'use strict';

module.exports = {

    /**
     * Determine if an object is an instance of a Class by looking at the value of the static CLASS_ID property.
     *
     * @param obj {*}
     * @param id {string} Expected CLASS_ID value
     * @returns {boolean}
     */
    isInstanceOfById: isInstanceOfById
}

function isInstanceOfById(obj, id) {

    if (!obj || typeof obj !== 'object')
        return false;

    let constructor = obj.constructor;

    while (constructor) {
        if (constructor.CLASS_ID === id)
            return true;

        const prototype = Object.getPrototypeOf(constructor.prototype);
        if (!prototype)
            return false;

        constructor = prototype.constructor;
    }

    return false;
}
