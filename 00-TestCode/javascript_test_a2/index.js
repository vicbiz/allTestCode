// Custum Element with attribute
class TimeFormatted extends HTMLElement {
  connectedCallback() {
    let date = new Date(this.getAttribute("datetime") || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute("year") || undefined,
      month: this.getAttribute("month") || undefined,
      day: this.getAttribute("day") || undefined,
      hour: this.getAttribute("hour") || undefined,
      minute: this.getAttribute("minute") || undefined,
      second: this.getAttribute("second") || undefined,
      timeZoneName: this.getAttribute("time-zone-name") || undefined,
    }).format(date);
  }
}
customElements.define("time-formatted", TimeFormatted);

// Custum Element with data injection
class NewBlock extends HTMLElement {
  set blockContent(it) {
    this.innerHTML = `
      <div class="blockWrap">
        <h1 class="block-title">${it.title}</h1>
        <p class="block-text">${it.text}</p>
      </div>
    `;
  }
}
customElements.define("my-block", NewBlock);

//
//
//
//
// Custom Elent with Simple content
class JaeMoon extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h2>JaeMoon</h2>
        <p>Good</p>
      </div>
    `;
  }
}
customElements.define("jae-moon", JaeMoon);

// Custom Elent with Simple content
class MyProduct extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div>
      <h2>JaeMoon</h2>
      <p>Good</p>
    </div>
  `;
  }
}
window.customElements.define("my-product", MyProduct);

//
//
//
//
// Data
const data = [
  { title: "Title1", text: "Text1" },
  { title: "Title2", text: "Text2" },
  { title: "Title3", text: "Text3" },
  { title: "Title4", text: "Text4" },
  { title: "Title5", text: "Text5" },
];

window.addEventListener("load", () => {
  const main = document.querySelector("main");

  data.forEach((bbb) => {
    const el = document.createElement("my-block");
    el.blockContent = bbb;
    main.appendChild(el);
  });

  main.appendChild(document.createElement("jae-moon"));
});
