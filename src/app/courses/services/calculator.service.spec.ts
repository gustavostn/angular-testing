import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";


describe(`${CalculatorService.name}`, () => {

    it(`#${CalculatorService.prototype.add.name} force a pending test`, () => {
        pending()
    })

    it(`#${LoggerService.prototype.log.name} should called only one time`, () => {
        const logger = new LoggerService()
        spyOn(logger, 'log')
        
        const calculator = new CalculatorService(logger)
        const response = calculator.add(1,1)
        
        expect(response).toBe(2)
        expect(logger.log).toHaveBeenCalledTimes(1)
    })

    it(`#${CalculatorService.prototype.add.name} should return amount of the sum of two numbers`, () => {
        const calculator = new CalculatorService(new LoggerService())
        const response = calculator.add(2,2)
        expect(response).toBe(4)
    })

    it(`Using a fake depency of ${LoggerService.name} and validing if sum response is a number`, () => {
        const loggerService = jasmine.createSpyObj('loggerServive',['log'])

        const calculatorService = new CalculatorService(loggerService)
        const response = calculatorService.add(2,2)
        expect(typeof(response)).toBe('number')
    })
})