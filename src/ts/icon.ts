const icon_bar = document.querySelector('#icon-bar');
const icon_arr = icon_bar!.querySelectorAll('.icon');

// dummycode
Array.from(icon_arr).forEach((e, i) => {
  e.addEventListener('click', () => {
    e.textContent = i.toString();
  });
});
