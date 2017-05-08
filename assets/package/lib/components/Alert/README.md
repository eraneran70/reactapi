# Alerts
>Alerts provide contextual feedback messages for typical user actions with the
handful of available and flexible alert messages.

## Alternate Styles
Generate contextual modifier classes for colorizing the alert.
Alerts don't have default classes, only base and modifier classes. A default
gray alert doesn't make too much sense, so you're required to specify a type
via contextual class. Choose from success, info, warning, or danger.

+ `.alert--success`  - A successful or positive alert message
+ `.alert--info`     - An informational alert messages
+ `.alert--warning`  - A caution alert message
+ `.alert--danger`   - A dangerous or potentially negative alert message

## Dismissible Alerts
Build on any alert by adding an optional `.alert-dismissible` and close button.
For fully functioning, dismissible alerts, you must use the alerts JavaScript component.
