import {Interval} from "./Interval";
import {OstUtil} from "./OstUtil";

export class Tetris {
    interval: Interval;
    greeting: string;
    is_playing: boolean;
    figur_zaehler: number = 1;
    spalten_pool: any = [];
    spalten: number = 10;
    zeilen: number = 20;
    zeile_aktuell: number = 0;
    delay_ebene_h_spalten: number = 100;
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




    $container_figuren:HTMLDivElement = document.getElementById('container-figuren') as HTMLDivElement;


    // Buttons
    $reset_button: HTMLButtonElement = document.getElementsByClassName('play-button')[0] as HTMLButtonElement;
    $play_button: HTMLButtonElement = document.getElementsByClassName('reset-button')[0] as HTMLButtonElement;
    private ostUtil: OstUtil;


    constructor() {

        this.init();
        this.interval = new Interval();
        this.ostUtil = new OstUtil();

        // DOM Loaded
        const scope = this;
        window.document.addEventListener("load", function () {
            // Handle event
            scope.addEventListeners();
        });
    }


    public init() {

        // füllen:
        for (let i = 1; i < this.spalten; i++) {
            this.spalten_pool.push(i);
        }
        console.log(this.spalten_pool);

    }

    private addEventListeners() {

        this.$play_button.addEventListener('click', this.play);
        this.$reset_button.addEventListener('click', this.reset);

    };


    /**
     *
     *
     */
    public play = () => {
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


        this.init();
        this.$play_button.style.display = 'block';
        this.$reset_button.style.display = 'none';
    };

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
    public bewegeFigur(options: any) {


        let figur_id = options.figur_id;
        let zeile = options.zeile;
        let left = options.spalte * 50;

        let top = 850 - (50 * zeile);

        let clone_id = 'figur-' + this.figur_zaehler;
        const figur: HTMLDivElement = document.getElementById(figur_id) as HTMLDivElement;
        let clone: HTMLDivElement = figur.cloneNode(true) as HTMLDivElement;
        clone.id = clone_id;

        this.figur_zaehler++;

        clone.classList.add('active');
        clone.style.left = left + 'px';
        clone.style.top = top + 'px';
        clone.style.display = 'block';


        document.body.appendChild(clone);
        const clone_animate = document.getElementById(clone_id);

        setTimeout(function () {

            let duration = this.getRandomIntInclusive(15, 45);

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
        let zufall = this.ostUtil.getRandomIntInclusive(0, 6);
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

        if (this.zeile_aktuell === this.zeilen) {
            // clearInterval(interval_zeilen)
            this.interval.clearAll();
        }
    }


    /**
     * delay : zeit zwischen zwei figuren
     *
     */
    public aufbau_zeilen() {
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

        let zaehler = 1;

        function aufbau_spalten() {
            // Solange nummern im Pool sind, weitermachen
            if (this.spalten_pool.length === 1) {
                // clearInterval(interval_spalten);
                this.interval.clear(0);
            }

            let spalte = this.getFromPool();

            if (spalte > 0) {
                console.log(zaehler + ' Spalte:' + spalte);

                let options: any = {};
                options.figur_id = 'figur-' + this.randomFigur();
                options.spalte = spalte;
                options.zeile = this.zeile_aktuell;
                this.bewegeFigur(options)
            }
            zaehler++;
        }

        // Die zeit vom herunterfallen mit jedem durchlauf verzögern
        this.delay_ebene_h_spalten += 10;
    }

    public animate() {
        let all_blocks = document.getElementsByClassName('block');
    }


    public getFromPool() {
        let anzahl = this.spalten_pool.length;
        let zufall_zahl = this.ostUtil.getRandomIntInclusive(1, anzahl);
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

}

