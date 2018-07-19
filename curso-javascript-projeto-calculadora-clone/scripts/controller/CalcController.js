class CalcController {

    //Método construtor
    constructor() {
        //Atributos da classe
        //o _ antes do nome do atributo significa que ele é privado
         /**
         * Vincula a variável com o elemento HTML
         */
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;

        this.initialize();
    }

    initialize() {
        //Adciona uma informação dentro do elemento HTML
        this._displayCalcEl.innerHTML = "457";
        this._dateEl.innerHTML = "12/12/2000";
        this._timeEl.innerHTML = "22:35";
    }

    //Métodos getters and setters
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(currentDate) {
        this.currentDate = currentDate;
    }
}