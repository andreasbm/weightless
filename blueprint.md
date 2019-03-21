{{ template:logo }}
{{ template:badges }}
{{ template:description }}
{{ bullets }}
{{ template:toc }}

## Demo

Go [here]({{ demo }}) to try the demo.

## Installation

```
$ npm i {{ ids.npm }}
```

If you want to get started super quickly you can use the CLI.

```
$ npm init web-config my-project --lit
```

If you prefer to use the `umd` bundle you can import `https://unpkg.com/weightless/umd/weightless.min.js`.

```html
<script src="https://unpkg.com/weightless/umd/weightless.min.js"></script>
```

## Elements

{{ elements }}

## Roadmap

There's lots of exciting things on the roadmap. Until v1.0.0 you can expect the API to be fairly stable but refactoring might still happen and break the backwards compatibility. You are very welcome to use the library, create pull requests or add issues.


## Contributing guide

You are more than welcome to contribute to this repository! Below are some instructions on how to setup the project for development.

1. Clone this repository by running `git clone https://github.com/andreasbm/weightless.git`.
2. Run `npm i` to install all dependencies.
3. Spin up the development server with `npm run s`. The browser should automatically be opened at the correct url.
5. Run tests with `npm run test`.
6. Compile the documentation by running `npm run docs`.

The elements are written in [Typescript](https://www.typescriptlang.org/) and the stylesheets are written in [SASS](https://sass-lang.com/). All of the web components uses [lit-element](https://lit-element.polymer-project.org/).

If you want to know more about how you can help you should definitely check out the [CONTRIBUTING.md](/CONTRIBUTING.md) file. All contributors will be added to the contributors section below.


{{ template:contributors }}
{{ template:license }}
