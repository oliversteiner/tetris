"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interval_1 = require("./Interval");
// import OstUtil from "./OstUtil";
var Tetris = /** @class */ (function () {
    /**
     *
     *
     */
    function Tetris() {
        var _this = this;
        this.interval = new Interval_1.default();
        this.figuren = [
            'quadrat',
            'lang',
            'dreierspitz',
            'zhochrechts',
            'zhochlinks',
            'lrechts',
            'llinks'
        ];
        // DOM
        this.$container_figuren = document.getElementById('container-figuren');
        // Buttons
        this.$play_button = document.getElementsByClassName('play-button')[0];
        this.$reset_button = document.getElementsByClassName('reset-button')[0];
        /**
         *
         *
         */
        this.reset = function () {
            console.log('reset');
            _this.is_playing = false;
            _this.interval.clearAll();
            var nodes = document.getElementsByClassName('figur'), i = nodes.length;
            while (i--) {
                nodes[i].classList.remove('bounceAndRotate');
            }
            _this.removeGeneratedFigures();
            _this.reset_spalten_pool();
            _this.$play_button.style.display = 'block';
            _this.$reset_button.style.display = 'none';
        };
        /**
         * delay : zeit zwischen zwei figuren
         *
         */
        this.aufbau_zeilen = function () {
            console.log('-------------  neue zeile  ----------------');
            console.log('-- zeile_aktuell:' + _this.zeile_aktuell);
            console.log('-- zeilen_max:' + _this.zeilen_max);
            console.log('-- delay_ebene_h_spalten:' + _this.delay_ebene_h_spalten);
            if (_this.zeile_aktuell === _this.zeilen_max) {
                _this.interval.clearAll();
            }
            // Spalten abarbeiten:
            // fülle ein Array mit zahlen von 1 bis 10
            // nimm aus dem Array zufällig eine Zahl heraus,
            // mach das mit allen Zahlen, bis das Array leer ist
            // poolfüllen:
            _this.reset_spalten_pool();
            // this.zaehler_spalte = 1;
            _this.interval.make(_this.aufbau_spalten, _this.delay_ebene_h_spalten);
            _this.zeile_aktuell++;
            // Die zeit vom herunterfallen mit jedem durchlauf verzögern
            _this.delay_ebene_h_spalten += 10;
        };
        this.aufbau_spalten = function () {
            // Solange nummern im Pool sind, weitermachen
            console.log('spalten_pool.length:' + _this.spalten_pool.length);
            if (_this.spalten_pool.length === 1) {
                _this.interval.clear(0);
            }
            var spalte = _this.getFromPool();
            if (spalte > 0) {
                console.log(_this.zaehler_spalte + ' Spalte:' + spalte);
                var options = {};
                options.figur_id = 'figur-' + _this.randomFigur();
                options.spalte = spalte;
                options.zeile = _this.zeile_aktuell;
                _this.bewegeFigur(options);
            }
            _this.zaehler_spalte++;
        };
        console.log('--------  constructor  ---------------');
        this.addEventListeners();
        this.reset_data();
        this.reset_spalten_pool();
        this.play();
    }
    Tetris.prototype.reset_data = function () {
        this.figur_zaehler = 1;
        this.spalten_pool = [];
        this.spalten_max = 10;
        this.zeilen_max = 20;
        this.zaehler_spalte = 0;
        this.zeile_aktuell = 0;
        this.delay_ebene_h_spalten = 100;
        console.log('figur_zaehler:' + this.figur_zaehler);
        console.log('spalten_pool:' + this.spalten_pool);
        console.log('spalten_max:' + this.spalten_max);
        console.log('zeilen_max:' + this.zeilen_max);
        console.log('zaehler_spalte:' + this.zaehler_spalte);
        console.log('zeile_aktuell:' + this.zeile_aktuell);
        console.log('this.delay_ebene_h_spalten:' + this.delay_ebene_h_spalten);
    };
    Tetris.prototype.reset_spalten_pool = function () {
        console.log('--------  reset_spalten_pool  ---------------');
        // füllen:
        for (var i = 1; i < this.spalten_max; i++) {
            this.spalten_pool.push(i);
        }
        console.log(this.spalten_pool);
    };
    Tetris.prototype.addEventListeners = function () {
        var scope = this;
        this.$play_button.addEventListener('click', function () {
            console.log(' ____');
            console.log('[____]  Play');
            scope.play();
        });
        this.$reset_button.addEventListener('click', function () {
            console.log(' ____');
            console.log('[____]  Reset');
            scope.reset();
        });
    };
    ;
    /**
     *
     *
     */
    Tetris.prototype.play = function () {
        this.is_playing = true;
        // Playbutton ausblenden
        this.$play_button.setAttribute('style', 'display:none');
        this.$reset_button.setAttribute('style', 'display:none');
        this.rain();
    };
    ;
    /**
     *
     */
    Tetris.prototype.toggle = function () {
        if (this.is_playing === false) {
            this.play();
        }
        else {
            this.reset();
        }
    };
    /**
     *
     *
     * @returns {boolean}
     * @this options
     */
    Tetris.prototype.bewegeFigur = function (options) {
        var figur_id = options.figur_id;
        var zeile = options.zeile;
        var left = options.spalte * 50;
        var top = 850 - (50 * zeile);
        var clone_id = 'figur-' + this.figur_zaehler;
        var figur = document.getElementById(figur_id);
        var clone = figur.cloneNode(true);
        clone.id = clone_id;
        this.figur_zaehler++;
        clone.style.display = 'block';
        clone.classList.add('active');
        clone.style.left = left + 'px';
        clone.style.top = top + 'px';
        document.body.appendChild(clone);
        var clone_animate = document.getElementById(clone_id);
        var scope = this;
        setTimeout(function () {
            var duration = scope.getRandomIntInclusive(15, 45);
            // clone_animate.classList.add('position-ende');
            clone_animate.classList.add('bounceAndRotate');
            clone_animate.style.animationDuration = duration + '00ms';
            //  clone_animate.classList.add('rotate90');
        }, 100);
        return true;
    };
    /**
     *
     *
     * @returns {*|string}
     */
    Tetris.prototype.randomFigur = function () {
        var zufall = this.getRandomIntInclusive(0, 6);
        return this.figuren[zufall];
    };
    /**
     *
     *
     */
    Tetris.prototype.rain = function () {
        this.is_playing = true;
        this.aufbau_zeilen();
        this.interval.make(this.aufbau_zeilen, 1000);
        if (this.zeile_aktuell === this.zeilen_max) {
            // clearInterval(interval_zeilen)
            this.interval.clearAll();
        }
    };
    Tetris.prototype.getFromPool = function () {
        var anzahl = this.spalten_pool.length;
        var zufall_zahl = this.getRandomIntInclusive(1, anzahl);
        return this.spalten_pool.splice(zufall_zahl, 1);
    };
    Tetris.prototype.figurtest = function () {
        var options = {};
        options.figur_id = 'figur-test';
        options.spalte = 1;
        options.zeile = 1;
        this.bewegeFigur(options);
    };
    Tetris.prototype.removeGeneratedFigures = function () {
        this.$container_figuren.parentNode.removeChild(this.$container_figuren);
    };
    // Zufallszahlen inklusive die Randbedingungen
    Tetris.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Tetris;
}());
exports.default = Tetris;
