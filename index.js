const express = require ("express")
const Expo = require("expo-server-sdk").default
const cors = require("cors")

const expo = new Expo()
const expressServer = express();

expressServer.use(cors())
expressServer.listen(process.env.PORT, () => {
console.log("Serveur en écoute sur " + (process.env.PORT || 3000));

    expressServer.get("/", function(req, res) {
        const token = req.query.token;
        if(!Expo.isExpoPushToken(token)) {
            console.log("Invalid token")
            res.send({err : "Invalid token"})
        }else {
            let messages = [
                {
                    to : token,
                    sound : "default",
                    body : "Notification test",
                    data : { test : "gsdgd" }
                }
            ]

            expo.sendPushNotificationsAsync(messages).then(ticket => {
                res.send({ticket : ticket})
            }).catch(err => {
                console.log("Erreur d'envoi")
                res.send({err : "Erreur d'envoi"})
            })
        }
    })
})