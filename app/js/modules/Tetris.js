"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interval_1 = require("./Interval");
var OstUtil_1 = require("./OstUtil");
var Tetris = /** @class */ (function () {
    function Tetris() {
        var _this = this;
        this.figur_zaehler = 1;
        this.spalten_pool = [];
        this.spalten = 10;
        this.zeilen = 20;
        this.zeile_aktuell = 0;
        this.delay_ebene_h_spalten = 100;
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
        this.$reset_button = document.getElementsByClassName('play-button')[0];
        this.$play_button = document.getElementsByClassName('reset-button')[0];
        /**
         *
         *
         */
        this.play = function () {
            _this.is_playing = true;
            // Playbutton ausblenden
            _this.$play_button.setAttribute('style', 'display:none');
            _this.$reset_button.setAttribute('style', 'display:none');
            _this.rain();
        };
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
            _this.init();
            _this.$play_button.style.display = 'block';
            _this.$reset_button.style.display = 'none';
        };
        this.init();
        this.interval = new Interval_1.Interval();
        this.ostUtil = new OstUtil_1.OstUtil();
        // DOM Loaded
        var scope = this;
        window.document.addEventListener("load", function () {
            // Handle event
            scope.addEventListeners();
        });
    }
    Tetris.prototype.init = function () {
        // füllen:
        for (var i = 1; i < this.spalten; i++) {
            this.spalten_pool.push(i);
        }
        console.log(this.spalten_pool);
    };
    Tetris.prototype.addEventListeners = function () {
        this.$play_button.addEventListener('click', this.play);
        this.$reset_button.addEventListener('click', this.reset);
    };
    ;
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
        clone.classList.add('active');
        clone.style.left = left + 'px';
        clone.style.top = top + 'px';
        clone.style.display = 'block';
        document.body.appendChild(clone);
        var clone_animate = document.getElementById(clone_id);
        setTimeout(function () {
            var duration = this.getRandomIntInclusive(15, 45);
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
        var zufall = this.ostUtil.getRandomIntInclusive(0, 6);
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
        if (this.zeile_aktuell === this.zeilen) {
            // clearInterval(interval_zeilen)
            this.interval.clearAll();
        }
    };
    /**
     * delay : zeit zwischen zwei figuren
     *
     */
    Tetris.prototype.aufbau_zeilen = function () {
        console.log('-------------  neue zeile  ----------------');
        console.log(this.zeile_aktuell);
        console.log(this.zeilen);
        console.log(this.delay_ebene_h_spalten);
        if (this.zeile_aktuell === this.zeilen) {
            this.interval.clearAll();
        }
        // Spalten abarbeiten:
        // fülle ein Array mit zahlen von 1 bis 10
        // nimm aus dem Array zufällig eine Zahl heraus,
        // mach das mit allen Zahlen, bis das Array leer ist
        // poolfüllen:
        this.init();
        this.zeile_aktuell++;
        this.interval.make(aufbau_spalten, this.delay_ebene_h_spalten);
        var zaehler = 1;
        function aufbau_spalten() {
            // Solange nummern im Pool sind, weitermachen
            if (this.spalten_pool.length === 1) {
                // clearInterval(interval_spalten);
                this.interval.clear(0);
            }
            var spalte = this.getFromPool();
            if (spalte > 0) {
                console.log(zaehler + ' Spalte:' + spalte);
                var options = {};
                options.figur_id = 'figur-' + this.randomFigur();
                options.spalte = spalte;
                options.zeile = this.zeile_aktuell;
                this.bewegeFigur(options);
            }
            zaehler++;
        }
        // Die zeit vom herunterfallen mit jedem durchlauf verzögern
        this.delay_ebene_h_spalten += 10;
    };
    Tetris.prototype.animate = function () {
        var all_blocks = document.getElementsByClassName('block');
    };
    Tetris.prototype.getFromPool = function () {
        var anzahl = this.spalten_pool.length;
        var zufall_zahl = this.ostUtil.getRandomIntInclusive(1, anzahl);
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
    return Tetris;
}());
exports.Tetris = Tetris;
