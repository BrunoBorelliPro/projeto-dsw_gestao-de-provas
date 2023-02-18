import {Soma} from '../src/Soma'
test("Deve somar 1 + 2 e o resultado deve ser igual a 3",()=>{
    const res = new Soma().execute(1,2)
    expect(res).toBe(3)
})