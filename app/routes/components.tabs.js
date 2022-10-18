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
      <h1>Tabs</h1>
      <p>An accessible tabs component.</p>

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

      <h3>Demo Styles</h3>
      <pre><code>${Styles(elementName)}</pre></code>
    </main>



    <style>
      ${Styles(elementName)}
    </style>
  `;
}

const manualExample = /*html*/ `
<joe-tabs>
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
</joe-tabs>
`.trim();

const automaticExample = /*html*/ `
<joe-tabs automatic>
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
</joe-tabs>
`.trim();

function Styles(elementName) {
  return /*css*/ `
${elementName} joe-tabs {
  display: block;
  border: 1px solid black;
}

${elementName} [role="tablist"] {
  border-bottom: 1px solid black;
}

${elementName} [role="tabpanel"][aria-selected="true"] {
  display: inherit;
}

${elementName} [role="tabpanel"] {
  display: none;
  padding: 1rem;
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
