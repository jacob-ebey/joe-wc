import { useElementName } from "enhance-remix";

/**
 * @arg {import("enhance-remix").MetaFunctionArgs<typeof loader>} args
 */
export function meta() {
  return {
    title: "Enhance Remix",
  };
}

/**
 * @type {import("@enhance/types").EnhanceElemFn}
 */
export default function Tabs({ html }) {
  const elementName = useElementName(Tabs);

  return html`
    <main>
      <h1>Tabpanel</h1>
      <p>An accessible tabpanel component.</p>

      <h2>Demos</h2>

      <h3>Manual</h3>
      <h4>Example</h4>
      ${manualExample}
      <h4>Code</h4>
      <pre><code>${escapeHtml(manualExample)}</pre></code>
      
      <h3>Automatic</h3>
      <h4>Example</h4>
      ${automaticExample}
      <h4>Code</h4>
      <pre><code>${escapeHtml(automaticExample)}</pre></code>

      <h3>Default Selected</h3>
      <h4>Example</h4>
      ${defaultSelected}
      <h4>Code</h4>
      <pre><code>${escapeHtml(defaultSelected)}</pre></code>

      <h3>Demo Styles</h3>
      <pre><code>${Styles(elementName)}</pre></code>
    </main>



    <style>
      ${Styles(elementName)}
    </style>
  `;
}

const manualExample = /*html*/ `
<joe-tabpanel>
  <div role="tablist">
    <button role="tab" aria-controls="tab-1" aria-selected="true">
      Tab 1
    </button>
    <button role="tab" aria-controls="tab-2">Tab 2</button>
    <button role="tab" aria-controls="tab-3">Tab 3</button>
  </div>
  <div role="tabpanel" id="tab-1" tabindex="0" aria-selected="true">
    <p>Tab 1 content</p>
  </div>
  <div role="tabpanel" id="tab-2" tabindex="0">
    <p>Tab 2 content</p>
  </div>
  <div role="tabpanel" id="tab-3" tabindex="0">
    <p>Tab 3 content</p>
  </div>
</joe-tabpanel>
`.trim();

const automaticExample = /*html*/ `
<joe-tabpanel automatic>
  <div role="tablist">
    <button role="tab" aria-controls="tab-1" aria-selected="true">
      Tab 1
    </button>
    <button role="tab" aria-controls="tab-2">Tab 2</button>
    <button role="tab" aria-controls="tab-3">Tab 3</button>
  </div>
  <div role="tabpanel" id="tab-1" tabindex="0" aria-selected="true">
    <p>Tab 1 content</p>
  </div>
  <div role="tabpanel" id="tab-2" tabindex="0">
    <p>Tab 2 content</p>
  </div>
  <div role="tabpanel" id="tab-3" tabindex="0">
    <p>Tab 3 content</p>
  </div>
</joe-tabpanel>
`.trim();

const defaultSelected = /*html*/ `
<joe-tabpanel>
  <div role="tablist">
    <button role="tab" aria-controls="tab-1">Tab 1</button>
    <button role="tab" aria-controls="tab-2" aria-selected="true">
      Tab 2
    </button>
    <button role="tab" aria-controls="tab-3">Tab 3</button>
  </div>
  <div role="tabpanel" id="tab-1" tabindex="0">
    <p>Tab 1 content</p>
  </div>
  <div role="tabpanel" id="tab-2" tabindex="0" aria-selected="true">
    <p>Tab 2 content</p>
  </div>
  <div role="tabpanel" id="tab-3" tabindex="0">
    <p>Tab 3 content</p>
  </div>
</joe-tabpanel>
`.trim();

function Styles() {
  return /*css*/ `
joe-tabpanel {
  display: block;
  border: 1px solid black;
}

joe-tabpanel [role="tablist"] {
  border-bottom: 1px solid black;
}

joe-tabpanel [role="tab"][aria-selected="true"] {
  box-shadow: 0 0 0 2px green;
}

joe-tabpanel div[role="tabpanel"] {
  display: none;
  padding: 1rem;
}

joe-tabpanel [role="tabpanel"][aria-selected="true"] {
  display: block;
}
`.trim();
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
