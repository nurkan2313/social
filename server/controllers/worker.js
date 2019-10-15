require('dotenv').config();
const axios = require('axios');
const Pool = require('pg').Pool;
const moment = require('moment');

const pool = new Pool({
  user: 'admin',
  host: '109.71.231.47',
  database: 'receiver',
  password: 'clk50011',
  port: 5432
});

   
function social_mess_pack(request, response, next) {

    const msisdn = request.body.msisdn;
  
    axios.post(`http://10.230.165.8:8080/MegaBuilder-war/process`, null, { params: {
                  servid: 2875,
                  abonent: msisdn,
                  sm: 4,
                  type: 0,
                  period: 30,
                  action: 1,
                  token: 'a9e0e4ca-b73c-11e9-a2a3-2a2ae2dbcce4'
    }})
       .then(async resp => {
              let res = resp.data;
  
              if(res.status === 1) {
                     payload = {
                       data: resp.data,
                       msg: "Активировано на 30 дней"
                     };
  
                     axios.post(`http://10.230.165.10/mb/process`, null, { params: {
                          servid: 3568,
                          msisdn: msisdn,
                          msg: "Uvazhaemyj abonent, Vy podkljuchili tarifnuju opciju 'Instagram' na 30 dnej za 60 somov. Vam predostavlen 800gb i bolee Instagram'a na 30 0 dnej. Otkluchit opciju: *6161*4*0#"
                        }})
                       .then(async nextData => {
                            payload = {
                                data: res,
                                msg: "Активировано на 30 дней"
                            };

                            return response.status(200).send(payload);
                            }).catch(err => { console.log(err); return response.status(400).send("api error");})
        
                         }
        
                         if(res.status === -1 || res.status === -3  || res.status === -4  || res.status === -5
                             || res.status === -6 || res.status === -8  || res.status === -9  || res.status === -10) {
        
                             return response.status(200).send(res);
                         }
        
        
                         if(res.status === -2) {
                            axios.post(`http://10.230.165.8:8080/MegaBuilder-war/process`, null, { params: {
                                         servid: 2875,
                                         abonent: msisdn,
                                         sm: 4,
                                         period: 1,
                                         type: 1,
                                         action: 1,
                                         token: 1
                                        }})
                                        .then(plug => {
                                          payload = {
                                                data: plug.data,
                                                msg: "Активировано на один день"
                                          };
               
                                          axios.post(`http://10.230.165.10/mb/process`, null, { params: {
                                              servid: 3568,
                                              msisdn: msisdn,
                                             msg: "Uvazhaemyj abonent, Vam predostavlen BESPLATNYJ Instagram na 1 den. S zavtrashnego dnja u vas podkljuchitsja BEZLIMITNYJ Instagram za 4 soma v sutki. Otkluchit opciju: *6161*4*0#"

                                          }})
                                         .then(async nextData => {
                                            return response.status(200).send(payload);
                                     }).catch(err => { console.log(err); return response.status(400).send("api error");})
               
                                   })
               
                                }
                                if(res.status === -7) {
                                    axios.post(`http://10.230.165.8:8080/MegaBuilder-war/process`, null, { params: {
                                            servid: 2875,
                                            abonent: msisdn,
                                            sm: 4,
                                            period: 1,
                                            type: 1,
                                            action: 1,
                                            token: 1
                                    }})
                                    .then(plug => {
                                      payload = {
                                            data: plug.data,
                                            msg: "Активировано на один день"
                                      } 
           
                                     axios.post(`http://10.230.165.10/mb/process`, null, { params: {
                                   servid: 3568,
                                   msisdn: msisdn,
                                   msg: "Uvazhaemyj abonent, Vam predostavlen BESPLATNYJ Instagram na 1 den. S zavtrashnego dnja u vas podkljuchitsja BEZLIMITNYJ Instagram za 4 soma v sutki. Otkluchit opciju: *6161*4*0#"

                                }})
                               .then(async re => {
                                      return response.status(200).send(payload);
                                }).catch(err => { console.log(err); return response.status(400).send("api error");})
          
                              })
          
                           }
                      }).catch(err => { console.log(err); return response.status(400).send("api error");})
                  }
          
async function social_mess_pack_whats(request, response, next) {
        const msisdn = request.body.msisdn;
        const sm =  request.body.sm;
        const type = request.body.type;
        const period = request.body.period;

        axios.post(`http://10.230.165.8:8080/MegaBuilder-war/process`, null, { params: {
            servid: 2875,
            abonent: msisdn,
            sm: sm,
            type: type,
            period: period,
            action: 1,
            token: 'a9e0e4ca-b73c-11e9-a2a3-2a2ae2dbcce4'
        }})
        .then(async resp => {
            let res = resp.data;

                return response.status(200).send(res);
            }

        ).catch(err => { console.log(err); return response.status(400).send("api error");})
    }
               
async function sendMsgApi(req, res, next) {

        const msisdn = req.body.msisdn;
        const msg = req.body.msg;
        axios.post(`http://10.230.165.10/mb/process`, null, { params: {
                        servid: 3568,
                        msisdn: msisdn,
                        msg: msg
        }})
	.then(response => {
           return res.status(200).send(response.data)
       }).catch(err => console.log(err))

}

async function textReceiver(req, res, next) {
    const from = req.body.msisdn;
    const to = req.body.sender;
    const text = req.body.text;
    await pool.query(`INSERT into data (msisdn, sender, text, date) VALUES('${from}', '${to}', '${text}', now()  AT TIME ZONE 'Asia/Bishkek')`);
    return res.status(200).send({"success": true})
}
  
async function getTextReceiver(req, res, next) {
   let result = await pool.query(`SELECT *  FROM data where
                      date < (now() AT TIME ZONE 'Asia/Bishkek') AND date >= (now() AT TIME ZONE 'Asia/Bishkek' - '10 minutes'::interval);`);
   return res.status(200).send({"success": true, data: result.rows})
}
  

module.exports = {
    social_mess_pack,
    social_mess_pack_whats,
    sendMsgApi,
    textReceiver,
    getTextReceiver
}
