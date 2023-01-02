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

```js
function $(selector) {
  const elements = document.querySelectorAll(selector);

  const obj = {
    elements,
    find(selector) {
      return $(selector);
    },
  };

  const methods = {
    text: ["textContent", "set"],
    html: ["innerHTML", "set"],
    val: ["value", "set"],
    attr: ["getAttribute", "setAttribute"],
    on: ["addEventListener"],
    clone: ["cloneNode"],
    closest: ["closest"],
    contains: ["contains"],
    css: ["style", "set"],
    delay: ["delay"],
    each: ["each"],
    get: ["get"],
    has: ["has"],
    parent: ["parentNode"],
  };

  const methodMap = new Map(Object.entries(methods));

  for (const [key, [prop, type]] of methodMap) {
    if (type === "set") {
      obj[key] = function (value) {
        this.elements.forEach((el, i) => {
          if (key === "delay") {
            setTimeout(() => {
              el[prop] = value;
            }, value);
          } else if (key === "each") {
            value(el, i);
          } else if (key === "css") {
            el[prop][arguments[0]] = arguments[1];
          } else {
            el[prop] = value;
          }
        });
        return this;
      };
    } else {
      obj[key] = function () {
        if (key === "contains") {
          return this.elements[0][prop](arguments[0]);
        } else if (key === "get") {
          return this.elements[arguments[0]];
        } else if (key === "has") {
          const matches = this.elements[0][prop](arguments[0]);
          return matches.length > 0;
        } else {
          return this.elements[0][prop];
        }
      };
    }
  }

  return obj;
}

/*
if (type === 'set') {
  obj[key] = function (value) {
    this.elements.forEach((el) => {
      if (key === 'delay') {
        setTimeout(() => {
          el[prop] = value;
        }, value);
      } else if (key === 'each') {
        value(el, i);
      } else if (key === 'css') {
        if (typeof el[prop] === 'undefined') {
          el[prop] = {};
        }
        el[prop][arguments[0]] = arguments[1];
      } else {
        el[prop] = value;
      }
    });
    return this;
  };
}
*/

const element = $("#myElement");
element.text("Hello World!");

const subElements = element.find(".subElement");
subElements.html("Hello World!");

const inputValue = element.find("input").val();

const title = element.attr("title");
element.attr("title", "Hello World!");

element.on("click", event => {
  console.log("Clicked element:", event.target);
});

const clonedElement = element.clone();

const closestAncestor = element.closest("#val");

const containsResult = element.contains(subElements.get(0));

element.css("color", "red");
const color = element.css("color");

// element.delay(2000).css('color', 'blue');

subElements.each((el, i) => {
  el.textContent = `Hello World! ${i}`;
});

const hasResult = element.has(".subElement");

const parentElement = element.parent();

/*
function $(selector) {
  const elements = document.querySelectorAll(selector);

  const obj = {
    elements,
    find(selector) {
      return $(selector);
    },
  };

  const methods = {
    text: ['textContent', 'set'],
    html: ['innerHTML', 'set'],
    val: ['value', 'set'],
    attr: ['getAttribute', 'setAttribute'],
    on: ['addEventListener'],
    clone: ['cloneNode'],
    closest: ['closest'],
    contains: ['contains'],
    css: ['style', 'set'],
    delay: ['delay'],
    each: ['each'],
    get: ['get'],
    has: ['has'],
    parent: ['parentNode'],
  };

  const methodMap = new Map(Object.entries(methods));

  for (const [key, [prop, type]] of methodMap) {
    if (type === 'set') {
      obj[key] = function (value) {
        this.elements.forEach((el) => {
          if (key === 'delay') {
            setTimeout(() => {
              el[prop] = value;
            }, value);
          } else if (key === 'each') {
            value(el, i);
          } else {
            el[prop] = value;
          }
        });
        return this;
      };
    } else {
      obj[key] = function () {
        if (key === 'contains') {
          return this.elements[0][prop](arguments[0]);
        } else if (key === 'get') {
          return this.elements[arguments[0]];
        } else {
          return this.elements[0][prop];
        }
      };
    }
  }

  return obj;
}

let a  = $("#inputCont").parent("#input") 
console.log(a);

*/

/*

function $(selector) {
  const elements = document.querySelectorAll(selector);

  const obj = {
    elements,
    find(selector) {
      return $(selector);
    },
  };

  const methods = {
    text: ['textContent', 'set'],
    html: ['innerHTML', 'set'],
    val: ['value', 'set'],
    attr: ['getAttribute', 'setAttribute'],
    on: ['addEventListener'],
  };

  const methodMap = new Map(Object.entries(methods));

  for (const [key, [prop, type]] of methodMap) {
    if (type === 'set') {
      obj[key] = function (value) {
        this.elements.forEach((el) => {
          el[prop] = value;
        });
        return this;
      };
    } else {
      obj[key] = function () {
        return this.elements[0][prop];
      };
    }
  }

  return obj;
}

*/

/*


function $(selector) {
  const elements = document.querySelectorAll(selector);

  const obj = {
    elements,
    find(selector) {
      return $(selector);
    },
    text(text) {
      if (text !== undefined) {
        this.elements.forEach((el) => {
          el.textContent = text;
        });
        return this;
      } else {
        return this.elements[0].textContent;
      }
    },
    html(html) {
      if (html !== undefined) {
        this.elements.forEach((el) => {
          el.innerHTML = html;
        });
        return this;
      } else {
        return this.elements[0].innerHTML;
      }
    },
    val(value) {
      if (value !== undefined) {
        this.elements.forEach((el) => {
          el.value = value;
        });
        return this;
      } else {
        return this.elements[0].value;
      }
    },
    attr(name, value) {
      if (value !== undefined) {
        this.elements.forEach((el) => {
          el.setAttribute(name, value);
        });
        return this;
      } else {
        return this.elements[0].getAttribute(name);
      }
    },
    on(eventType, callback) {
      this.elements.forEach((el) => {
        el.addEventListener(eventType, callback);
      });
      return this;
    },
  };

  return obj;
}




const element = $('#myElement');
element.elements[0].textContent = 'Hello World!';

const subElements = element.find('.subElement');
subElements.elements.forEach((el) => {
  el.textContent = 'Hello World!';
});


element.attr('title', 'Hello World!');
const title = element.attr('title');


const inputCont = $('#inputCont');
const subEl = inputCont.find('.subElement');
subEl.html('Hello World!');

const inputValue = inputCont.find('input');

$("#input").on("keyup", event => {
  $("#val").text(inputValue.val());
});


*/
```
