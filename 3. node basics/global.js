// ovako ne treba pisati, dovoljno je
// setTimeout(....)
global.setTimeout(() => {
    console.log('timeout expired!')
}, 3000);

setTimeout(()=> {
    console.log('timeout 2 expired')
}, 4000)

setInterval(()=> {
    console.log('Interval called!')
}, 1000)
