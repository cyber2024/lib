(function () {
    if (!events || !events.on || !events.emit) {
        throw "No 'events' manager detected, events, events.emit and events.on are required.";
    }
    let people = 0;

    //cache DOM
    let stats = document.querySelector("#stats-module");
    let statsTemplate = document.querySelector('#stats-template').innerHTML;
    console.log(statsTemplate)

    //bind Events
    events.on('PEOPLE_CHANGED', (data) => {
        people = data.length;
        _render();
    })

    function _render() {
        stats.innerHTML = Soap.render(statsTemplate, {people, deaths: 10});
    }

    events.emit('MODULE_LOADED', 'Stats module loaded \nEvents listened for: \n\tPEOPLE_CHANGED\n\nEvents Emitted: \n\tMODULE_LOADED');
})();