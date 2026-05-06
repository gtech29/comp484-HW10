# COMP 484 HW10

HW10 adds Chrome DevTools logging, browser error, network, performance, and debugging examples directly to the real GigaPet app.

Original Project 2 version: https://github.com/gtech29/comp484-project2

## Repo Link

https://github.com/gtech29/comp484-HW10

## GitHub Pages Link

[https://gtech29.github.io/comp484-HW10/](https://gtech29.github.io/comp484-HW10/)

## How to Run

Open the main GitHub Pages project page in Google Chrome:

[https://gtech29.github.io/comp484-HW10/](https://gtech29.github.io/comp484-HW10/)

Chrome DevTools should be opened on the main GigaPet page, `index.html`, not on a different HTML file. The DevTools controls and snack debugging example are now part of the actual Project 2 app.

You can also open `index.html` locally in Google Chrome. GitHub Pages or Live Server is recommended for the 404 Network example.

## Chrome DevTools Examples

The main GigaPet page includes buttons for:

- Log Info
- Log Warning
- Log Error
- Log Table
- Log Group
- Log Custom
- 404 network error
- TypeError
- Violation warning

The snack calculator on `index.html` is an intentional debugging example. Use the Sources panel to set a breakpoint in `script.js`, inspect the snack input variables, watch the string-concatenation bug happen, and review the commented fix using `Number()` or `parseInt()`.

The DevTools report and screenshots should show the actual app files, especially `index.html` and `script.js`.

## Report

The Chrome DevTools implementation report with screenshots is included in:

`assets/HW10 Chrome Dev Tools.pdf`

## Project Structure

```text
comp484-HW10/
|-- index.html          # Main GigaPet page with HW10 DevTools examples
|-- style.css           # Main project styling and DevTools section styling
|-- script.js           # Game logic, jQuery interactions, and DevTools examples
|-- assets/
|   `-- HW10 Chrome Dev Tools.pdf
`-- images/
    |-- zorp-normal.png
    |-- zorp-happy.png
    `-- zorp-sad.png
```

## Author

Juan Rodriguez, CSUN COMP 484, Spring 2026
