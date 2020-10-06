// const fetchData = (url) => {
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     request.addEventListener("readystatechange", () => {
//       if (request.readyState === 4) {
//         if (request.status === 200) {
//           const data = JSON.parse(request.responseText);
//           resolve(data);
//         } else {
//           reject({ status: request.status, message: "Error fetching data" });
//         }
//       }
//     });

//     request.open("GET", url);
//     request.send();
//   });
// };
