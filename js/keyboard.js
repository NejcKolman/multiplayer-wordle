const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: ''
    },

    init() {
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard');
        this.elements.keysContainer.classList.add('keyboardKeys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main)

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("change", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                })
            })
        })
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "š",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "č", "ž",
            "enter", "y", "x", "c", "v", "b", "n", "m", "backspace"
        ];
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['ž', 'š', 'backspace'].indexOf(key) != -1;

            keyElement.setAttribute('type', 'button')
            keyElement.classList.add('keyboardKey')

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => { guess(key) });
                    break

                case 'enter':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => { guess(key) });
                    break

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.setAttribute('Id', key)
                    keyElement.addEventListener('click', () => { guess(key) })

                    break


            }

            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'))
            }

        });
        return fragment
    },
}


window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();

})