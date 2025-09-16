# Name List Manager

A simple web application that allows users to enter a list of names separated by commas and display them in a table with character counts for each name.

## Features

- Enter multiple names separated by commas
- Display names in a clean table format with character counts
- Shows the number of characters in each name
- Responsive design for mobile and desktop

## How to Run Locally

1. Download or clone this repository to your local machine.

2. Navigate to the `html_css_js` folder:

   ```bash
   cd path/to/your/downloaded/folder/html_css_js
   ```

3. Open the `index.html` file in your web browser:

   - You can double-click the file to open it directly in your default browser
   - Or right-click the file and select "Open with" and choose your preferred browser

4. Alternatively, to serve the files using a local web server (recommended for better compatibility):

   **Using Python (if you have Python installed):**

   ```bash
   python -m http.server 8000
   ```

   Then open `http://localhost:8000` in your browser.

   **Using Node.js (if you have Node.js installed):**

   ```bash
   npx http-server
   ```

   Then open the provided localhost URL in your browser.

   **Using PHP (if you have PHP installed):**

   ```bash
   php -S localhost:8000
   ```

   Then open `http://localhost:8000` in your browser.

## Usage

1. Enter names separated by commas in the input field at the top of the page.
2. Click the "Add Names" button or press Enter to add them to the list.
3. Names will appear in the table below with the character count for each name.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

## Browser Compatibility

This application works in all modern web browsers including Chrome, Firefox, Safari, and Edge.
