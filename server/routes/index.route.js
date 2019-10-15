const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/worker');
const social = require('../controllers/users.controller')

router.route('/social_networks/whatsapp').post(userCtrl.social_mess_pack_whats);
router.route('/social_networks/instagram').post(userCtrl.social_mess_pack);
router.route('/social_networks/send_sms').post(userCtrl.sendMsgApi);

router.route('/social_networks/get_tariff').post(social.getIncludedTariffs);
router.route('/social_networks/get_tariff_code_two').post(social.getIncludedTariffsCodeTwo);
router.route('/social_networks/get_tariff_code_three').post(social.getIncludedTariffsCodeThree);
router.route('/social_networks/get_tariff_code_four').post(social.getIncludedTariffsCodeFour);

router.route('/social_networks/receive_text').post(userCtrl.textReceiver);
router.route('/social_networks/get_text').get(userCtrl.getTextReceiver);

router.use('/social_networks/user', userRoutes);

module.exports = router;

