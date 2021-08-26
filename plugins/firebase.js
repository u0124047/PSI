import firebase from 'firebase/app';

import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

let firebaseConfig = {
    databaseURL: "https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app",
}

// 確認firebase是否準備初始化
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();