```js
function $(selector) {
  const elements = document.querySelectorAll(selector);

  const obj = {
    elements,
    find(selector) {
      return $(selector);
    },
    text(text) {
      if (text !== undefined) {
        this.elements.forEach(el => {
          el.textContent = text;
        });
        return this;
      } else {
        return this.elements[0].textContent;
      }
    },
    html(html) {
      if (html !== undefined) {
        this.elements.forEach(el => {
          el.innerHTML = html;
        });
        return this;
      } else {
        return this.elements[0].innerHTML;
      }
    },
    val(value) {
      if (value !== undefined) {
        this.elements.forEach(el => {
          el.value = value;
        });
        return this;
      } else {
        return this.elements[0].value;
      }
    },
    attr(name, value) {
      if (value !== undefined) {
        this.elements.forEach(el => {
          el.setAttribute(name, value);
        });
        return this;
      } else {
        return this.elements[0].getAttribute(name);
      }
    },
    on(eventType, callback) {
      this.elements.forEach(el => {
        el.addEventListener(eventType, callback);
      });
      return this;
    },
  };

  return obj;
}
```

```js
const element = $("#myElement");
element.on("click", event => {
  console.log(event.target);
});

const input = $("input");
input.on("focus", event => {
  console.log(event.target);
});
```
