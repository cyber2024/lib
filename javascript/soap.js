let Soap = (function () {

    function _generateRegexp(key) {
        return /~\[${key}\]~/g;
    }
    function _matchKeys(string) {
        const rgx = /~\[(.*)\]~/g;
        let keys = [];
        for (let key = rgx.exec(string) ; key != null; key = rgx.exec(string)) {
            keys.push(key[1]);
        }
        return keys;
    }
    function render(str, object) {
        let result = str;
        _matchKeys(str).forEach((key) => {
            result = result.replace('~\[' + key + '\]~', object[key]);
        });
        return result;
    }
    return {
        render
    }
})();