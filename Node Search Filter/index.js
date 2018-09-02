const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

app.set('port', process.env.port || 3000)
app.listen(app.get('port'), ()=>{
    console.log('server corriendo en puerto: ' + app.get('port'))
})


