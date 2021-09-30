const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
let red = document.getElementById('red1')
let yellow = document.getElementById('yellow1')
let green = document.getElementById('green1')


inclRed = () => {
    red.style.background = 'red';
}
inclYellow = () => {
    yellow.style.background = 'yellow';
}
inclGreen = () => {
    green.style.background = 'green';
}
putOutLight = () => {
    red.style.background = 'gray';
    yellow.style.background = 'gray';
    green.style.background = 'gray';
}

async function trafficLight(){
    while(true){
        putOutLight()
        inclRed()
        await delay(5000)
        putOutLight()
        inclYellow()
        await delay(2500)
        putOutLight()
        inclGreen()
        await delay(5000)
        putOutLight()
        inclYellow()
        await delay(2500)
        putOutLight()
        trafficLight()
    }
}
trafficLight()


