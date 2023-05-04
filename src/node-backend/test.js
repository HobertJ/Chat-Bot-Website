let ditepati = true;

const janji2 = new Promise((resolve, reject) => {
    if(ditepati){
        setTimeout(() => {
            resolve('Ditepati setelah beberapa waktu!');
        }, 2000)
    }else{
        setTimeout(() => {
            reject('Tidak Ditepati setelah beberapa waktu!');
        }, 2000)
    }
});


console.log('mulai');
// janji2
//     .then(response => console.log('OK : ' + response))
//     .catch(response => console.log('NOT OK! : ' + response));
console.log(janji2.then(() => console.log(janji2)));
console.log('selesai');