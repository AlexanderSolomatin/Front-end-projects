let url = 'http://students.a-level.com.ua:10012';
let nick = document.getElementById('nickname')
let message = document.getElementById('msg')
let send = document.getElementById('btnSend')
let chat = document.getElementById('chat')
let nextMessageId = 0;
let newMessage;

function jsonPost(url, data)
{
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();   
        x.onerror = () => reject(new Error('jsonPost failed'))        
        x.open("POST", url, true);
        x.send(JSON.stringify(data))

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                resolve(JSON.parse(x.responseText))
            }
            else if (x.status != 200){
                reject(new Error('status is not 200'))
            }
        }
    })
}

function sendMessage(){
    send.onclick = function(){
        function resolve(){
            jsonPost(url, {func : "addMessage", nick: nick.value, message: message.value})     
            console.log(nick.value, message.value); 
        }     
        function reject(){
            console.log('Пустое поле');   
        }   
        if(nick.value !== '' && message.value !== ''){ resolve() }
        else{ reject() }  
    }    
} 
sendMessage()

function getMessages(){    
    setInterval(function(){
        jsonPost(url, {func: "getMessages", messageId: nextMessageId}).then(newMessage =>{
            chat.innerHTML = ''
            for(nextMessageId in newMessage.data){
                // chat.innerHTML = ''
                let chatMsg = document.createElement('div');
                // chat.innerHTML = '';
                chatMsg.innerHTML = `${newMessage.data[nextMessageId].nick} : ${newMessage.data[nextMessageId].message} ***Время: ${new Date(newMessage.data[nextMessageId].timestamp).toLocaleString()}***`                
                chat.prepend(chatMsg)
                // chat.innerHTML = '';
            }            
        })
    },2000)
}
getMessages()

