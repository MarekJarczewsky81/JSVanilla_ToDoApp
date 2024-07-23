class TodoList extends HTMLElement {
  constructor() {
    super();
    const shadowDom = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    const title = this.getAttribute("title");
    const addTaskLabel = this.getAttribute("add-task-label");

    wrapper.innerHTML = `
            <h1>${title}</h1>
            <ul class="task-list"></ul>
            <input class="new-task-input" type="text">
            <button class="add-task-button">${addTaskLabel}</button>
        `;

    shadowDom.appendChild(wrapper);

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
