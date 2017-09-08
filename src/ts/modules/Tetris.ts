import Interval from "./Interval";
// import OstUtil from "./OstUtil";


export default class Tetris {
    interval = new Interval();
    // ostUtil = new OstUtil();
    is_playing: boolean;
    figur_zaehler: number;
    spalten_pool: any;
    spalten_max: number;
    zeilen_max: number;
    zaehler_spalte: number;
    zeile_aktuell: number;
    delay_ebene_h_spalten: number;
    figuren: any = [
        'quadrat',
        'lang',
        'dreierspitz',
        'zhochrechts',
        'zhochlinks',
        'lrechts',
        'llinks'
    ];

    // DOM
    $container_figuren: HTMLDivElement = document.getElementById('container-figuren') as HTMLDivElement;

    // Buttons
    $play_button: HTMLDivElement = document.getElementsByClassName('play-button')[0] as HTMLDivElement;
    $reset_button: HTMLDivElement = document.getElementsByClassName('reset-button')[0] as HTMLDivElement;

    /**
     *
     *
     */
    constructor() {
        console.log('--------  constructor  ---------------');
        this.addEventListeners();
        this.reset_data();
        this.reset_spalten_pool();

        this.play();

    }


    public reset_data() {
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

    }

    public reset_spalten_pool() {
        console.log('--------  reset_spalten_pool  ---------------');

        // füllen:
        for (let i = 1; i < this.spalten_max; i++) {
            this.spalten_pool.push(i);
        }
        console.log(this.spalten_pool);

    }

    private addEventListeners() {

        let scope = this;
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


    /**
     *
     *
     */
    public play() {
        this.is_playing = true;

        // Playbutton ausblenden
        this.$play_button.setAttribute('style', 'display:none');
        this.$reset_button.setAttribute('style', 'display:none');

        this.rain();

    };

    /**
     *
     *
     */
    public reset = () => {
        console.log('reset');
        this.is_playing = false;

        this.interval.clearAll();

        let nodes = document.getElementsByClassName('figur'),
            i = nodes.length;

        while (i--) {
            nodes[i].classList.remove('bounceAndRotate');
        }
        this.removeGeneratedFigures();

        this.reset_spalten_pool();
        this.$play_button.style.display = 'block';
        this.$reset_button.style.display = 'none';
    };

    /**
     *
     */
    public toggle() {
        if (this.is_playing === false) {
            this.play();
        }
        else {
            this.reset();
        }


    }

    /**
     *
     *
     * @returns {boolean}
     * @this options
     */
    public bewegeFigur( options: any ) {


        let figur_id = options.figur_id;
        let zeile = options.zeile;
        let left = options.spalte * 50;

        let top = 850 - (50 * zeile);

        let clone_id = 'figur-' + this.figur_zaehler;
        const figur: HTMLDivElement = document.getElementById(figur_id) as HTMLDivElement;
        let clone: HTMLDivElement = figur.cloneNode(true) as HTMLDivElement;
        clone.id = clone_id;

        this.figur_zaehler++;

        clone.style.display = 'block';
        clone.classList.add('active');
        clone.style.left = left + 'px';
        clone.style.top = top + 'px';


        document.body.appendChild(clone);
        const clone_animate = document.getElementById(clone_id);

        const scope = this;
        setTimeout(function () {

            let duration = scope.getRandomIntInclusive(15, 45);

            // clone_animate.classList.add('position-ende');
            clone_animate.classList.add('bounceAndRotate');
            clone_animate.style.animationDuration = duration + '00ms';
            //  clone_animate.classList.add('rotate90');

        }, 100);

        return true;
    }


    /**
     *
     *
     * @returns {*|string}
     */
    public randomFigur() {
        let zufall = this.getRandomIntInclusive(0, 6);
        return this.figuren[zufall];
    }

    /**
     *
     *
     */
    public rain() {
        this.is_playing = true;
        this.aufbau_zeilen();
        this.interval.make(this.aufbau_zeilen, 1000);

        if (this.zeile_aktuell === this.zeilen_max) {
            // clearInterval(interval_zeilen)
            this.interval.clearAll();
        }
    }


    /**
     * delay : zeit zwischen zwei figuren
     *
     */
    public aufbau_zeilen = () => {
        console.log('-------------  neue zeile  ----------------');
        console.log('-- zeile_aktuell:'+ this.zeile_aktuell);
        console.log('-- zeilen_max:'+ this.zeilen_max);
        console.log('-- delay_ebene_h_spalten:'+ this.delay_ebene_h_spalten);

        if (this.zeile_aktuell === this.zeilen_max) {
            this.interval.clearAll();
        }

        // Spalten abarbeiten:
        // fülle ein Array mit zahlen von 1 bis 10
        // nimm aus dem Array zufällig eine Zahl heraus,
        // mach das mit allen Zahlen, bis das Array leer ist

        // poolfüllen:
        this.reset_spalten_pool();

       // this.zaehler_spalte = 1;
        this.interval.make(this.aufbau_spalten, this.delay_ebene_h_spalten);
        this.zeile_aktuell++;

        // Die zeit vom herunterfallen mit jedem durchlauf verzögern
        this.delay_ebene_h_spalten += 10;
    };


    public aufbau_spalten = () => {
        // Solange nummern im Pool sind, weitermachen
        console.log('spalten_pool.length:' +this.spalten_pool.length);
        if (this.spalten_pool.length === 1) {
            this.interval.clear(0);
        }

        let spalte = this.getFromPool();

        if (spalte > 0) {
            console.log(this.zaehler_spalte + ' Spalte:' + spalte);

            let options: any = {};
            options.figur_id = 'figur-' + this.randomFigur();
            options.spalte = spalte;
            options.zeile = this.zeile_aktuell;
            this.bewegeFigur(options)
        }
        this.zaehler_spalte++;
    };


    public getFromPool() {
        let anzahl = this.spalten_pool.length;
        let zufall_zahl = this.getRandomIntInclusive(1, anzahl);
        return this.spalten_pool.splice(zufall_zahl, 1);
    }


    public figurtest() {
        let options: any = {};
        options.figur_id = 'figur-test';
        options.spalte = 1;
        options.zeile = 1;
        this.bewegeFigur(options)
    }


    public removeGeneratedFigures() {
        this.$container_figuren.parentNode.removeChild(this.$container_figuren);
    }

    // Zufallszahlen inklusive die Randbedingungen
    public getRandomIntInclusive( min: number, max: number ) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
