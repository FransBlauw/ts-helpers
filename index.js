/**
 * Helper utlity class for working with the HTML Canvas.
 *
 * @version 1.0.0
 * @author Frans Blauw
 */
System.register("CanvasUtil", [], function (exports_1, context_1) {
    "use strict";
    var CanvasUtil;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {/**
             * Helper utlity class for working with the HTML Canvas.
             *
             * @version 1.0.0
             * @author Frans Blauw
             */
            CanvasUtil = class CanvasUtil {
                /**
                 * @param canvas the canvas on which will be drawn
                 * @returns the 2D rendering context of the canvas
                 */
                static getCanvasContext(canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx === null)
                        throw new Error('Canvas Rendering Context is null');
                    return ctx;
                }
                /**
                 * Fill the canvas with a colour
                 *
                 * @param canvas canvas that requires filling
                 * @param colour the colour that the canvas will be filled with
                 */
                static fillCanvas(canvas, colour = '#FF10F0') {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.beginPath();
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = colour;
                    ctx.fill();
                }
                /**
                 * Loads a new image into an HTMLImageElement
                 * WARNING: This happens async. Therefor the result might not immediately be visible
                 *
                 * @param source the path of the image to be loaded
                 * @returns the image
                 */
                static loadNewImage(source) {
                    const img = new Image();
                    img.src = source;
                    return img;
                }
                /**
                 *
                 * @param canvas that canvas that it should be drawn on
                 * @param image the image to be drawn
                 * @param dx x-coordinate
                 * @param dy y-coordinate
                 */
                static drawImage(canvas, image, dx, dy) {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.drawImage(image, dx, dy);
                }
                /**
                 * Clear the canvas, preparing for drawing
                 *
                 * @param canvas canvas to be cleared
                 */
                static clearCanvas(canvas) {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                /**
                 *
                 * @param canvas Canvas to write to
                 * @param text Text to write
                 * @param xCoordinate x-coordinate of the text
                 * @param yCoordinate y-coordinate of the text
                 * @param alignment align of the text
                 * @param fontFamily font family to use when writing text
                 * @param fontSize font size in pixels
                 * @param color colour of text to write
                 */
                static writeTextToCanvas(canvas, text, xCoordinate, yCoordinate, alignment = 'center', fontFamily = 'sans-serif', fontSize = 20, color = 'red') {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.font = `${fontSize}px ${fontFamily}`;
                    ctx.fillStyle = color;
                    ctx.textAlign = alignment;
                    ctx.fillText(text, xCoordinate, yCoordinate);
                }
                static drawCircle(canvas, centerX, centerY, radius, color = 'red') {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.arc(centerX, centerY, radius * Math.PI / 180, 0, 2 * Math.PI);
                    ctx.stroke();
                }
                static drawRectangle(canvas, dx, dy, width, height, color = 'red') {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.rect(dx, dy, width, height);
                    ctx.stroke();
                }
                static fillCircle(canvas, centerX, centerY, radius, color = 'red') {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.arc(centerX, centerY, radius * Math.PI / 180, 0, 2 * Math.PI);
                    ctx.fill();
                }
                static fillRectangle(canvas, dx, dy, width, height, color = 'red') {
                    const ctx = CanvasUtil.getCanvasContext(canvas);
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.rect(dx, dy, width, height);
                    ctx.fill();
                }
            };
            exports_1("default", CanvasUtil);
        }
    };
});
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
System.register("GameLoop", [], function (exports_2, context_2) {
    "use strict";
    var Game, GameLoop;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {/* eslint-disable max-classes-per-file */
            /* eslint-disable import/prefer-default-export */
            /**
             * Represents a basic Game Loop based on `requestAnimationFrame()`.
             *
             * The implementation of this class depends on another class: `Game`. This
             * means that, if you use this class, you need to either have a `Game` class
             * that exactly implements the three methods `processInput()`, `update(elapsed)`
             * and `render()` or change the code in the `step()` method of this class so it
             * represents your own game methods.
             *
             * @see https://gameprogrammingpatterns.com/game-loop.html
             * @author BugSlayer
             *
             * @version 1.5.0
             */
            Game = class Game {
            };
            exports_2("Game", Game);
            GameLoop = class GameLoop {
                /**
                 * Construct a new instance of this class.
                 *
                 * @param game the game to animate
                 * @param mode OPTIONAL, the mode of the gameloop. It defaults to
                 *   GameLoop.NORMAL_MODE, which is fine for simple games
                 */
                constructor(game, mode = GameLoop.NORMAL_MODE) {
                    this.state = GameLoop.STATE_IDLE;
                    this.mode = mode;
                    this.game = game;
                }
                /**
                 * Start the game loop.
                 */
                start() {
                    if (this.state === GameLoop.STATE_IDLE) {
                        this.state = GameLoop.STATE_STARTING;
                        this.gameStart = performance.now();
                        this.frameEnd = this.gameStart;
                        this.previousElapsed = this.gameStart;
                        this.gameTime = 0;
                        this.frameCount = 0;
                        requestAnimationFrame(this.step);
                    }
                }
                /**
                 * Requests to gracefully stop the gameloop.
                 */
                stop() {
                    this.state = GameLoop.STATE_STOPPING;
                }
                /**
                 * Returns `true` if the given state exactly matches the current state of
                 * this object
                 *
                 * @param state the state to check
                 * @returns `true` if the given state exactly matches the current state of
                 *   this object
                 */
                isInState(state) {
                    return this.state === state;
                }
                /**
                 * This MUST be an arrow method in order to keep the `this` variable working
                 * correctly. It will be overwritten by another object otherwise caused by
                 * javascript scoping behaviour.
                 *
                 * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
                 *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
                 *   starts to execute callback functions
                 */
                step(timestamp) {
                    // Handle first animation frame
                    if (this.isInState(GameLoop.STATE_STARTING)) {
                        this.state = GameLoop.STATE_RUNNING;
                    }
                    this.game.processInput();
                    // Let the game update itself
                    let shouldStop = false;
                    if (this.mode === GameLoop.PLAY_CATCH_UP) {
                        const step = 1;
                        while (this.previousElapsed < timestamp && !shouldStop) {
                            shouldStop = !this.game.update(step);
                            this.previousElapsed += step;
                        }
                    }
                    else {
                        const elapsed = timestamp - this.previousElapsed;
                        shouldStop = !this.game.update(elapsed);
                        this.previousElapsed = timestamp;
                    }
                    // Let the game render itself
                    this.game.render();
                    // Check if a next animation frame needs to be requested
                    if (!shouldStop || this.isInState(GameLoop.STATE_STOPPING)) {
                        requestAnimationFrame(this.step);
                    }
                    else {
                        this.state = GameLoop.STATE_IDLE;
                    }
                    // Handle time measurement and analysis
                    const now = performance.now();
                    const stepTime = timestamp - now;
                    const frameTime = now - this.frameEnd;
                    this.fps = Math.round(1000 / frameTime);
                    this.load = stepTime / frameTime;
                    this.frameEnd = now;
                    this.gameTime = now - this.gameStart;
                    this.frameCount += 1;
                }
                ;
            };
            exports_2("GameLoop", GameLoop);
            GameLoop.STATE_IDLE = 0;
            GameLoop.STATE_STARTING = 1;
            GameLoop.STATE_RUNNING = 2;
            GameLoop.STATE_STOPPING = 3;
            GameLoop.NORMAL_MODE = 0;
            GameLoop.PLAY_CATCH_UP = 1;
        }
    };
});
System.register("KeyListener", [], function (exports_3, context_3) {
    "use strict";
    var KeyListener;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            /**
             * This class handles the keyboard events. It knows the last known state of its
             * keys
             *
             * Some parts of this class are pretty complex, but the class itself is fairly
             * easy to use. You just instantiate one object in your game.
             *
             * Use the method `isKeyDown()` to check if a specific key is currently pressed
             * down by the user. Will always return `true` while the key is down.
             *
             * Use the method `keyPressed()` to determine if the key is pressed down by the
             * user. Will only return `true` once until the key is pressed again.
             *
             * NOTE: It is known that the MouseEvent.keyCode property is deprecated, which
             * means that there will be a moment that this class will not work anymore.
             *
             * @author BugSlayer
             * @author Frans Blauw
             */
            KeyListener = class KeyListener {
                /**
                 * Constructs a new KeyListener.
                 */
                constructor() {
                    /**
                     * Record that holds a boolean for each keycode. The keycode is the index of
                     * the array and the boolean is the state of that key (`true` means that
                     * the key is down).
                     */
                    this.keyDown = {};
                    this.keyPressedQueried = {};
                    // Register the arrow methods as listeners to keyevents
                    // There is a third event ('keypress'), but we do not need to use it
                    window.addEventListener('keydown', (ev) => {
                        this.keyDown[ev.code] = true;
                    });
                    window.addEventListener('keyup', (ev) => {
                        this.keyDown[ev.code] = false;
                        this.keyPressedQueried[ev.code] = false;
                    });
                }
                /**
                 * Returns `true` if and only if the last known state of the keyboard
                 * reflects that the specified key is currently pressed.
                 *
                 * @param keyCode the keyCode to check
                 * @returns `true` when the specified key is currently down
                 */
                isKeyDown(keyCode) {
                    return this.keyDown[keyCode] === true;
                }
                /**
                 * Returns `true` if and only if the key is down, and if it has not
                 * been queried before.
                 *
                 * Used for single key presses.
                 *
                 * @param keyCode the keyCode to check
                 * @returns `true` if the specified key is down and not queried before
                 */
                keyPressed(keyCode) {
                    if (this.keyPressedQueried[keyCode] === true)
                        return false;
                    if (this.keyDown[keyCode] === true) {
                        this.keyPressedQueried[keyCode] = true;
                        return true;
                    }
                    return false;
                }
            };
            exports_3("default", KeyListener);
            // Some convenient key codes already defined here. If you need a specific
            // keycode, see:https://keycode.info/
            KeyListener.KEY_ENTER = 13;
            KeyListener.KEY_SHIFT = 16;
            KeyListener.KEY_CTRL = 17;
            KeyListener.KEY_ALT = 18;
            KeyListener.KEY_ESC = 27;
            KeyListener.KEY_SPACE = 32;
            KeyListener.KEY_LEFT = 37;
            KeyListener.KEY_UP = 38;
            KeyListener.KEY_RIGHT = 39;
            KeyListener.KEY_DOWN = 40;
            KeyListener.KEY_DEL = 46;
            KeyListener.KEY_1 = 49;
            KeyListener.KEY_2 = 50;
            KeyListener.KEY_3 = 51;
            KeyListener.KEY_4 = 52;
            KeyListener.KEY_5 = 53;
            KeyListener.KEY_6 = 54;
            KeyListener.KEY_7 = 55;
            KeyListener.KEY_8 = 56;
            KeyListener.KEY_9 = 57;
            KeyListener.KEY_0 = 58;
            KeyListener.KEY_A = 65;
            KeyListener.KEY_B = 66;
            KeyListener.KEY_C = 67;
            KeyListener.KEY_D = 68;
            KeyListener.KEY_E = 69;
            KeyListener.KEY_F = 70;
            KeyListener.KEY_G = 71;
            KeyListener.KEY_H = 72;
            KeyListener.KEY_I = 73;
            KeyListener.KEY_J = 74;
            KeyListener.KEY_K = 75;
            KeyListener.KEY_L = 76;
            KeyListener.KEY_M = 77;
            KeyListener.KEY_N = 78;
            KeyListener.KEY_O = 79;
            KeyListener.KEY_P = 80;
            KeyListener.KEY_Q = 81;
            KeyListener.KEY_R = 82;
            KeyListener.KEY_S = 83;
            KeyListener.KEY_T = 84;
            KeyListener.KEY_U = 85;
            KeyListener.KEY_V = 86;
            KeyListener.KEY_W = 87;
            KeyListener.KEY_X = 88;
            KeyListener.KEY_Y = 89;
            KeyListener.KEY_Z = 90;
        }
    };
});
/**
 * Helper class for managing the mouse
 *
 * @author Frans Blauw
 */
System.register("MouseListener", [], function (exports_4, context_4) {
    "use strict";
    var MouseListener;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {/**
             * Helper class for managing the mouse
             *
             * @author Frans Blauw
             */
            MouseListener = class MouseListener {
                constructor(canvas) {
                    this.mouseCoordinates = { x: 0, y: 0 };
                    this.buttonDown = {};
                    this.buttonQueried = {};
                    canvas.addEventListener('mousemove', (ev) => {
                        this.mouseCoordinates = {
                            x: ev.offsetX,
                            y: ev.offsetY,
                        };
                    });
                    canvas.addEventListener('mousedown', (ev) => {
                        this.buttonDown[ev.button] = true;
                    });
                    canvas.addEventListener('mouseup', (ev) => {
                        this.buttonDown[ev.button] = false;
                        this.buttonQueried[ev.button] = false;
                    });
                    canvas.addEventListener('contextmenu', (ev) => {
                        ev.preventDefault();
                    });
                }
                isButtonDown(buttonCode = 0) {
                    return this.buttonDown[buttonCode];
                }
                buttonPressed(buttonCode = 0) {
                    if (this.buttonQueried[buttonCode] === true)
                        return false;
                    if (this.buttonDown[buttonCode] === true) {
                        this.buttonQueried[buttonCode] = true;
                        return true;
                    }
                    return false;
                }
                getMousePosition() {
                    return this.mouseCoordinates;
                }
            };
            exports_4("default", MouseListener);
            MouseListener.BUTTON_LEFT = 0;
            MouseListener.BUTTON_MIDDLE = 1;
            MouseListener.BUTTON_RIGHT = 2;
        }
    };
});
