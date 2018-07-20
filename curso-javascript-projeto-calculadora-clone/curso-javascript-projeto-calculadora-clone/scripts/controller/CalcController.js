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
        this._locale = "pt-BR";

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDateTime();
        //executa uma função em determinados milisegundo
        setInterval(() => {
            this.setDateTime();
        }, 1000);
    }

    initButtonsEvents() {
        //Está pegando todos os filhos de buttons e os filhos de parts
        //O simbolo > repesenta os filhos do elemento HTML
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //Adicionando eventos
        buttons.forEach((element, index) => {
            element.addEventListener("click", e => {
                //Trazendo a classe do botão e removendo o btn-
                console.log(element.className.baseVal.replace("btn-", ""));
            });
        });
    }

    //Métodos 
    setDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            //personalizando a data
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
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