import { useElementName } from "enhance-remix";

/**
 * @type {import("@enhance/types").EnhanceElemFn}
 */
export default function Tabs({ html }) {
  const elementName = useElementName(Tabs);

  return html`
    <slot></slot>

    <script>
      if (!customElements.get("${elementName}")) {
        customElements.define(
          "${elementName}",
          ${createTabsElement.toString()}()
        );
      }
    </script>
  `;
}

function createTabsElement() {
  return class TabsElement extends HTMLElement {
    constructor() {
      super();
      const tablist = this.querySelector(`[role="tablist"]`);

      if (!tablist) {
        throw new Error(`an element with [role="tablist"] is missing`);
      }

      let activeTab;
      for (const tab of this.querySelectorAll("[role=tab]")) {
        if (!activeTab) {
          activeTab = tab;
        }

        tab.addEventListener("keydown", this.handleKeyboard.bind(this));
        this.addEventListener("click", this.handleClick.bind(this));

        if (tab.getAttribute("aria-selected") == "true") {
          activeTab = tab;
        }
      }

      this.setActiveTab(activeTab);
    }

    handleKeyboard(event) {
      let handled = false;

      switch (event.key) {
        case "ArrowLeft":
          this.setPreviousTab(event.target);
          handled = true;
          break;
        case "ArrowRight":
          this.setNextTab(event.target);
          handled = true;
          break;
        case "Home":
          this.setFirstTab();
          handled = true;
          break;
        case "End":
          this.setEndTab();
          handled = true;
          break;
      }

      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    handleClick(event) {
      this.setActiveTab(event.target);
      event.preventDefault();
      event.stopPropagation();
    }

    setPreviousTab(target) {
      let previousTab;
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (tab === target) {
          previousTab = tabs[i - 1];
          break;
        }
      }

      if (!previousTab) previousTab = tabs[tabs.length - 1];

      previousTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(previousTab);
      }
    }

    setNextTab(target) {
      let nextTab;
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (tab === target) {
          nextTab = tabs[i + 1];
          break;
        }
      }

      if (!nextTab) nextTab = tabs[0];

      nextTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(nextTab);
      }
    }

    setFirstTab() {
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      const firstTab = tabs[0];
      firstTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(firstTab);
      }
    }

    setEndTab() {
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      const lastTab = tabs[tabs.length - 1];
      lastTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(lastTab);
      }
    }

    setActiveTab(tab) {
      for (const toReset of this.querySelectorAll("[role=tab]")) {
        if (tab === toReset) {
          toReset.setAttribute("aria-selected", "true");
          toReset.tabIndex = 0;
        } else {
          toReset.setAttribute("aria-selected", "false");
          toReset.tabIndex = -1;
        }
      }
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");

      const controls = tab.getAttribute("aria-controls");
      if (!controls) {
        throw new Error(`[aria-controls] attribute not found on tab`);
      }

      for (const tabpanel of this.querySelectorAll("[role=tabpanel]")) {
        if (tabpanel.id === controls) {
          tabpanel.setAttribute("aria-selected", "true");
        } else {
          tabpanel.setAttribute("aria-selected", "false");
        }
      }
    }
  };
}
