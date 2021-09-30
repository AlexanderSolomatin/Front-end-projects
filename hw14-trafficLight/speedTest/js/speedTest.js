async function speedtest(getPromise, count,parallel=1){   
    let duration
    let querySpeed
    let queryDuration
    let parallelSpeed
    let parallelDuration
    let promiseArr = []
    let t0 = performance.now()
    for(let i = 0; i < count; i++){
        promiseArr = []
        for(let j = 0; j < parallel; j++){
            promiseArr.push(getPromise())
        }        
        await Promise.all(promiseArr)              
    }
    let t1 = performance.now()
    duration = t1 - t0
    return {
        duration,
        querySpeed, 
        queryDuration, 
        parallelSpeed,
        parallelDuration
    }  
    
}
//count * paralell / duration

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))
speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))

// speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)











