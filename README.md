# Widg.io Test Widget
This is an example of a test widget for the widg.io platform and demonstrates the use of Web Components (utilising the Shadow DOM), the Widg.io API for retrieving settings and a watcher for the widgetsettings attribute as used by the widget editor.

# index.html
This file demonstrates how a customer would add/embed the widget on the website using the both the Widg.io Elements script (placed once in the header of the page using the defer attribute) and the embedding of the widget itself somewhere in the page using both the CSS class 'widgio-widget' used by the Elements script to identify widgets, and the widgetid attribute to identify the individual widget and retrieve the settings.

# install.json
This is an example of the install.json file which defines both the page embed template and files (used by the Elements script) and the settings used by the widget editor within the Widg.io website for users to configure the widget settings.

# settings.json
This is an example of how the widget settings are stored and returned by the Widg.io Widget Settings API Endpoint for an individual widgetid.
