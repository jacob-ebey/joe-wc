export default function Header({ pathname }) {
  return /*html*/ `
		<header class="header">
			<h1>joe-wc</h1>
			<p>Accessible web-components to enhance your site.</p>
			<nav>
				<ul>
					<li>
						<a href="/" ${pathname == "/" ? 'aria-current="page"' : ""}>Home</a>
					</li>
				</ul>
			</nav>
		</header>

		<style>
			.header h1 {
				margin: 0;
				font-size: 1.5em;
			}
			.header p {
				margin: 0;
				font-size: 0.85em;
			}
		</style>
	`;
}
