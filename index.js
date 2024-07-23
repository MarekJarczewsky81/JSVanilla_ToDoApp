class TodoList extends HTMLElement {
  constructor() {
    super();
    const shadowDom = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    const title = this.getAttribute("title");
    const addTaskLabel = this.getAttribute("add-task-label");

    wrapper.innerHTML = `
            <h1>${title}</h1>
            <div id="description-container"></div>
            <ul class="task-list"></ul>
            <input class="new-task-input" type="text">
            <button class="add-task-button">${addTaskLabel}</button>
        `;

    shadowDom.appendChild(wrapper);

    // Pobieram szablon i dodaje do komponentu
    const template = document.getElementById("todo-list-template");
    const descriptionContainer = wrapper.querySelector("#description-container");
    if (template) {
      const descriptionContent = template.content.cloneNode(true);
      descriptionContainer.appendChild(descriptionContent);
    }

    this.addTask = this.addTask.bind(this);
  }

  connectedCallback() {
    const addTaskButton = this.shadowRoot.querySelector(".add-task-button");
    this.taskList = this.shadowRoot.querySelector(".task-list");
    addTaskButton.addEventListener("click", this.addTask);
  }

  addTask() {
    const textInput = this.shadowRoot.querySelector(".new-task-input");
    if (textInput.value) {
      const li = document.createElement("li");
      li.textContent = textInput.value;
      this.taskList.appendChild(li);
      textInput.value = "";
    }
  }
}

customElements.define("todo-list", TodoList);
