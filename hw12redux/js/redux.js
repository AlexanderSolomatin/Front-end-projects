let kassa = document.getElementById('kassa')
let beer = document.getElementById('beer')
let chips = document.getElementById('chips')
let cigarette = document.getElementById('cigarette')
let ubalance = document.getElementById('ubalance')
let clientChoiсe = document.getElementById('clientChoiсe')
let buyBtn = document.getElementById('buyBtn')
let num = document.getElementById('num')

function createStore(reducer){
    let state = reducer(undefined, {})
    let cbs   = []
    return {
        dispatch(action){
            const newState = reducer(state, action)
            if (newState !== state){
                state = newState
                for (let cb of cbs) 
                    cb()
            }
        },
        getState(){
            return state
        },
        subscribe(cb){
            cbs.push(cb)
            return () => cbs = cbs.filter(c => c !== cb)
        }
    }
}

function reducer(state, {type, ШО, СКОКА, money}) {
    if (!state){
        return {
            пиво: {
                СКОКА:100, price: 50
            },
            чипсы: {
                СКОКА:100, price: 40
            },
            сиги: {
                СКОКА:100, price: 60
            },
            kassa: 0,
            ubalance: 999510,
        }
    }
    if(type === 'КУПИТЬ'){
        return {
            ...state,
            kassa:state.kassa + state[ШО].price * СКОКА,
            [ШО]: {
                СКОКА: state[ШО].СКОКА - СКОКА,
                price: state[ШО].price
            },
            ubalance: state.ubalance - state[ШО].price * СКОКА 
        }
    }
    return state
}

const store = createStore(reducer)

let state = store.getState()
kassa.innerText = `Касса: ${state.kassa}`;
beer.innerText = `Пиво: ${state.пиво.price} грн, ${state.пиво.СКОКА} шт`;
chips.innerText = `Чипсы: ${state.чипсы.price} грн, ${state.чипсы.СКОКА} шт`;
cigarette.innerText = `Сиги: ${state.сиги.price} грн, ${state.сиги.СКОКА} шт`;
ubalance.innerText = `В вашем кошельке ${state.ubalance} грн`


function actionCreator() {
    buyBtn.onclick = () => {
        let state = store.getState()
            if (num.value < state[clientChoiсe.value].СКОКА && state.ubalance > (num.value * state[clientChoiсe.value].price)){
            return store.dispatch({type: 'КУПИТЬ', ШО: clientChoiсe.value, СКОКА: +num.value})
        }
        else{
            alert('error')
        }
    }
}
  
store.subscribe(() => {
    let state = store.getState()
    kassa.innerText = `Касса: ${state.kassa}`;
    beer.innerText = `Пиво: ${state.пиво.price}грн, ${state.пиво.СКОКА}шт`;
    chips.innerText = `Чипсы: ${state.чипсы.price}грн, ${state.чипсы.СКОКА}шт`;
    cigarette.innerText = `Сигареты: ${state.сиги.price}грн, ${state.сиги.СКОКА}шт`;
    ubalance.innerText = `У вас осталось ${state.ubalance}грн`;
})
  
actionCreator(state)






