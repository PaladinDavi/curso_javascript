class CalcController {

    //Método construtor
    constructor() {
        //Atributos da classe
        //o _ antes do nome do atributo significa que ele é privado
        /**
        * o document.querySelector vincula a variável com o elemento HTML
        */
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this._locale = "pt-BR";
        this._operator = [];
        this._lastOperator = "";
        this._lastNumber = "";

        this.initialize();
        this.initButtonsEvents();
        this.setLastNumberToDisplay();
    }

    //Métodos
    initialize() {
        this.setDateTime();
        //executa uma função em determinados milisegundo
        setInterval(() => {
            this.setDateTime();
        }, 1000);
    }

    //Método que vai adicionar mais de um evento nos botões
    addEventListenerAll(element, events, fn) {
        events.split("-").forEach(event => {
            element.addEventListener(event, fn, false);
            //o parâmetro false aborta a função
        });
    }

    //Adiciona o novo valor no array
    pushOperation(value) {
        this._operator.push(value);

        if (this._operator.length > 3) {
            this.calc();
            // console.log("mais de três valores", this._operator);
        }
    }

    //Calcula
    calc() {
        let lastOp = "";
        let result;

        //Armazenando o último operador
        this._lastOperator = this.getLastItem();

        if (this._operator.length < 3) {
            //Armazena o primeiro valor
            let firstNumber = this._operator[0];

            this._operator = [firstNumber, this._lastOperator, this._lastNumber];
        }

        if (this._operator.length > 3) {
            //Armazenando o último operador
            lastOp = this._operator.pop();
            
            //Armazenando o último número
            this._lastNumber = this.getResult();
        }
        else if (this._operator.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        result = this.getResult();   

        if (lastOp == "%") {
            result /= 100;

            this._operator = [result];

            this.setLastNumberToDisplay();
        }
        else {
            //Armazendo o resultado no array e o operador que foi removido
            this._operator = [result];

            if (lastOp) {
                this._operator.push(lastOp);
            }

            this.setLastNumberToDisplay();
        }
    }

    //Calcula e retorna o resultado
    getResult() {
        //O método eval interpreta o código javascript dentro de uma string
        //O método junta as informações em uma string
        return eval(this._operator.join(""));
    }

    //Adiciona o ponto
    addDot() {
        let lastOperation = this.getLastOperator();

        //Evita que mais de um ponto seja colocado
        if (typeof lastOperation === "string" && lastOperation.split("").indexOf(".")) {
            //Sai do método
            return;
        }
        //verifica se é um operador ou se não há nada na variável
        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation("0.");
        }
        else {
            this.setLastOperator(lastOperation.toString() + ".");
        }

        this.setLastNumberToDisplay();
    }

    //Adiciona uma operação
    addOperation(value) {
        /**
         * isNaN verifica se o valor passado no parâmetro não é 
         * um número e retorna true se não for um número e retorna
         * false se for
         */
        if (isNaN(this.getLastOperator())) {
            if (this.isOperator(value)) {
                //Troca o operador aritimético
                this.setLastOperator(value);
            }
            else {
                this.pushOperation(value);
                
                this.setLastNumberToDisplay();  
            }
        }
        else {
            if (this.isOperator(value)){
                //Adiciona o operador ao array operator
                this.pushOperation(value);
            }
            else {
                 //Concatenação dos números
                let newValue = this.getLastOperator().toString() + value.toString();

                //Converte e adiciona no valor
                this.setLastOperator(newValue);

                //Atualizar o display da calculadora
                this.setLastNumberToDisplay();
            }
        }
        //console.log(this._operator);
    }

    //Atualiza o display
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) {
            lastNumber = 0
        }
        this.displayCalc = lastNumber;
    }

    //Esse método pega o último item do array
    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operator.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operator[i]) == isOperator) {
                //Pega o último operador
                lastItem = this._operator[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }

    //Concatena os valores
    setLastOperator(value) {
        this._operator[this._operator.length - 1] = value;
    }

    //Esse método pega o último valor do array
    getLastOperator() {
        return this._operator[this._operator.length - 1];
    }

    //Verifica se um operador já foi escolhido
    isOperator(value) {
        if (["+", "-", "*", "/", "%"].indexOf(value) > -1) {
            return true;
        }
        else {
            return false;
        }
        //Outro jeito de fazer essa validação
        //return (["+", "-", "*", "/", "%"].indexOf(value) > -1)]);
    }

    clearAll() {
        //'Limpa' o array
        this._operator = [];
        this._lastNumber = "";
        this._lastOperator = "";

        this.setLastNumberToDisplay();
    }

    clearEntry() {
        //Remove o último valor do array
        this._operator.pop();

        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = "Error";
    }

    //Executa a ação do botão
    execBtn(value) {
        switch (value) {
            case "ac":
                this.clearAll();
                break;
            case "ce": 
                this.clearEntry();
                break;
            case "soma":
                this.addOperation("+");
                break;
            case "subtracao":
                this.addOperation("-");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "igual":
                this.calc();
                break;
            case "ponto":
                this.addDot();
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
            default:
            this.setError();
                break;
        }
    }

    initButtonsEvents() {
        //Está pegando todos os filhos de buttons e os filhos de parts
        //O simbolo > repesenta os filhos do elemento HTML
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //Adicionando eventos
        buttons.forEach((element) => {
            this.addEventListenerAll(element, "click-drag", e => {
                //Trazendo a classe do botão e removendo o btn-
                let textBtn = element.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            });

            //Mudando o cursor do mouse
            this.addEventListenerAll(element, "mouseover-mouseup-mousedown", e => {
                element.style.cursor = "pointer";
            });
        });
    }

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