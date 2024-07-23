class TodoList extends HTMLElement {
  constructor() {
    super();
    const shadowDom = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    const title = this.getAttribute("title");
    const addTaskLabel = this.getAttribute("add-task-label");
    const clearListLabel = this.getAttribute("clear-list-label");


    wrapper.innerHTML = `
            <div class="header">
              <h1>${title}</h1>
              <span class="task-counter">0</span>
            </div>
            <div id="description-container"></div>
            <ul class="task-list"></ul>
            <input class="new-task-input" type="text">
            <button class="add-task-button">${addTaskLabel}</button>
            <button class="clear-list-button">${clearListLabel}</button>
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
    this.clearList = this.clearList.bind(this);
    this.updateTaskCounter = this.updateTaskCounter.bind(this);
  }

  connectedCallback() {
    const addTaskButton = this.shadowRoot.querySelector(".add-task-button");
    const clearListButton = this.shadowRoot.querySelector(".clear-list-button");

    this.taskList = this.shadowRoot.querySelector(".task-list");
    this.taskCounter = this.shadowRoot.querySelector(".task-counter");
    
    addTaskButton.addEventListener("click", this.addTask);
    clearListButton.addEventListener("click", this.clearList);
  }

  addTask() {
    const textInput = this.shadowRoot.querySelector(".new-task-input");
    if (textInput.value) {
      const li = document.createElement("li");
      li.textContent = textInput.value;
      this.taskList.appendChild(li);
      textInput.value = "";
      this.updateTaskCounter();
    }
  }

  clearList() {
    while (this.taskList.firstChild) {
      this.taskList.removeChild(this.taskList.firstChild);
      this.updateTaskCounter();
    }
  }

  updateTaskCounter() {
    const taskCount = this.taskList.children.length;
    this.taskCounter.textContent = taskCount;
  }
}

customElements.define("todo-list", TodoList);
