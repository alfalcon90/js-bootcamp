const btn = document.querySelector('button');

const moveX = (element, amount, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth;
      const currRight = element.getBoundingClientRect().right;
      const currLeft = element.getBoundingClientRect().left;
      if (currRight + amount > bodyBoundary) {
        reject({ bodyBoundary, amount, currRight });
      } else {
        element.style.transform = `translateX(${currLeft + amount}px)`;
        resolve();
      }
    }, delay);
  });
};

moveX(btn, 300, 1000)
  .then(() => moveX(btn, 300, 1000))
  .then(() => moveX(btn, 300, 1000))
  .then(() => moveX(btn, 300, 1000))
  .then(() => console.log('DONE MOVING'))
  .catch(({ bodyBoundary, amount, currRight }) => {
    console.log(`Body is ${bodyBoundary}px wide`);
    console.log(`Element is at ${currRight}px, ${amount} is too large`);
  });

// UGLY MESS

// setTimeout(() => {
// 	btn.style.transform = `translate(100px)`
// 	setTimeout(() => {
// 		btn.style.transform = `translate(200px)`
// 		setTimeout(() => {
// 			btn.style.transform = `translate(300px)`
// 			setTimeout(() => {
// 				btn.style.transform = `translate(400px)`
// 				setTimeout(() => {
// 					btn.style.transform = `translate(500px)`
// 				}, 1000)
// 			}, 1000)
// 		}, 1000)
// 	}, 1000)
// }, 1000)

// const moveX = (element, amount, delay, onSuccess, onFailure) => {
//   setTimeout(() => {
//     const bodyBoundary = document.body.clientWidth;
//     const currRight = element.getBoundingClientRect().right;
//     const currLeft = element.getBoundingClientRect().left;
//     if (currRight + amount > bodyBoundary) {
//       onFailure();
//     } else {
//       element.style.transform = `translateX(${currLeft + amount}px)`;
//       onSuccess();
//     }
//   }, delay);
// };

// moveX(btn, 100, 2000, () => {
//   moveX(btn, 100, 1000, () => {
//     moveX(btn, 100, 1000, () => {
//       moveX(btn, 100, 1000, () => {
//         moveX(btn, 100, 1000);
//       });
//     });
//   });
// });

// moveX(
//   btn,
//   100,
//   1000,
//   () => {
//     moveX(
//       btn,
//       100,
//       1000,
//       () => {
//         moveX(
//           btn,
//           100,
//           1000,
//           () => {
//             moveX(
//               btn,
//               100,
//               1000,
//               () => {
//                 moveX(
//                   btn,
//                   100,
//                   1000,
//                   () => {
//                     console.log('REALLY?');
//                   },
//                   () => {
//                     console.log('CANNOT MOVE FURTHER');
//                   }
//                 );
//               },
//               () => {
//                 console.log('CANNOT MOVE FURTHER');
//               }
//             );
//           },
//           () => {
//             console.log('CANNOT MOVE FURTHER');
//           }
//         );
//       },
//       () => {
//         console.log('CANNOT MOVE FURTHER');
//       }
//     );
//   },
//   () => {
//     console.log('CANNOT MOVE FURTHER');
//   }
// );
