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
export default function Index({ html }) {
  return html`
    <main>
      <h1>Components</h1>

      <ul>
        <li>
          <a href="/components/tabs">Tabs</a>
        </li>
      </ul>
    </main>
  `;
}
