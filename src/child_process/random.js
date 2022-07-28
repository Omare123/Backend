
process.on('message', msg => {
    let response = {}
    let cant = Number.parseInt(msg)
    for(let i = 1; i< cant; i++){
        let random = Math.trunc((Math.random() * (999)) + 1);
        if(!response[`${random}`])
            response[`${random}`] = 1;
        else
            response[`${random}`] += 1;
    }
    let send = Object.entries(response).map(n => { return `${n[0]}: ${n[1]}`}).join(', ');
    process.send(send);
    process.exit();
});

process.send('start')