## ES6 Classes
- I'm trying to make a video game with characters that have names, health points, and armor points. What data structure could be used to represent a character?
    - An object nicely encapsulated
    ```
    const character = {
        name: 'Sekiro',
        health: 100,
        armor: 20,
    }
    ```
    - What if we wanted to give it attack methods? 
    ```
    const character = {
        name: 'Sekiro',
        health: 100,
        armor: 20,
        strength: 30,
        attack: (character) => {
            character.health -= strength;
        }
    } 
    ```
    - Each character, can use power-up once to increase their strength for 10 seconds. How do we implement that?
    ```
    const character = {
        name: 'Sekiro',
        health: 100,
        armor: 20,
        strength: 30,
        attack: (opponent) => {
            opponent.health -= strength;
        },
        powerUpUsed: false
    } 

    const powerUp = character => {
        if (!character.powerUpUsed) {
            character.strength = character.strength * 2;
            character.powerUpUsed = true;
        }
    }

    powerUp(character)
    ```
    - but what if we want to do... `character.powerUp()`?

    ```
    const character = {
            name: 'Sekiro',
            health: 100,
            armor: 20,
            strength: 30,
            attack: (opponent) => {
                opponent.health -= strength;
            },
            _powerUpReady = true,
            powerUp: () => {
                if (_powerUpReady) {
                    this.strength = this.strength * 2;
                    setTimeout(() => {
                        this.strength = this.strength / 2;
                    }, 10000)
                    _powerUpReady = false;
                }
            }
        } 
    ```
    - Why does _powerUpReady have an underscore? What's different about it?
    - Great! But... we need to start create many of these---one for each character. But if we just copy/paste, we will be copying a lot of code redudantly. This is most obvious when it comes to the attack and powerUp methods. What shall we do!?

- In the old days ---> constructor functions
    - Uppercase constructor 
    ```
    function Character(name, strength) {
        this.name = name;
        this.health = 100;
        this.armor = 20;
        this.strength = strength;
        this._powerUpReady = true,
    }

    Character.prototype.attack = (character) => {
        character.health -= strength;
    }
    Character.prototype.powerUp: () => {
        if (this._powerUpReady) {
            this.strength = this.strength * 2;
            setTimeout(() => {
                this.strength = this.strength / 2;
            }, 10000)
            this._powerUpReady = false;
        }
    }
    ```
    - Then you could instantiate it via...
    ```
    const flash = new Character('Flash Gordon', 10)
    ```
- Enter ES6 classes
    ```
    class Character {
        health = 100;
        armor = 20;
        _powerUpReady = true;

        constructor(name, strength) {
            this.name = name;
            this.strength = strength;
        }

        attack(character) {
            character.health -= this.strength;
        }

        powerUp() {
            if (this._powerUpReady) {
                this.strength = this.strength * 2;
                setTimeout(() => {
                    this.strength = this.strength / 2;
                }, 10000)
                this._powerUpReady = false;
            }
        }
    }
    ```

- Prototypes
    - Array methods, where do they come from?
        - Everything is an object
    - instanceOf
    - Object.isPrototypeOf() & .\_\_proto\_\_

- Inheritance
    - We want to create bosses. They have everything a normal character has, but with more health, an evil tagline, and a self-heal method.
    - We can use extend!
    ```
    class Boss extends Character {
        health = 200;

        constructor(name, strength, tagline) {
            super(name, strength);
            this.tagline = tagline;
        }

        sayTagline() {
            console.log(this.tagline)
        }

        selfHeal() {
            this.health += 20;
        }
    }
    ```