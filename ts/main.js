/*
let fetchData = (query) => {
      // simulate data fetching
      console.log("data fetching ...", query);
};

let debounce = function (fn, d = 700) {
      let timer;
      return function () {
            let ctx = this;
            let args = arguments;

            clearTimeout(timer);

            timer = setTimeout(() => {
                  fn.apply(ctx, args);
            }, d);
      };
};

let delayedFetch = debounce(fetchData);

document.querySelector("#searchInput").addEventListener("input", function (e) {
      delayedFetch(this.value);
});
// ******************************************************************************
*/

// ******************************************************************************
