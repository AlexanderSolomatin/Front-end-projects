//makeProfileTimer
let makeProfileTimer = () => {
    let t0 = performance.now()
    return () =>{
        return performance.now() - t0
    }
}
let timer =  makeProfileTimer()
alert('некий код, время выполнения которого мы хотим измерить с высокой точностью')
alert(`время выполнения = ${timer()}`)


function makeSaver(f){
    let isFlag = false
    let res;
    if(!isFlag){
        return () => {
            if(!isFlag){
                isFlag = true
                res = f()
            }
        }
    }
}
let nameSaver = makeSaver(() => prompt('Введите имя'))
let name1 = nameSaver()
let name2 = nameSaver()
console.log(name1 === name2)

let saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
let value1 = saver2()
let value2 = saver2()

console.log(value1 === value2)



//Final Countdown
let countdown = (num) =>{
    console.log(num)
    for(let i = num - 1; i > 0; i--){
        setTimeout(() => console.log(num - i), i * 1000)
    }
    setTimeout(() => console.log('поехали'),1000 * num)
}
countdown(5)


// bind

function myBind(func, context, arr){
    let indexParam = 0
    return(...params) => {
        arr2 = arr.map((x)=>{
            if(x === undefined){
                x = params[indexParam++];                
            }
            else x
        });
        return func.call(context, ...arr2)
    }
    
}
var pow5 = myBind(Math.pow, Math, [undefined, 5]) // первый параметр - функция для биндинга значений по умолчанию, 
   // второй - this для этой функции, третий - массив, в котором undefined означает
 // параметры, которые должны передаваться при вызове,
 // а другие значения являются значениями по умолчанию:

var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

pow5(2) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
cube(3) // => 27

var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9])
chessMin(-1,-5,3,15) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

var zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогично, только теперь задается "0" как текст по умолчанию в prompt, 
           // а текст приглашения пользователя задается при вызове zeroPrompt
var someNumber = zeroPrompt("Введите число")              // вызывает prompt("Введите число","0")

myBind((...params) => params.join(''), null, [undefined, 'b', undefined, undefined, 'e', 'f'])('a','c','d') === 'abcdef'

