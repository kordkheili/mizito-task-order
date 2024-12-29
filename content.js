function mizitoOrder() {
  let task_id = 100;
  let list_id = 10000;
  console.log("DOM fully loaded");
  console.log(document.querySelector(".task_row_container"));
  const container = document.querySelector(".task_row_container").closest("md-list");
  const containers = getSiblingsByTagAndClass(container, "md-list", "md-my-green-theme");
  containers.unshift(container);

  containers.forEach(function (container, index) {
    const currentListId = list_id + index;
    console.log(`Processing container ${index}, list_id: ${currentListId}`);

    if (container) {
      container.querySelectorAll(".task_row_container").forEach(function (task) {
        task.setAttribute("task-id", task_id);
        task_id++;
      });

      if (typeof Sortable !== "undefined") {
        Sortable.create(container, {
          group: `list-${currentListId}`,
          animation: 150,
          draggable: ".task_row_container",
          store: {
            set: function (sortable) {
              const key = `list-order-${currentListId}`;
              const order = sortable.toArray();
              localStorage.setItem(key, JSON.stringify(order));
              console.log(`Saved order for list ${currentListId}:`, order);
            },
            get: function (sortable) {
              const key = `list-order-${currentListId}`;
              const stored = localStorage.getItem(key);
              console.log(`Retrieved order for list ${currentListId}:`, stored);
              return stored ? JSON.parse(stored) : [];
            },
          },
          dataIdAttr: "task-id",
          onEnd: function (evt) {
            console.log(`Sorting ended for list ${currentListId}`);
          },
        });
        console.log(`Sortable initialized for list-${currentListId}`);
      } else {
        console.error("Sortable is not defined. Make sure the library is loaded.");
      }
    } else {
      console.error("Container not found");
    }
  });
}

function getSiblingsByTagAndClass(element, tagName, className) {
  let siblings = [];
  let sibling = element.parentNode.firstChild;

  while (sibling) {
    if (
      sibling.nodeType === 1 &&
      sibling !== element &&
      sibling.tagName.toLowerCase() === tagName.toLowerCase() &&
      sibling.classList.contains(className)
    ) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
}

// Execute mizitoOrder on page load
mizitoOrder();
