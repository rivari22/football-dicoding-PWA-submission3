var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPYaoRVHrCprZQVAFIhmfYULW-Szxe9Hj0SbhgMxnKDdQrfiyJJC7GHZl5LR2iknYOnL8TSQzkYasleyiJVmxN4",
   "privateKey": "mn7ACEGVvEyWVNz6CgMK_PUOgh2F19F-hIRg8qbV_uc"
};
 
 
webPush.setVapidDetails(
   'mailto:muchammadrvr22@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dss7jZtk8hM:APA91bGVkZttTuIZdFUQs-tLZ87JC37kYSP_EQecGWtnOg104LhYNMAnWm0wWtcsydTa_MsVdzToet_fQgfcbbihrVoZeV4KE18XB_jtMUOmGnA-DgatPP7Eoa4fY2a2xW-VXdLTHqBB",
   "keys": {
       "p256dh": "BNu+m0lBazQokqO4/Khgvx+pl3bYsVSt9e9GDt0z52s+urIFS/btv0t1roSIfJqwtVQTZU7b8IoMOlsgPrfjR+Q=",
       "auth": "tN4KjeitVIohMUJZT20tSQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi';
 
var options = {
   gcmAPIKey: '517541005326',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).then(res => console.log(`sucess ${res}`))
.catch(err => console.log(`error notif ${err}`));