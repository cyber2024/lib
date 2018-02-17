let Soap = (function () {

    function _generateRegexp(key) {
        return /~\[${key}\]~/g;
    }
    function render(str, object) {
        console.log(object)
        const rgx = /~\[(.*)\]~/g;
        const keys = str.matchAll(rgx);
        console.log(keys)
        let result = str;
        if (keys.length > 1) {
            for (let i = 1; i < keys.length; i++) {
                console.log(keys[i], object[keys[i]])
                result = result.replace('~\['+keys[i]+'\]~', object[keys[i]]);
            }
        }
        return result;
    }
    return {
        render
    }
})();