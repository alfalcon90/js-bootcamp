const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input">
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  // Search input
  const onInput = debounce(async (e) => {
    const items = await fetchData(e.target.value);
    dropdown.classList.add('is-active');
    // Reset dropdown
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    resultsWrapper.innerHTML = '';

    // Generate dropdown items
    for (let item of items) {
      const listItem = document.createElement('a');
      listItem.classList.add('dropdown-item');
      listItem.innerHTML = renderOption(item);
      // item click event
      listItem.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.append(listItem);
    }
  }, 500);

  // Event Listeners
  input.addEventListener('input', onInput);
  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
