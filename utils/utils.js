// Args: ingr - comma separated string of ingredients
// Returns: list of ingredients
// Used in: routes/food.js
function parseIngr(ingr) {
    let ingrList = ingr.split(',');
    let ingrList2 = [];
    for (let i = 0; i < ingrList.length; i++) {
        ingrList2.push(ingrList[i].trim());
    }
    return ingrList2;
}

// Export parseIngr function
module.exports = {
    parseIngr: parseIngr
};