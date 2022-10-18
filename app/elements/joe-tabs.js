import { useElementName } from "enhance-remix";

/**
 * @type {import("@enhance/types").EnhanceElemFn}
 */
export default function Tabs({ html, state }) {
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

      for (const tab of this.querySelectorAll("[role=tab]")) {
        tab.addEventListener("keydown", this.handleKeyboard.bind(this));
        tab.addEventListener("click", (event) => {
          for (const tab of this.querySelectorAll("[role=tab]")) {
            tab.removeAttribute("aria-selected");
            tab.setAttribute("tabindex", "-1");
          }
          event.target.setAttribute("aria-selected", "true");
          event.target.setAttribute("tabindex", "0");
          this.setActiveTab(event.target);
        });

        if (tab.getAttribute("aria-selected") != "true") {
          tab.setAttribute("tabindex", "-1");
        }
      }
    }

    handleKeyboard(event) {
      let handled = false;

      switch (event.key) {
        case "ArrowLeft":
          this.setPreviousTab();
          handled = true;
          break;
        case "ArrowRight":
          this.setNextTab();
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

    setPreviousTab() {
      let previousTab;
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (tab.getAttribute("aria-selected") === "true") {
          previousTab = tabs[i - 1];
        }
        tab.removeAttribute("aria-selected");
        tab.setAttribute("tabindex", "-1");
      }

      if (!previousTab) previousTab = tabs[tabs.length - 1];

      previousTab.setAttribute("aria-selected", "true");
      previousTab.setAttribute("tabindex", "0");
      previousTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(previousTab);
      }
    }

    setNextTab() {
      let nextTab;
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (tab.getAttribute("aria-selected") === "true") {
          nextTab = tabs[i + 1];
          tab.removeAttribute("aria-selected");
          tab.setAttribute("tabindex", "0");
        }
        tab.setAttribute("tabindex", "-1");
      }

      if (!nextTab) nextTab = tabs[0];

      nextTab.setAttribute("aria-selected", "true");
      nextTab.setAttribute("tabindex", "0");
      nextTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(nextTab);
      }
    }

    setFirstTab() {
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      const firstTab = tabs[0];
      for (const tab of tabs) {
        tab.removeAttribute("aria-selected");
        tab.setAttribute("tabindex", "-1");
      }
      firstTab.setAttribute("aria-selected", "true");
      firstTab.setAttribute("tabindex", "0");
      firstTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(firstTab);
      }
    }

    setEndTab() {
      const tabs = Array.from(this.querySelectorAll("[role=tab]"));
      const lastTab = tabs[tabs.length - 1];
      for (const tab of tabs) {
        tab.removeAttribute("aria-selected");
        tab.setAttribute("tabindex", "-1");
      }
      lastTab.setAttribute("aria-selected", "true");
      lastTab.setAttribute("tabindex", "0");
      lastTab.focus();
      if (this.hasAttribute("automatic")) {
        this.setActiveTab(lastTab);
      }
    }

    setActiveTab(tab) {
      const controls = tab.getAttribute("aria-controls");
      if (!controls)
        throw new Error(`[aria-controls] attribute not found on tab`);

      const tabpanel = this.querySelector(`[id="${controls}"]`);
      if (!tabpanel) throw new Error(`tabpanel not found`);

      for (const tab of this.querySelectorAll("[role=tab]")) {
        tab.setAttribute("aria-selected", "false");
      }

      for (const tabpanel of this.querySelectorAll("[role=tabpanel]")) {
        tabpanel.setAttribute("aria-selected", "false");
      }

      tab.setAttribute("aria-selected", "true");
      tabpanel.setAttribute("aria-selected", "true");
    }
  };
}
