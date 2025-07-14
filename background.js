chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (activeTabs) => {
    const activeTab = activeTabs[0];
    chrome.tabs.query({ currentWindow: true }, (allTabs) => {
      let newIndex;
      if (command === "next-tab") {
        newIndex = (activeTab.index + 1) % allTabs.length;
      } else if (command === "previous-tab") {
        newIndex = (activeTab.index - 1 + allTabs.length) % allTabs.length;
      }
      
      const newTabId = allTabs.find(tab => tab.index === newIndex).id;
      chrome.tabs.update(newTabId, { active: true });
    });
  });
});