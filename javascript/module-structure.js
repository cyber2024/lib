var people = (function () {
    if (!events || !events.on || !events.emit) {
        throw "no event system in place. Need an 'events' manager with 'on' and 'emit' functions";
    }

    let people = [];

    //cache dom
    let template = document.querySelector('script');
    let wrapper = template.querySelector('.people-wrapper');
    let inputText = document.querySelector('.input-person');
    let addButton = document.querySelector('.btn-add-person');
    let list = document.querySelector('.list');
   
    //bind events
    addButton.addEventListener('click', addPerson);
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('close')) deletePerson(e);
    });

    //initiate
    addPerson('Will');
    addPerson('Beth');

    _render();

    function _render() {
        list.innerHTML = '';
        people.forEach((person) => {
            let el = document.createElement('li');
            el.className = 'list-item';
            el.innerHTML = `<span class='text'>${person}</span><span class="close">X</button>`
            list.appendChild(el);
        });

    }
    function addPerson(person) {
        let name = typeof person == 'string' ? person : inputText.value;
        if (!name) return;
        people.push(name);
        inputText.value = '';
        events.emit('PEOPLE_CHANGED', people);
        _render();
    }
    function deletePerson(e) {
        var index = typeof e == 'number'? e : people.indexOf(e.target.parentElement.children[0].textContent);
        people.splice(index, 1);
        events.emit('PEOPLE_CHANGED', people);
        _render();
    }

    function getPeople() { return new Array(people); }

    if (events && events.on) {
        events.emit('MODULE_LOADED', 'People module loaded');
    } else {
        throw "no event system in place. Need an 'events' manager with an 'on' function";
    }

    const EVENTS_EMITTED = ['PEOPLE_CHANGED', 'MODULE_LOADED'];
    return { getPeople, addPerson, deletePerson, EVENTS_EMITTED };
})();
