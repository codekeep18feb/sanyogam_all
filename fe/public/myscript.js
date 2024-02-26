window.onload = function() {
    var items = ["apple", "banana", "orange", "grape", "kiwi"]; // Example array of items
  
    var button = document.createElement('button');
    button.textContent = 'Show Box';
  
    var box = document.createElement('div');
    box.style.width = '300px';
    box.style.minHeight = '300px'; // Set a minimum height for the box
    box.style.backgroundColor = 'lightblue';
    box.style.overflowY = 'auto'; // Add overflow-y: auto to enable vertical scrolling if needed
  
    var container = document.createElement('div'); // Container for the items
    container.style.padding = '10px'; // Add some padding to the container
  
    button.addEventListener('click', function() {
      // Clear the container before rendering new items
      container.innerHTML = '';
  
      // Iterate over the array and create a DOM element for each item
      items.forEach(function(item) {
        var itemElement = document.createElement('div');
        itemElement.textContent = item;
        itemElement.style.marginBottom = '5px'; // Add some margin between items
  
        // Append each item element to the container
        container.appendChild(itemElement);
      });
  
      // Append the container to the box
      box.appendChild(container);
  
      // Update the height of the box based on the number of items
      var itemCount = items.length;
      var boxHeight = itemCount * 30 + 20; // Calculate height based on item count (assuming each item has a height of 30px and adding 20px for padding)
      box.style.height = boxHeight + 'px';
    });
  
    document.body.appendChild(button);
    document.body.appendChild(box);
  };
  