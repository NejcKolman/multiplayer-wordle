const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
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
            "done", "y", "x", "c", "v", "b", "n", "m", "backspace"
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

                    keyElement.addEventListener('click', () => {
                        myGuess = myGuess.substring(0, myGuess.length - 1);
                        this._triggerEvent('oninput')
                        document.getElementById("myGuess").focus()
                        document.getElementById('myGuess').value = myGuess.toLowerCase()
                        //guess()
                    });
                    break

                case 'done':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose')
                        document.getElementById("myGuess").focus()
                        done = true
                        console.log('here')
                        guess()
                    });
                    break

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.setAttribute('Id', key)
                    keyElement.addEventListener('click', () => {
                        if (myGuess.length != 5) {
                            myGuess += key;
                            this._triggerEvent('oninput')
                            document.getElementById("myGuess").focus()
                            myGuess = myGuess.toUpperCase()
                            //guess()
                        }
                    })

                    break


            }

            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'))
            }

        });

        return fragment
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](myGuess.toLowerCase());
        }
    },

    open(initialValue, oninput, onclose) {
        myGuess = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboardHidden")
    },

    close() {
        myGuess = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        //this.elements.main.classList.add("keyboardHidden")
    }
}


window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();

})