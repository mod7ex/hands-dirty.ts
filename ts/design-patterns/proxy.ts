namespace NProxy {
	// concept already exists in js but it can be extended

	class ProxyAPI {
		constructor(private _apiBaseUrl: string, private cache: Map<string, Response> = new Map()) {}

		async call(path: string) {
			let responce = this.cache.get(path);

			let { body } = responce ? responce : await fetch(this._apiBaseUrl + path);

			return body;
		}
	}
}
