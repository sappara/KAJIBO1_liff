"use strict";

window.onload = function () {
  const useNodeJS = true; // if you are not using a node server, set this value to false
  const defaultLiffId = ""; // change the default LIFF value if you are not using a node server

  // DO NOT CHANGE THIS
  let myLiffId = "";
  // // let profileId = [];
  // // profileId = jsonResponse.datas;
  // let datas = "";

  // if node is used, fetch the environment variable and pass it to the LIFF method
  // otherwise, pass defaultLiffId
  if (useNodeJS) {
    fetch("/send-id")
      .then(function (reqResponse) {
        return reqResponse.json();
      })
      .then(function (jsonResponse) {
        myLiffId = jsonResponse.id;
        initializeLiffOrDie(myLiffId);
      })
      .catch(function (error) {
        document.getElementById("liffAppContent").classList.add("hidden");
        document
          .getElementById("nodeLiffIdErrorMessage")
          .classList.remove("hidden");
      });
  } else {
    myLiffId = defaultLiffId;
    initializeLiffOrDie(myLiffId);
  }

  // fetch("/send-roomid")
  //   .then(function (reqResponse) {
  //     return reqResponse.json();
  //   })
  //   .then(function (jsonResponse) {
  //     datas = jsonResponse.datas;
  //     document.getElementById("maintable").textContent = datas;
  //   })
  //   .catch(function (error) {
  //     document.getElementById("errorDatas").textContent = "error Datas";
  //   });
};

/**
 * Check if myLiffId is null. If null do not initiate liff.
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiffOrDie(myLiffId) {
  if (!myLiffId) {
    document.getElementById("liffAppContent").classList.add("hidden");
    document.getElementById("liffIdErrorMessage").classList.remove("hidden");
  } else {
    initializeLiff(myLiffId);
  }
}

/**
 * Initialize LIFF
 * @param {string} myLiffId The LIFF ID of the selected element
 */
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      // start to use LIFF's api
      initializeApp();
    })
    .catch((err) => {
      document.getElementById("liffAppContent").classList.add("hidden");
      document
        .getElementById("liffInitErrorMessage")
        .classList.remove("hidden");
    });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
  registerButtonHandlers();
}
// getUserid();

/**
 * Register event handlers for the buttons displayed in the app
 */
function registerButtonHandlers() {
  // sendMessages call
  document
    .getElementById("sendMessageButton")
    .addEventListener("click", function () {
      if (!liff.isInClient()) {
        sendAlertIfNotInClient();
      } else {
        liff
          .sendMessages([
            {
              type: "text",
              text: "洗濯開始作業完了！",
            },
          ])
          .then(function () {
            window.alert("Message sent");
          })
          .catch(function (error) {
            window.alert("Error sending message: " + error);
          });
      }
    });
}
// // get profile call
// document
//   .getElementById("getProfileButton")
//   .addEventListener("click", function () {
//     liff
//       .getProfile()
//       .then(function (profile) {
//         document.getElementById("userIdProfileField").textContent =
//           profile.userId;
//       })
//       .catch(function (error) {
//         window.alert("Error getting profile: " + error);
//       });
//   });

/**
 * Alert the user if LIFF is opened in an external browser and unavailable buttons are tapped
 */
function sendAlertIfNotInClient() {
  alert(
    "This button is unavailable as LIFF is currently being opened in an external browser."
  );
}

function getUserid() {
  liff
    .getProfile()
    .then(function (profile) {
      document.getElementById("userIdProfileField").textContent =
        profile.userId;
    })
    .catch(function (error) {
      window.alert("Error getting profile: " + error);
    });
}

// function showDatas() {
//   let table = document.createElement("div");
//   for (let i = 0; i < datas.length; i++) {
//     let p1 = document.createElement("p");
//     p1.textContent = datas[i].roomid;
//     let p2 = document.createElement("p");
//     p2.textContent = datas[i].name;
//     table.appendChild(p1 + p2);
//   }
//   document.getElementById("maintable").appendChild(table);
// }
