import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

// Utilizando o mesmo nome do método que vou testar
describe(CalculatorService.name, () => {

    // Forçando o erro em um teste
    // it("should fail", () => {
    //     fail()
    // })

    // Setando que este teste está pendente
    // it("should add two numbers", () => {
    //     pending()
    // })

    // Especificando o que será validado no teste
    // it("should add two numbers", () => {
    //     // Gerando uma instancia do CaculatorService
    //     const calculator = new CalculatorService(new LoggerService());

    //     //Acessando um método da classe
    //     const result = calculator.add(2,2)

    //     //Expecificando o retorno esperado
    //     expect(result).toBe(4)
    // })

    // it("should substract two numbers", () => {
    //     const calculator = new CalculatorService(new LoggerService())
    //     const result = calculator.subtract(2,2)
    //     expect(result).toBe(0)
    // })

    // Exemplo de erro no valor esperado: Esperado: 0 e retornando 4
    // it("should substract two numbers", () => {
    //     const calculator = new CalculatorService(new LoggerService())
    //     const result = calculator.subtractErrorExample(2,2)
    //     expect(result).toBe(0, "Valor esperado inválido")
    // })

    // it("should add two numbers [spyOn loggerService]", () => {
    //     const logger = new LoggerService()
    //     spyOn(logger, 'log')

    //     const calculator = new CalculatorService(logger)
    //     const result = calculator.add(2,2)

    //     expect(result).toBe(4)

    //     // Setando a quantidade máxima que meu método deve ser instanciado
    //     expect(logger.log).toHaveBeenCalledTimes(1)
    // })

    // it("should add two numbers [createSpyObj loggerService]", () => {
    //     // Criando uma Fake Depency do loggerService
    //     const logger = jasmine.createSpyObj('LoggerService', ['log'])

    //     const calculator = new CalculatorService(logger)
    //     const result = calculator.add(2,2)

    //     expect(result).toBe(4)

    //     // Setando a quantidade máxima que meu método deve ser instanciado
    //     expect(logger.log).toHaveBeenCalledTimes(1)
    // })

    // it("should subtract two numbers [createSpyObj loggerService]", () => {
    //     const logger = jasmine.createSpyObj("loggerService", ["log"])
    //     const calculator = new CalculatorService(logger)
    //     const result = calculator.subtract(2,2)
    //     expect(result).toBe(0, "Valor esperado diferente de 0")
    //     expect(logger.log).toHaveBeenCalledTimes(1)
    // })

    //Disponibilizando as variaveis no escopo global
    let calculator: CalculatorService,
        loggerSpy: any

    beforeEach(() => {
        console.log("Calling beforeEach")
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log'])

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        })
        
        calculator = TestBed.inject<CalculatorService>(CalculatorService);
    })

    it(`#${CalculatorService.prototype.add.name} should add two numbers`, () => {
        console.log("Calling add")
        const result = calculator.add(2,2)
        expect(result).toBe(4, "Valor esperado diferente de 4")
        expect(loggerSpy.log).toHaveBeenCalledTimes(1)
    })

    
    it(`#${CalculatorService.prototype.subtract.name} should subtract two numbers`, () => {
        console.log("Calling subtract")
        const result = calculator.subtract(2,2)
        expect(result).toBe(0, "Valor esperado diferente de 0")
        expect(loggerSpy.log).toHaveBeenCalledTimes(1)
    })
})